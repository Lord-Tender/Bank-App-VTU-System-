const mongoose = require('mongoose')

adminUser = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        fullName: { type: String, unique: true },
        role: String,
        password: { type: String, require: true}
    }
)

dataPlans = new mongoose.Schema(
    {
        network_id: String,
        network_name: String,
        dataPlans: []
    }
)

settings = new mongoose.Schema(
    {
        airtimePrice: { type: Number },
        
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
    ipWishList: mongoose.model('ipWishList', ipWishList)
}