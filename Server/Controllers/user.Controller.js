const { userModel, reservedAccount, debitTransaction, creditTransaction, flutterTransaction } = require("../Models/user.Model");
const { dataPlans, adminSetting } = require('../Models/admin.Model')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET
var cloudinary = require('cloudinary');
const { Buffer } = require('buffer');
const axios = require('axios');
const { welcomeTem, verifyEmailTemplate, passwordResetEmailTemplate, creditEmailTemplate, debitEmailTemplate } = require('../Exact/user.template')



cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPI,
    api_secret: process.env.CLOUDSECRET
});

// Register User

const registerUser = (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth, phoneNumber } = req.body

    function generateAccountNumber() {
        const random10Digits = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

        return random10Digits.toString().slice(0, 10); // Extract the first 10 digits as a string
    }


    const generatedAccountNo = Number(generateAccountNumber())
    const phoneVerificationCode = Math.floor(Math.random(10000) * 99999);
    const hashPassword = bcrypt.hashSync(password, 10);

    const testCode = () => {
        let text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let randomText = ""

        for (let index = 0; index < 11; index++) {
            randomText += text.charAt(Math.floor(Math.random() * text.length))
        }
        return randomText;
    }

    let emailVerifyToken = testCode()

    let user = new userModel({
        firstName,
        lastName,
        dateOfBirth,
        accountNo: generatedAccountNo,
        phoneNo: {
            phone: phoneNumber,
            phoneVerificationCode
        },
        emailInfo: {
            email,
            emailVerificationCode: emailVerifyToken
        },
        password: hashPassword
    })
    user.save()
        .then(data => {
            res.status(201).json({ status: "Register sucessfully", data: data })
            sendEmails(email, "Welcome to Tender Pay", welcomeTem(firstName))
            sendEmails(email, "Email verification", verifyEmailTemplate(firstName, emailVerifyToken))
        })
        .catch(err => {
            if (err) {
                res.status(400).json({ status: "Register unsucessfully!", error: err })
            }
        })
}


// Verify Email

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});


// Send Emails

const sendEmails = (email, subject, html) => {
    return new Promise((resolve, reject) => {
        const emailBody = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: subject,
            html: html
        }

        transporter.sendMail(emailBody, (err, info) => {
            if (err) {
                reject({ msg: 'An error', status: false, err });
            } else {
                resolve({ msg: 'Email sent successful', status: true, info });
            }
        });
    })
}

// Password reset

const resetPassword = (req, res) => {
    const { email } = req.body
    try {
        userModel.findOne({ 'emailInfo.email': email })
            .then((user) => {
                if (user) {
                    let newPassword = generateNewPassword()
                    let hashNewPassword = bcrypt.hashSync(newPassword, 10);
                    user.password = hashNewPassword
                    user.save()
                        .then((newData) => {
                            sendEmails(email, "Password Reset", passwordResetEmailTemplate(user.firstName, newPassword))
                                .then((mail) => {
                                    res.status(200).json({ msg: "Sent successfully", mail })
                                })
                                .catch((mailErr) => {
                                    res.status(200).json({ msg: "error", mailErr })
                                })
                        })
                        .catch((err) => {
                        })
                } else {
                    res.status(500).json({ mgs: "User not found" })
                }
            })
            .catch((err) => {
                res.status(500).json({ mgs: "User not found", err })
            })
    }
    catch (error) {
    }
}

const generateNewPassword = () => {
    let randomSm = "abcdefghijklmnopqrstuvwxyz"
    let randomSmall = ""
    for (let index = 1; index <= 3; index++) {
        randomSmall += randomSm.charAt(Math.floor(Math.random() * randomSm.length))
    }

    let randomCa = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let randomCapital = ""
    for (let index = 1; index <= 2; index++) {
        randomCapital += randomCa.charAt(Math.floor(Math.random() * randomCa.length))
    }

    let randomNo = "0123456789"
    let randomNumber = ""
    for (let index = 1; index <= 2; index++) {
        randomNumber += randomNo.charAt(Math.floor(Math.random() * randomNo.length))
    }

    let randomSp = '!@#$%^&*()?:{}'
    let randomSpecial = ""
    for (let index = 1; index <= 1; index++) {
        randomSpecial += randomSp.charAt(Math.floor(Math.random() * randomSp.length))
    }
    let randomText = `${randomCapital}${randomSmall}${randomSpecial}${randomNumber}`

    return randomText
}


const getTokenAndVerify = async (req, res) => {
    const token = req.query.token
    let user = await userModel.findOne({ 'emailInfo.emailVerificationCode': token })
    if (user) {
        user.emailInfo.emailVerified = true;
        user.save()
            .then(result => {
                res.status(200).json({ Message: 'Email verified successfully', result: result });
            })
            .catch(err => {
                res.status(500).send('Error verifying email');
            })
    } else {
        res.status(400).json({ Message: 'Invalid token', result: user });
    }
}


// Login user

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await userModel.findOne({ 'emailInfo.email': email })
        if (user) {
            const comparedPassword = bcrypt.compareSync(password, user.password)
            if (comparedPassword) {
                const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1d" });
                res.status(200).json({
                    Message: "User found",
                    token: token,
                    user: user
                })
            } else {
                res.status(400).json({ Message: "Invalid detail" })
            }
        } else {
            res.status(400).json({ Message: "Invalid detail" })
        }
    }
    catch (err) {
    }
}


// Auth for all pages

const pageAuth = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, secret, (err, result) => {
        if (err) {
            return res.status(400).json({ Message: "User not found", error: err })
        } else {
            let userId = result.userId
            userModel.findById(userId)
                .then((userResult) => {
                    let emailVerified = userResult.emailInfo.emailVerified
                    return res.status(200).json({ Message: "User found", user: result, emailVerified, userResult })
                })
        }
    })
}

const resendVerificationLink = async (req, res) => {
    let userid = req.body.userId
    try {
        let theUser = await userModel.findById(userid)
        const email = theUser.emailInfo.email
        sendEmails(email, "Email verification", verifyEmailTemplate(theUser.firstName, theUser.emailInfo.emailVerificationCode))
            .then(data => {
                res.status(200).json({ status: "Email sent successfully", data: data })
            })
            .catch(err => {
                res.status(400).json({ status: "Email sent unsucessfully", error: err })
            })
    }
    catch (err) {

    }
}


const upLoadProfile = async (req, res) => {
    const { file, userId } = req.body
    let fileUrl = await saveFile(file)
    userModel.findByIdAndUpdate(
        userId,
        { $set: { photoUrl: `${fileUrl}` } },
        { new: true, useFindAndModify: false, }
    )
        .then(updatedItem => {
            res.status(200).json({ msg: "Uploaded", updatedItem })
        })
        .catch(error => {
            console.error('Error updating item:', error);
            res.status(400).json({ msg: "Unsuccessful", error })
        });
}

const saveFile = async (file) => {
    try {
        const response = await cloudinary.uploader.upload(file);
        return response.url;
    } catch (error) {
        console.error(error);
    }
}

//  Change password

const changePassword = (req, res) => {
    const { email, oldPassword, newPassword } = req.body
    userModel.findOne({ 'emailInfo.email': email })
        .then((user) => {
            const comparedPassword = bcrypt.compareSync(oldPassword, user.password)
            const comparedNewPassword = bcrypt.compareSync(newPassword, user.password)
            if (comparedNewPassword) {
                res.status(400).json({ mgs: "New password is same as old password", status: false })
            } else if (comparedPassword) {
                const hashPassword = bcrypt.hashSync(newPassword, 10)
                user.password = hashPassword
                user.save()
                    .then((newUser) => {
                        res.status(200).json({ mgs: "Changed successfully", status: true })
                    })
                    .catch((error) => {
                    })
            } else {
                res.status(400).json({ mgs: "Incorrect password", status: false })
            }
        })
        .catch((err) => {
            res.status(400).json({ mgs: "can not find user", status: false })
        })

}

const createReservedAccount = async (req, res) => {
    const { accountReference, accountName, customerEmail, customerName, nin } = req.body
    const authKey = await getMonnifyToken()
    let apiUrl = 'https://sandbox.monnify.com/api/v2/bank-transfer/reserved-accounts'
    const requestData = {
        accountReference,
        accountName,
        currencyCode: "NGN",
        contractCode: process.env.MFI_CCODE,
        customerEmail,
        customerName,
        nin,
        getAllAvailableBanks: true
    };

    let checkAccount = await reservedAccount.findOne({ userEmail: customerEmail })
    if (checkAccount) {
        res.status(500).json({ mgs: "Reserved Account already generated", checkAccount })
    } else {
        axios.post(apiUrl, requestData, {
            headers: {
                Authorization: `bearer ${authKey}`
            }
        })
            .then((response) => {
                const sendRes = response.data.responseBody.accounts
                let account = new reservedAccount({
                    accountReference,
                    userEmail: customerEmail,
                    reservedAcc: sendRes
                })
                account.save()
                    .then((data) => {
                        res.status(201).send({ msg: "Created successful", data })
                    })
                    .catch((dataErr) => {
                        res.status(400).send({ msg: "unsuccessful", dataErr })
                    })
            })
            .catch((err) => {
                if (err.response.data.responseCode == 99) {
                    res.status(400).send({ msg: "unsuccessful", err: err.response.data.responseMessage })
                } else {
                    res.status(400).send({ msg: "unsuccessful", err })
                }
            })
    }
}

const checkMonnifyTransaction = async (req, res) => {
    let adminSetFee = await useAdminSetting('monnify')
    const customerEmail = req.body.eventData.customer.email
    const amountPaid = req.body.eventData.amountPaid
    const paymentStatus = req.body.eventData.paymentStatus
    const eventType = req.body.eventType
    if (eventType === "SUCCESSFUL_TRANSACTION" && paymentStatus === "PAID") {
        const amountToCredit = Number(amountPaid) - Number(adminSetFee)
        creditUser(customerEmail, amountToCredit, "Reserved Account", "Fund wallet")
    }
}

// Get Monnify auth key or login

const getMonnifyToken = () => {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://sandbox.monnify.com/api/v1/auth/login';
        const requestData = {};

        const apiKey = process.env.MFI_KEY;
        const clientSecret = process.env.MFI_SECRET;
        const authString = Buffer.from(`${apiKey}:${clientSecret}`).toString('base64');
        const authHeader = `Basic ${authString}`;

        axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader
            }
        })
            .then(response => {
                const authToken = response.data.responseBody.accessToken;

                return resolve(authToken)
            })
            .catch(error => {
                console.error('Error:', error.message);

                return reject(error)
            });
    })
}

// Get user reserved account 

const fetchReserved = async (req, res) => {
    const { email } = req.body
    let account = await reservedAccount.findOne({ userEmail: email })
    if (account) {
        res.status(200).json({ status: true, account })
    } else {
        res.status(400).json({ status: false, mgs: "No reserved account" })
    }
}

// Save debit transaction!!!

const saveDebitTransac = (email, receiver, tansType, amountDebited) => {

    let generatedNumber = ""
    const random = '1234567890'
    for (let index = 0; index < 17; index++) {
        generatedNumber += random.charAt(Math.floor(Math.random() * random.length))
    }
    const date = new Date()
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const transactionId = `TPay_${hours}:${minutes}_${generatedNumber}`

    let transac = new debitTransaction({
        DC: "Debit",
        transactor: email,
        Recipient: receiver,
        transactionType: tansType,
        transactionId,
        amount: amountDebited,
        date,
    })
    transac.save()
        .then((res) => {
            sendEmails(email, "New Transaction", debitEmailTemplate(amountDebited,  `${date.toDateString()}`, tansType ))
        })
        .catch((error) => {
        })
}

const saveCreditTransac = (email, from, tansType, amountCredited) => {
    let generatedNumber = ""
    const random = '1234567890'
    for (let index = 0; index < 17; index++) {
        generatedNumber += random.charAt(Math.floor(Math.random() * random.length))
    }
    const date = new Date()
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const transactionId = `TPay_${hours}:${minutes}_${generatedNumber}`

    let transac = new creditTransaction({
        DC: "Credit",
        transactor: email,
        Creditor: from,
        transactionType: tansType,
        transactionId,
        amount: amountCredited,
        date,
    })
    transac.save()
        .then((res) => {
            sendEmails(email, "New Transaction", creditEmailTemplate(amountCredited, `${date.toDateString()}`, tansType))
        })
        .catch((error) => {
        })
}

const test = (req, res) => {

    saveCreditTransac(req.body.sender, "OLa Tender", "Intra_transfer", 2000)
}

const creditUser = async (userEmail, theAmount, from, tansType) => {
    let user = await userModel.findOne({ 'emailInfo.email': userEmail })
    return new Promise((resolve, reject) => {
        if (user) {
            const oldBalance = Number(user.accountBal)
            const toCredit = Number(theAmount)
            const newBalance = oldBalance + toCredit
            user.accountBal = newBalance
            user.save()
                .then((saved) => {
                    const html = `<h1>Your account as been credited with ${theAmount}.</h1>`
                    saveCreditTransac(userEmail, from, tansType, theAmount)
                    resolve({ mgs: "Credited" })
                })
                .catch((err) => {
                })
        } else {
            reject({ mgs: "No user found" })
        }
    })
}

const debitUser = async (userEmail, theAmount, tansType, receiver) => {
    let user = await userModel.findOne({ 'emailInfo.email': userEmail })
    return new Promise((resolve, reject) => {
        if (user) {
            const oldBalance = Number(user.accountBal)
            const toDebit = Number(theAmount)
            const newBalance = oldBalance - toDebit
            user.accountBal = newBalance
            user.save()
                .then((saved) => {
                    const html = `<h1>${theAmount} has been debited from your account.</h1>`
                    saveDebitTransac(userEmail, receiver, tansType, theAmount)
                    resolve({ mgs: "Debited" })
                })
                .catch((err) => {
                })
        } else {
            reject(new Error({ mgs: "No user found" }))
        }
    })
}

const intraTransfer = async (req, res) => {
    const { sender, receiver, amount } = req.body
    let user = await userModel.findOne({ 'emailInfo.email': sender })
    let transacFee = await useAdminSetting('intra')
    if (user) {
        let userBalance = Number(user.accountBal)
        let sendAmount = Number(amount)
        let amountToDebit = transacFee + sendAmount

        if (sender === receiver) {
            res.status(400).json({ mgs: "You can't send money to your own account." })
        } else if (amountToDebit > userBalance) {
            res.status(400).json({ mgs: "Insuficent fund", userBalance, transacFee })
        } else {
            debitUser(user.emailInfo.email, amountToDebit, "Intra_Transfer", receiver)
                .then((response) => {
                    if (response) {
                        creditUser(receiver, amount, `${user.firstName} ${user.lastName}`, "Intra_Transfer")
                            .then((credit) => {
                                res.status(200).json({ mgs: "Transaction Successful", response, credit })

                            })
                            .catch((error) => {
                                res.status(400).json({ mgs: "Transaction unSuccessful", error })
                            })
                    }
                })
                .catch((err) => {
                    res.status(400).json({ mgs: "Transaction unSuccessful", err })
                })
        }

    } else {
        res.status(500).json({ mgs: "No user found" })
    }
}

const transactionValidator = async (req, res) => {
    const { sender, amount } = req.body
    let user = await userModel.findOne({ 'emailInfo.email': sender })
    let transacFee = await useAdminSetting('intra')
    if (user) {
        let userBalance = Number(user.accountBal)
        let sendAmount = Number(amount)
        let amountToDebit =  Number(sendAmount) + Number(transacFee)

        if (amountToDebit > userBalance) {
            res.status(400).json({ mgs: "Insuficent fund" })
        } else {
            res.status(200).json({ mgs: "Valid Transaction", totalCharge: amountToDebit })
        }
    } else {
        res.status(500).json({ mgs: "No user found" })
    }
}

const receiverValidator = async (req, res) => {
    const { accountNo } = req.body
    let user = await userModel.findOne({ accountNo: accountNo })
    if (user) {
        res.status(200).json({ mgs: "User found", name: `${user.firstName} ${user.lastName}`, userEmail: user.emailInfo.email })
    } else {
        res.status(400).json({ mgs: "No user found!" })
    }
}

const getUserTransactions = async (req, res) => {
    const { email } = req.body
    let user = await userModel.findOne({ 'emailInfo.email': email })

    if (user) {
        let debitTransac = await debitTransaction.find({ transactor: email })
        let creditTransac = await creditTransaction.find({ transactor: email })
        if (debitTransac || creditTransac) {
            res.status(200).json({ status: true, msg: "Transaction fetched successfully", debitTransac, creditTransac })
        } else {
            res.status(201).json({ status: true, msg: "No transaction founded." })
        }
    } else {
        res.status(404).json({ status: false, msg: "No record found" })
    }
}

// Flutterwave payment integration

const initFlutterPayment = (req, res) => {
    const { tx_ref, amount, email, phonenumber, name } = req.body
    const url = 'https://api.flutterwave.com/v3/payments'
    let data = {
        tx_ref,
        amount,
        currency: "NGN",
        redirect_url: "http://localhost:5173/user/dashboard/fund_wallet/flutter_confirm",
        customer: {
            email,
            phonenumber,
            name
        },
        customizations: {
            title: "Pied Piper Payments",
            logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
        },
        configurations: {
            session_duration: 10,
            max_retry_attempt: 5,
        }
    }
    axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        }
    })
        .then((response) => {
            const date = new Date()
            let transaction = new flutterTransaction({
                tx_ref,
                amount,
                userEmail: email,
                date
            })
            transaction.save()
                .then((data) => {
                    res.status(200).json({ status: true, mgs: "Payment initialitiation successfully", paymentLink: response.data.data.link })
                })
                .catch((error) => {
                    res.status(500).json({ status: false, mgs: "Sever error", error })
                })
        })
        .catch((err) => {
            res.status(400).json({ status: false, mgs: "unsuccessfully", error: err })
        })
}



// Verify flutterwave's transaction

const verifyFlutterTransaction = async (req, res) => {
    const { tx_ref, transactionId } = req.body
    const transactionDetails = await flutterTransaction.findOne({ tx_ref: tx_ref });
    // const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,{
    //     headers: {
    //         Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
    //     }
    // })
}

// Get data plan 

const getDataPlan = async (req, res) => {
    let plans = await dataPlans.find({})
    if (plans) {
        res.status(200).json({ status: true, msg: "Data fetched successfully", plans })
    } else {
        res.status(500).json({ status: false, msg: "An error occured" })
    }
}

// Get setting

const getAdminSetting = async (req, res) => {
    let setting = await adminSetting.find({})
    if (setting) {
        res.status(200).json({ status: true, msg: "Admin settings fetched successfully", setting })
    } else {
        res.status(500).json({ status: false, msg: "An error occured" })
    }
}

const useAdminSetting = async (toReturn) => {
    let setting = await adminSetting.find({})
    return new Promise((resolve, reject)=> {
        if (setting) {
            if (toReturn === "airtime") {
                resolve(setting[0].airtimePrice)
            }
            if (toReturn === "monnify") {
                resolve(setting[0].monnifyTransactionFee)
            }
            if (toReturn === "intra") {
                resolve(setting[0].monnifyTransactionFee)
            }
        } else {
            res.status(500).json({ status: false, msg: "An error occured" })
        }
    })
}

// Buy Data 

const buyData = async (req, res) => {
    const { email, dataPlan, network, phoneNo } = req.body
    let user = await userModel.findOne({ 'emailInfo.email': email })
    if (user) {

    } else {
        res.status(500).json({ mgs: "No user found!" })
    }
}



module.exports = { registerUser, getTokenAndVerify, loginUser, resendVerificationLink, pageAuth, upLoadProfile, createReservedAccount, checkMonnifyTransaction, resetPassword, changePassword, fetchReserved, intraTransfer, transactionValidator, receiverValidator, initFlutterPayment, verifyFlutterTransaction, test, creditUser, debitUser, getUserTransactions, getDataPlan, getAdminSetting };