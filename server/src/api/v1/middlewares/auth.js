const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const EmailTokenService = require("../services/emailToken.service");

const User = require("../models/user.model");

const restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    const user = await User.findById(req.userId).lean();
    if (!user) return next(new AppError("User not found", 404));

    // roles ['admin', 'company']. role='user'
    if (!roles.includes(user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  });

const requireAuth = passport.authenticate(
  "jwt",
  {
    failureRedirect: "/api/v1/auth/fail",
  },
  null,
);

const requireAuthGoogle = passport.authenticate(
  "google",
  {
    scope: ["profile", "email"],
  },
  null,
);

const requireAuthGoogleCallback = passport.authenticate(
  "google",
  {
    failureRedirect: "/api/v1/auth/fail",
  },
  null,
);

const isValidOtpToken = catchAsync(async (req, res, next) => {
  const { token, email } = req.query;
  const isValid = await EmailTokenService.verifyEmailToken({
    token,
    email,
  });
  if (!isValid) return next(new AppError("Invalid Token", 400));

  req.email = email;
  next();
});

module.exports = {
  requireAuth,
  requireAuthGoogle,
  requireAuthGoogleCallback,
  restrictTo,
  isValidOtpToken,
};
