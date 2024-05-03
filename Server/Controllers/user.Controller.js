const { userModel, reservedAccount } = require("../Models/user.Model");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET
var cloudinary = require('cloudinary');
const { Buffer } = require('buffer');
const axios = require('axios');



cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPI,
    api_secret: process.env.CLOUDSECRET
});

// Register User

const registerUser = (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth, phoneNumber } = req.body

    const generatedAccountNo = Math.floor(Math.random(1000000000) * 99999999999);
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
            emailVerificationCode: testCode()
        },
        password: hashPassword
    })
    user.save()
        .then(data => {
            console.log("Save succesfully" + data);
            res.status(201).json({ status: "Register sucessfully", data: data })
            verifyEmail(email)
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


const verifyEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            userModel.findOne({ 'emailInfo.email': email })
                .then(user => {
                    if (user) {
                        console.log("we found the user", user);
                        let verificationToken = user.emailInfo.emailVerificationCode;
                        let toEmail = user.emailInfo.email;

                        console.log(verificationToken);
                        transporter.sendMail({
                            from: process.env.NODEMAILER_USER,
                            to: toEmail,
                            subject: 'Email Verification',
                            text: `Click the following link to verify your email: http://localhost:5000/verify?token=${verificationToken}`
                        }, (err, info) => {
                            if (err) {
                                console.error('Error sending email:', err);
                                reject({ msg: 'An error', status: false, err });
                            } else {
                                console.log('Email sent:', info);
                                resolve({ msg: 'Email sent successful', status: true, info });
                            }
                        });
                    } else {
                        console.log("User does not exist");
                        reject(new Error('User not found'));
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

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
                console.error('Error sending email:', err);
                reject({ msg: 'An error', status: false, err });
            } else {
                console.log('Email sent:', info);
                resolve({ msg: 'Email sent successful', status: true, info });
            }
        });
    })
}

// Password reset

const resetPassword = (req, res) => {
    const { email } = req.body
    console.log(email);
    try {
        userModel.findOne({ 'emailInfo.email': email })
            .then((user) => {
                if (user) {
                    console.log(user);
                    let newPassword = generateNewPassword()
                    console.log(newPassword);
                    let hashNewPassword = bcrypt.hashSync(newPassword, 10);
                    user.password = hashNewPassword
                    user.save()
                        .then((newData) => {
                            const html = `<h2 color="blue"> your new password is: ${newPassword} </h2>`
                            sendEmails(email, "Password Reset", html)
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
                console.log(err);
                res.status(500).json({ mgs: "User not found", err })
            })
    }
    catch (error) {
        console.log(error);
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
        if (user.emailInfo.emailVerified = true) {
            res.status(200).json({ Message: 'Email is Already verified' });
        } else {
            console.log(user);
            user.emailInfo.emailVerified = true;
            user.save()
                .then(result => {
                    res.status(200).json({ Message: 'Email verified successfully', result: result });
                    console.log("SUCCUSSFUL");
                })
                .catch(err => {
                    res.status(500).send('Error verifying email');
                })
        }
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
        console.log(err);
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
        verifyEmail(email)
            .then(data => {
                console.log(data);
                res.status(200).json({ status: "Email sent successfully", data: data })
            })
            .catch(err => {
                res.status(400).json({ status: "Email sent unsucessfully", error: err })
                console.log(err);
            })
    }
    catch (err) {

    }
}


const upLoadProfile = async (req, res) => {
    const { file, userId } = req.body
    let fileUrl = await saveFile(file)
    console.log(fileUrl, userId);
    userModel.findByIdAndUpdate(
        userId,
        { $set: { photoUrl: `${fileUrl}` } },
        { new: true, useFindAndModify: false, }
    )
        .then(updatedItem => {
            console.log('Item updated:', updatedItem);
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
                        console.log(error);
                    })
            } else {
                res.status(400).json({ mgs: "Incorrect password", status: false })
            }
        })
        .catch((err) => {
            // console.log(err); 
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

const checkMonnifyTransaction = (req, res) => {
    console.log(req.body);
    const customerEmail = req.body.eventData.customer.email
    const amountPaid = req.body.eventData.amountPaid
    const paymentStatus = req.body.eventData.paymentStatus
    const eventType = req.body.eventType
    if (eventType === "SUCCESSFUL_TRANSACTION" && paymentStatus === "PAID") {
        console.log(customerEmail, eventType, amountPaid, paymentStatus);
        const amountToCredit = Number(amountPaid) - 50
        console.log(amountToCredit);
        creditUser(customerEmail, amountToCredit)
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

// Credit user 

const creditHtml = (amount) => {
    let html = `<body style="font-family: sans-serif;">
    <div style="color: white; 
    background-color: rgb(68, 68, 245); 
    height: 5rem; 
    font-weight: bold; 
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    ">
        New Transaction alert
    </div>
    <div style="display: flex; 
    justify-content: center;
    flex-direction: column; 
    align-items: center;
    background-color: whitesmoke;
    height: 60vh;
    font-size: 1.8rem;">
        <div>
            <p style="text-align: center;">${amount}</p>
            <p style="text-align: center;">Credited</p>
        </div>
    </div>

    <div style="color: white; 
    background-color: rgb(68, 68, 245); 
    height: 5rem; 
    font-weight: bold; 
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    ">
        © Tender Pay
    </div>
</body>`

    return html
}

const creditUser = async (userEmail, theAmount) => {
    let user = await userModel.findOne({ 'emailInfo.email': userEmail })
    return new Promise((resolve, reject) => {
        if (user) {
            const oldBalance = Number(user.accountBal)
            const toCredit = Number(theAmount)
            const newBalance = oldBalance + toCredit
            user.accountBal = newBalance
            user.save()
                .then((saved) => {
                    console.log(saved);
                    const html = `<h1>Your account as been credited with ${theAmount}.</h1>`
                    sendEmails(userEmail, "New Transaction", creditHtml(theAmount))
                    resolve(res.status(200).json({ mgs: "Credited" }))
                })
                .catch((err) => {
                    console.log("Error saving  " + err);
                })
        } else {
            reject(res.status(400).json({ mgs: "No user found" }))
        }
    })
}

const debitUser = async (userEmail, theAmount) => {
    let user = await userModel.findOne({ 'emailInfo.email': userEmail })
    return new Promise((resolve, reject) => {
        if (user) {
            const oldBalance = Number(user.accountBal)
            const toDebit = Number(theAmount)
            const newBalance = oldBalance - toDebit
            user.accountBal = newBalance
            user.save()
                .then((saved) => {
                    console.log(saved);
                    const html = `<h1>${theAmount} has been debited from your account.</h1>`
                    sendEmails(userEmail, "New Transaction", html)
                    reject(res.status(200).json({ mgs: "Debited" }))
                })
                .catch((err) => {
                    console.log("Error saving  " + err);
                })
        } else {
            resolve(res.status(400).json({ mgs: "No user found" }))
        }
    })
}

const intraTransfer = async (req, res) => {
    const { sender, sendee, amount } = req.body
    let user = await userModel.findOne({ 'emailInfo.email': sender })
    if (user) {
        let userBalance = Number(user.accountBal)
        let sendAmount = Number(amount)
        let transacFee = (sendAmount * 0.015)
        let amountToDebit = transacFee + sendAmount

        if (amountToDebit > userBalance) {
            res.status(400).json({ mgs: "Insuficent fund", userBalance, transacFee })
        } else {
            debitUser(user.emailInfo.email, amountToDebit)
                .then((response) => {
                    res.status(400).json({ mgs: "Transaction Successful", response })
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    } else {
        res.status(500).json({ mgs: "No user found" })
    }
}




module.exports = { registerUser, verifyEmail, getTokenAndVerify, loginUser, resendVerificationLink, pageAuth, upLoadProfile, createReservedAccount, checkMonnifyTransaction, resetPassword, changePassword, fetchReserved, intraTransfer };