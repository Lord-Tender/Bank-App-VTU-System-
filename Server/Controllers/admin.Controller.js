const { adminUser } = require("../Models/admin.Model")
const { userModel, reservedAccount, debitTransaction, creditTransaction, flutterTransaction } = require("../Models/user.Model");
const bcrypt = require('bcrypt');


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
    .then((response)=>{
        console.log(response)
        res.status(200).json({status: true, msg: "User added successfully"})
    })
    .catch((err)=>{
        console.log(err);
        res.status(200).json({status: false, msg: "An error occured", error: err})
    })
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

module.exports = { addAdminUser, fetchAllUser }