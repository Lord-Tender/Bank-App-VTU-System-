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
        password: { type: String, unique: true },
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
        
        Date: String,
        Time: String,
    }
)

module.exports = {
    userModel: mongoose.model('user', userSchema),
    reservedAccount: mongoose.model('reservedAccount', reservedAccount)
};