const mongoose = require('mongoose')

adminUser = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        fullName: { type: String, unique: true },
        role: String,
        password: { type: String, require: true}
    }
)

module.exports = {
    adminUser: mongoose.model('adminUser', adminUser)
}