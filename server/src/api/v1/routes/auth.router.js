const router = require("express").Router();

const {
  requireAuthGoogle,
  requireAuth,
  requireAuthGoogleCallback,
} = require("../middlewares/auth");
const { signUpSignInLimiter } = require("../middlewares/limiter");
const AppError = require("../utils/appError");

router.get("/", signUpSignInLimiter, requireAuth, (req, res) => {
  res.json({
    user: {
      authenticatedUser: {
        ...req.user.authenticatedUser,
      },
    },

    accessToken: req.user.newToken,
  });
});

router.get("/google", requireAuthGoogle);
router.get("/google/callback", requireAuthGoogleCallback, (req, res) => {
  res.json({
    user: { ...req.user.authenticatedUser },
    newToken: req.user.newToken,
  });
  // res.redirect(
  //   `socialjob://login?user=${encodeURIComponent(JSON.stringify(req.user.authenticatedUser))}`,
  // );
});
router.get("/fail", (req, res, next) => {
  next(new AppError("Unauthorized", 401));
});

module.exports = router;
