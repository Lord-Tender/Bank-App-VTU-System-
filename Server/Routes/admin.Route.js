const express = require("express");
const router = express.Router();
const { addAdminUser, fetchAllUser, creditUser, debitUser, getAllTransaction, addNetwork, addDataPlan } = require("../Controllers/admin.Controller")

router.post("/add_user", addAdminUser)
router.get("/get_user", fetchAllUser)
router.post("/credit_user", creditUser)
router.post("/debit_user", debitUser)
router.get("/get_transactions", getAllTransaction)
router.post("/add_network", addNetwork)
router.post("/add_dataplan", addDataPlan)

module.exports = router;