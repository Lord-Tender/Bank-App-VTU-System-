const express = require("express");
const router = express.Router();
const { addAdminUser, fetchAllUser, adminCreditUser, adminDebitUser, getAllTransaction, addNetwork, addDataPlan, loginUser, addIpToWistList, getAllTransForChart, pageAuth, searchTransac, getAdminSettings, editAdminSettings, getDataPlan, verifyIp } = require("../Controllers/admin.Controller")

router.post("/add_user", addAdminUser)
router.post("/login", loginUser)
router.get("/page_auth", pageAuth)
router.get("/get_settings", getAdminSettings)
router.post("/add_ipwishlist", addIpToWistList)
router.get("/get_user", fetchAllUser)
router.post("/credit_user", adminCreditUser)
router.post("/debit_user", adminDebitUser)
router.post("/transaction/get_one", searchTransac)
router.get("/get_transactions", getAllTransaction)
router.get("/get_transactions/for_chart", getAllTransForChart)
router.post("/settings/edit", editAdminSettings)
router.post("/add_network", addNetwork)
router.post("/add_dataplan", addDataPlan)
router.get("/get_plan", getDataPlan)
router.get("/verify_ip", verifyIp)

module.exports = router;