const express = require("express");
const router = express.Router();
const { addAdminUser, fetchAllUser, adminCreditUser, adminDebitUser, getAllTransaction, addNetwork, addDataPlan, loginUser, addIpToWistList } = require("../Controllers/admin.Controller")

router.post("/add_user", addAdminUser)
router.post("/login", loginUser)
router.post("/add_ipwishlist", addIpToWistList)
router.get("/get_user", fetchAllUser)
router.post("/credit_user", adminCreditUser)
router.post("/debit_user", adminDebitUser)
router.get("/get_transactions", getAllTransaction)
router.post("/add_network", addNetwork)
router.post("/add_dataplan", addDataPlan)

module.exports = router;