const mongoose = require('mongoose')

adminUser = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        fullName: { type: String},
        role: String,
        password: { type: String, require: true}
    }
)

dataPlans = new mongoose.Schema(
    {
        network_id: { type: String, unique: true },
        network_name: { type: String, unique: true },
        dataPlans: []
    }
)

settings = new mongoose.Schema(
    {
        airtimePrice: { type: Number, default: 0},
        monnifyTransactionFee: { type: Number, default: 0 },
        intraTransferFee: { type: Number, default: 0 }
    }
)

ipWishList = new mongoose.Schema(
    {
        ip: { type: String, require: true },
        addBy: { type: String, require: true }
    }
)

module.exports = {
    adminUser: mongoose.model('adminUser', adminUser),
    dataPlans: mongoose.model('dataPlans', dataPlans),
    ipWishList: mongoose.model('ipWishList', ipWishList),
    adminSetting: mongoose.model('adminSetting', settings)
}