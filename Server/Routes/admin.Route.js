const express = require("express");
const router = express.Router();
const { addAdminUser, fetchAllUser, creditUser } = require("../Controllers/admin.Controller")

router.post("/add_user", addAdminUser)
router.get("/get_user", fetchAllUser)
router.post("/credit_user", creditUser)

module.exports = router;