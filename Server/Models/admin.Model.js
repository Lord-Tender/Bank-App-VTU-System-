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

module.exports = {
    adminUser: mongoose.model('adminUser', adminUser),
    dataPlans: mongoose.model('dataPlans', dataPlans)
}