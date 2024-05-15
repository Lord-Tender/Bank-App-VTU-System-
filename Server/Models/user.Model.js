const mongoose = require('mongoose')

userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        dateOfBirth: { type: Date },
        accountNo: { type: Number, unique: true },
        accountBal: { type: Number, default: 0 },
        phoneNo: {
            phone: { type: Number, unique: true },
            phoneVerified: { type: Boolean, default: false },
            phoneVerificationCode: { type: String, unique: true }
        },
        emailInfo: {
            email: { type: String, unique: true },
            emailVerified: { type: Boolean, default: false },
            emailVerificationCode: { type: String, unique: true },
        },
        password: { type: String },
        profileUpdated: { type: Boolean, default: false }
    },
    {
        strict: false
    }
)

reservedAccount = new mongoose.Schema(
    {
        userEmail: String,
        accountReference: String,
        reservedAcc: [
            {
                bankCode: String,
                bankName: String,
                accountNumber: String,
                accountName: String
            },
            {
                bankCode: String,
                bankName: String,
                accountNumber: String,
                accountName: String
            }
        ]
    }
)

debitTransaction = new mongoose.Schema(
    {
        transactor: String,
        Recipient: String,
        transactionType: String,
        transactionId: String,
        amount: String,
        date: String,
        time: String
    }
)

creditTransaction = new mongoose.Schema(
    {
        transactor: String,
        From: String,
        transactionType: String,
        transactionId: String,
        amount: String,
        date: String,
        time: String
    }
)

flutterTransaction = new mongoose.Schema(
    {
        tx_ref: { type: String, unique: true },
        amount: Number,
        userEmail: String,
        Status: { type: String, default: "pending" },
        credited: { type: Boolean, default: false },
        webhook: {
            received: { type: Boolean, default: false },
            verified: { type: Boolean, default: false },
            timeReceived: { type: Number, default: 0 },
        },
        date: String
    }
)

module.exports = {
    userModel: mongoose.model('user', userSchema),
    reservedAccount: mongoose.model('reservedAccount', reservedAccount),
    debitTransaction: mongoose.model('debitTransaction', debitTransaction),
    creditTransaction: mongoose.model('creditTransaction', creditTransaction),
    flutterTransaction: mongoose.model('flutterTransaction', flutterTransaction)
};