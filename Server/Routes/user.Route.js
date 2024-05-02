const express = require("express");
const router = express.Router();
const { registerUser, verifyEmail, getTokenAndVerify, loginUser, resendVerificationLink, pageAuth, upLoadProfile, createReservedAccount, checkMonnifyTransaction, resetPassword, changePassword, fetchReserved } = require("../Controllers/user.Controller");

router.post("/register", registerUser);
router.post("/verify", verifyEmail);
router.get("/verify", getTokenAndVerify)
router.post("/login", loginUser)
router.get("/page_auth", pageAuth)
router.post("/resendlink", resendVerificationLink)
router.post("/upload_profile", upLoadProfile)
router.post("/reset_password", resetPassword)
router.post("/change_password", changePassword)
router.post("/fund_wallet/monnify", createReservedAccount)
router.post("/fund_wallet/monnify/get_account", fetchReserved)
router.post("/fund_wallet/monnify/comfirmed", checkMonnifyTransaction)



module.exports = router;