const express = require("express");
const router = express.Router();
const { addAdminUser, fetchAllUser } = require("../Controllers/admin.Controller")

router.post("/add_user", addAdminUser)
router.get("/get_user", fetchAllUser)

module.exports = router;