const express = require("express");
const router = express.Router();
const { addAdminUser, fetchAllUser, creditUser, debitUser, getAllTransaction } = require("../Controllers/admin.Controller")

router.post("/add_user", addAdminUser)
router.get("/get_user", fetchAllUser)
router.post("/credit_user", creditUser)
router.post("/debit_user", debitUser)
router.get("/get_transactions", getAllTransaction)

module.exports = router;