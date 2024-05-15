const { adminUser } = require("")

const addAdminUser = (req, res) => {
    const { email, role, fullName, password } = req.body
    let admin = new adminUser({
        email, 
        role, 
        fullName, 
        password
    })
    admin.save()
    .then((response)=>{
        res.status(200).json({status: true, msg: "User added successfully"})
    })
    .catch((err)=>{
        res.status(200).json({status: false, msg: "An error occured", error: err})
    })
}