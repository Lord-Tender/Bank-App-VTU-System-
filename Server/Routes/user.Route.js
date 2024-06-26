const express = require("express");
const router = express.Router();
const { registerUser, getTokenAndVerify, loginUser, resendVerificationLink, pageAuth, upLoadProfile, createReservedAccount, checkMonnifyTransaction, resetPassword, changePassword, fetchReserved, intraTransfer, transactionValidator, receiverValidator, initFlutterPayment, verifyFlutterTransaction, getUserTransactions, getDataPlan, getAdminSetting, test } = require("../Controllers/user.Controller");

router.post("/register", registerUser);
router.get("/verify", getTokenAndVerify)
router.post("/login", loginUser)
router.get("/page_auth", pageAuth)
router.post("/transaction", getUserTransactions)
router.post("/resendlink", resendVerificationLink)
router.post("/upload_profile", upLoadProfile)
router.post("/reset_password", resetPassword)
router.post("/change_password", changePassword)
router.post("/fund_wallet/monnify", createReservedAccount)
router.post("/fund_wallet/monnify/get_account", fetchReserved)
router.post("/fund_wallet/monnify/comfirmed", checkMonnifyTransaction)
router.post("/intra_transfer", intraTransfer)
router.post("/intra_transfer/validate", transactionValidator)
router.post("/intra_transfer/get_receiver", receiverValidator)
router.post("/fund_wallet/flutterwave", initFlutterPayment)
router.post("/fund_wallet/flutterwave/comfirmed", verifyFlutterTransaction)
router.get("/get_plans", getDataPlan)
router.get("/get_setting", getAdminSetting)
router.post("/test", test)



module.exports = router;