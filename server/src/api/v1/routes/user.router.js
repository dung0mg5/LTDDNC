const router = require("express").Router();
const { requireAuth, isValidOtpToken } = require("../middlewares/auth");
const {
  signUpSignInLimiter,
  configLimiter,
  sendEmailLimiter,
} = require("../middlewares/limiter");

const {
  signIn,
  updateInfoForNewUser,
  updateInfoExistingUser,
  getUser,
  createUser,
  logout,
  doRefreshToken,
  forgotPassword,
  resetPassword,
  sendEmail,
  updateAvatar,
  searchUser,
} = require("../controllers/user.controller");
const { parseData } = require("../utils/helper");
const { uploadFile } = require("../middlewares/multer");

router.get("/search", searchUser);
router.post("/logout", logout);
router.post("/sign-in", signUpSignInLimiter, signIn);
router.post("/sign-up", signUpSignInLimiter, createUser);
router.post("/refresh-token", doRefreshToken);
router.patch("/upload-avatar/:userId", uploadFile, updateAvatar);
router
  .route("/new/:userId")
  .patch(configLimiter, parseData, updateInfoForNewUser);
router
  .route("/:userId")
  .get(configLimiter, getUser)
  .patch(configLimiter, requireAuth, parseData, updateInfoExistingUser);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", isValidOtpToken, (req, res) => {
  res.json({ isValid: true });
});
router.post("/send-email", sendEmail);
router.post(
  "/reset-password",
  isValidOtpToken,
  resetPassword,
);

module.exports = router;
