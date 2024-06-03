const { adminUser, dataPlans, ipWishList, adminSetting } = require("../Models/admin.Model")
const { userModel, reservedAccount, debitTransaction, creditTransaction, flutterTransaction } = require("../Models/user.Model");
const secret = process.env.SECRET
const { creditUser, debitUser } = require('./user.Controller')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const adminModel = require("../Models/admin.Model");


const addAdminUser = (req, res) => {
    const { email, role, fullName, password } = req.body
    let hashPassword = bcrypt.hashSync(password, 10)
    let admin = new adminUser({
        email,
        role,
        fullName,
        password: hashPassword
    })
    admin.save()
        .then((response) => {
            console.log(response)
            res.status(200).json({ status: true, msg: "User added successfully" })
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ status: false, msg: "An error occured", error: err })
        })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await adminUser.findOne({ email })
        if (user) {
            const comparedPassword = bcrypt.compareSync(password, user.password)
            if (comparedPassword) {
                const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "2m" });
                res.status(200).json({
                    status: true,
                    msg: "User found",
                    token: token
                })
            } else {
                res.status(400).json({ status: false, msg: "Invalid detail" })
            }
        } else {
            res.status(400).json({ status: false, msg: "Invalid detail" })
        }
    }
    catch (err) {
        console.log(err);
    }

}

const pageAuth = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, secret, (err, result) => {
        if (err) {
            return res.status(400).json({ Message: "User not found", error: err })
        } else {
            let userId = result.userId
            adminUser.findById(userId)
                .then((userResult) => {
                    return res.status(200).json({ Message: "User found", userResult })
                })
        }
    })
}

const addIpToWistList = async (req, res) => {
    const { ip, email } = req.body
    let theAdmin = await addAdminUser.findOne({ email })
    if (theAdmin) {
        let newIpWishList = new ipWishList({
            ip,
            addBy: email
        })
        newIpWishList.save()
            .then((response) => {
                res.status(200).json({ status: "Success", msg: "Ip address is wishlisted" })
            })
            .catch((err) => {
                res.status(500).json({ status: "Error", msg: "Error added ip" })
            })
    } else {
        res.status(400).json({ status: false, msg: "Admin user not found" })
    }
}

const verifyIp = (req, res) => {

}

const fetchAllUser = async (req, res) => {
    try {
        let allUsers = await userModel.find({})
        res.status(200).json({ status: true, allUsers })
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: err })
    }
}

const adminCreditUser = async (req, res) => {
    const { userEmail, amount, reason } = req.body
    console.log(req.body);
    let user = userModel.findOne({ 'emailInfo.email': userEmail })
    if (user) {
        creditUser(userEmail, amount, reason, "Admin deck")
            .then((response) => {
                res.status(200).json({ msg: "Success", status: true, response })
            })
            .catch((err) => {
                res.status(400).json({ msg: "unsuccessful", status: false, error: err })
            })
    } else {
        res.status(404).json({ msg: "can not find user", status: false })
    }
}

const adminDebitUser = async (req, res) => {
    const { userEmail, amount } = req.body
    let user = await userModel.findOne({ 'emailInfo.email': userEmail })
    if (user) {
        debitUser(userEmail, amount, "Admin", "Admin")
            .then((response) => {
                res.status(200).json({ msg: "Success", status: true, response })
            })
            .catch((err) => {
                res.status(400).json({ msg: "unsuccessful", status: false, error: err })
            })
    } else {
        res.status(500).json({ msg: "An error occured" })
    }
}

const getAllTransaction = async (req, res) => {
    let debitTransactio = await debitTransaction.find({})
    let creditTransactio = await debitTransaction.find({})
    let flutterTransactio = await debitTransaction.find({})
    let allTransaction = []
    let newAllTrans = allTransaction.concat(debitTransactio, creditTransactio, flutterTransactio)
    if (debitTransaction && creditTransaction && flutterTransaction) {
        res.status(200).json({ status: true, allTransaction: newAllTrans })
    } else {
        res.status(500).json({ status: false, msg: "Am error occurred" })
    }
}

const getAllTransForChart = async (req, res) => {
    let debitTransactio = await debitTransaction.find({})
    let creditTransactio = await debitTransaction.find({})
    let flutterTransactio = await debitTransaction.find({})
    let allTransaction = []
    let newAllTrans = allTransaction.concat(debitTransactio, creditTransactio, flutterTransactio)

    const extractDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const aggregatedData = newAllTrans.reduce((acc, transaction) => {
        const date = extractDate(transaction.date)
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += 1;
        return acc;
    }, {});

    const result = Object.keys(aggregatedData).map(date => ({
        date,
        transactionCount: aggregatedData[date]
    }));

    if (debitTransactio && creditTransactio && flutterTransactio) {
        res.status(200).json({ status: true, result })
    } else {
        res.status(500).json({ status: false, msg: "Am error occurred" })
    }
}

const searchTransac = async (req, res) => {
    const { transactionId } = req.body
    let debitTransactio = await debitTransaction.findOne({ transactionId })
    let creditTransactio = await creditTransaction.findOne({ transactionId })
    if (debitTransactio) {
        res.status(200).json({ msg: "success", transactionDetail: debitTransactio, transactionType: "Debit" })
    }else if (creditTransactio) {
        res.status(200).json({ msg: "success", transactionDetail: creditTransactio, transactionType: "Credit" })
    }else{
        res.status(400).json({ msg: "No transaction found!" })
    }
}

const addNetwork = async (req, res) => {
    const { network_id, network_name } = req.body
    let plans = await dataPlans.find({})
    if (plans.network_id == network_id) {
        res.status(400).json({ status: false, msg: "A network already has the Id or name" })
    }else if (plans.length >= 4) {
        res.status(400).json({ status: false, msg: "You added upto 4 network already" })
    }else {
        let network = new dataPlans({
            network_id,
            network_name,
            dataPlans: []
        })
        network.save()
            .then((data) => {
                res.status(200).json({ status: true, msg: "added successful", data })
            })
            .catch((error) => {
                res.status(400).json({ status: false, msg: "an error occurred", error })
            })
    }
}

const addDataPlan = (req, res) => {
    const { network_id, server_id, price, valid_period, byte } = req.body
    let newPlan = { server_id, price, valid_period, byte }
    let network = dataPlans.findOne({ network_id })
    if (network) {
        let plan = network.dataPlans
        plan.push(newPlan)
        network.save()
            .then((data) => {
                res.status(200).json({ status: true, msg: "added successful", data })
            })
            .catch((error) => {
                res.status(400).json({ status: false, msg: "an error occurred", error })
            })
    }

}

const getAdminSettings = async (req, res) => {
    let settings = await adminSetting.find({})
    if (settings) {
        res.status(200).json({ status: true, msg: "Admin settings fetched successfully", settings })
    }else{
        res.status(500).json({ status: false, msg: "Server error"})
    }
}

const editAdminSettings = async (req, res) => {
    const { whatToEdit, newValue } = req.body
    let settings = await adminSetting.findById(process.env.ADMIN_SID)
    if ( whatToEdit === "airtimePrice" ) {
        settings.airtimePrice = newValue
        settings.save()
        .then((data) => {
            console.log(data);
            res.status(200).json({ status: true, msg: "Change saved successfully"})
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ status: false, msg: "an error occurred", error })
        })
    }else if ( whatToEdit === "monnifyFee" ) {
        settings.monnifyTransactionFee = newValue
        settings.save()
        .then((data) => {
            console.log(data);
            res.status(200).json({ status: true, msg: "Change saved successfully"})
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ status: false, msg: "an error occurred", error })
        })
    }else if ( whatToEdit === "intraFee" ) {
        settings.intraTransferFee = newValue
        settings.save()
        .then((data) => {
            console.log(data);
            res.status(200).json({ status: true, msg: "Change saved successfully"})
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ status: false, msg: "an error occurred", error })
        })
    }
}

const getDataPlan = async (req, res) => {
    let plans = await dataPlans.find({})
    if (plans) {
        console.log(plans)
        res.status(200).json({ status: true, msg: "Data plan fetched", data: plans })
    }else {
        res.status(500).json({ status: false, msg: "Server error" })
    }
}

const text = (req, res) => {
    let gb = new adminSetting({})
    gb.save()
    .then((ee)=>{
        console.log("Saved");
    })
}

module.exports = { addAdminUser, fetchAllUser, adminCreditUser, adminDebitUser, getAllTransaction, addNetwork, addDataPlan, loginUser, addIpToWistList, getAllTransForChart, pageAuth, searchTransac, getAdminSettings, editAdminSettings, getDataPlan }