const { query, validationResult } = require("express-validator");
const AppError = require("./appError");
const catchAsync = require("./catchAsync");

const EmailToken = require("../models/emailToken.model");
const User = require("../models/user.model");

const verifyEmailValidation = [
  query("email").isEmail().normalizeEmail(),
  query("code").isLength({ min: 5, max: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array().join(". "), 422));
    }
    next();
  },
];

const verifyEmail = catchAsync(async (req, res, next) => {
  const { code, email } = req.query;

  const [isVerified, verification] = await Promise.all([
    User.findOne({ email: { $eq: email }, isEmailVerified: true }),
    EmailToken.findOne({
      email: { $eq: email },
      verificationCode: { $eq: code },
    }),
  ]);

  if (isVerified) return next(new AppError("Email is already verified", 400));

  if (!verification)
    return next(
      new AppError("Verification code is invalid or has expired", 400),
    );

  const updatedUser = await User.findOneAndUpdate(
    { email: { $eq: email } },
    { isEmailVerified: true },
    { new: true },
  );

  await EmailToken.deleteMany({ email: { $eq: email } });
  // await Promise.all([
  //   EmailToken.deleteMany({ email: { $eq: email } }).exec(),
  //   new UserPreference({
  //     user: updatedUser,
  //     enableContextBasedAuth: true,
  //   }).save(),
  // ]);

  req.userId = updatedUser._id;
  req.email = updatedUser.email;
  next();
});

module.exports = { verifyEmailValidation, verifyEmail };
