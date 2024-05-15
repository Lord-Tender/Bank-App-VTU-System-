const express = require("express");
const router = express.Router();
const { addAdminUser, fetchAllUser, creditUser, debitUser } = require("../Controllers/admin.Controller")

router.post("/add_user", addAdminUser)
router.get("/get_user", fetchAllUser)
router.post("/credit_user", creditUser)
router.post("/debit_user", debitUser)

module.exports = router;