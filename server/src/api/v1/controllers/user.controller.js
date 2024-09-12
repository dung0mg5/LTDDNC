const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../../../../config/cloud");
const AppError = require("../utils/appError");
const UserService = require("../services/user.service");
const TokenService = require("../services/token.service");
const { sendVerificationEmail } = require("../services/emailToken.service");

const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await UserService.checkUserExist({ email });
  if (!existingUser)
    return next(
      new AppError(`Invalid credentials. Email: ${email} is not found`, 404),
    );

  const matched = await UserService.checkPassword({ existingUser, password });
  if (!matched)
    return next(
      new AppError("Invalid credentials. Email or Password is wrong", 400),
    );

  const { accessToken, refreshToken } = await TokenService.createToken({
    existingUser,
  });

  res.cookie("refreshToken", refreshToken, {
    expires: new Date(
      Date.now() + process.env.REFRESH_JWT_EXPIRES_IN[0] * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: "strict",
  });

  res.status(200).json({
    accessToken,
    accessTokenUpdatedAt: new Date().toLocaleString(),
    user: {
      authenticatedUser: {
        ...existingUser._doc,
      },
    },
  });
});

const logout = catchAsync(async (req, res, next) => {
  // const accessToken = req.cookies?.accessToken;
  const accessToken = req.headers.authorization?.split(" ")[1] ?? null;
  if (!accessToken) return next(new AppError("Invalid access token", 401));

  await UserService.logout({ accessToken });

  res.cookie("refreshToken", "logged-out", {
    expires: new Date(Date.now() + 2000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: "strict",
  });

  req.logout(() => {
    res.status(200).json({
      message: "Logout successfully",
    });
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await UserService.checkUserExist({ email });
  if (existingUser) return next(new AppError("Email is already in use", 400));

  const newUser = await UserService.createUser({
    firstName,
    lastName,
    email,
    password,
  });
  if (!newUser) return next(new AppError("Failed to add user", 400));

  res.json({ _id: newUser._id, message: "User was successfully created" });
});

const getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const existingUser = await UserService.checkUserExist({ userId });

  if (!existingUser) return next(new AppError("User is not found", 404));

  res.json({
    user: {
      ...existingUser._doc,
    },
  });
});

const updateInfoExistingUser = catchAsync(async (req, res) => {
  res.status(404).json({ message: "This route is not defined" });
});

const updateAvatar = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { file } = req;

  const existingUser = await UserService.checkUserExist({ userId });
  if (!existingUser) return next(new AppError("User is not found", 404));

  if (file) {
    const avatarId = existingUser.avatar?.public_id;
    if (avatarId) {
      if (!avatarId.includes("default-avatar")) {
        const { result } = await cloudinary.uploader.destroy(avatarId);
        if (result !== "ok")
          return next(new AppError("Failed to delete old avatar", 400));
      }

      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: "avatars" },
      );

      existingUser.avatar = { url, public_id };
    }
    existingUser.save();
  }

  res.json({ message: "Upload Avatar successfully" });
});

const updateInfoForNewUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  if (Object.keys(req.body).length === 0)
    return next(new AppError("No data to update", 400));

  const updatedUser = await UserService.updateUser({
    userId,
    data: req.body,
  });
  if (!updatedUser) return next(new AppError("Failed to update", 400));

  res.json({ message: "Update new user successfully" });
});

// ================= fake =================
const sendEmail = catchAsync(async (req, res, next) => {
  const { userId, type } = req.body;

  const existingUser = await UserService.checkUserExist({ userId });
  if (!existingUser) return next(new AppError("User is not found", 404));

  await sendVerificationEmail({ user: existingUser, type });

  res.json({
    email: existingUser.email,
    message: `OTP was successfully sent to ${existingUser.email}`,
  });
});

const doRefreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const existingToken = await TokenService.checkTokenExist({ refreshToken });
  if (!existingToken) return next(new AppError("Invalid refresh token", 401));

  const existingUser = await UserService.checkUserExist({
    userId: existingToken.user,
  });
  if (!existingUser) return next(new AppError(`"Invalid refresh token`, 401));

  const isRefreshTokenExpired = await TokenService.checkRefreshTokenExpired({
    existingToken,
  });
  if (!isRefreshTokenExpired)
    return next(new AppError("Expired refresh token", 401));

  const accessToken = await TokenService.createAccessToken({ existingUser });

  res.status(200).json({
    accessToken,
    accessTokenUpdatedAt: new Date().toLocaleString(),
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const existingUser = await UserService.checkUserExist({ email });
  if (!existingUser) return next(new AppError("Email is not found", 404));

  await sendVerificationEmail({ user: existingUser, type: "password" });

  res.json({ message: `OTP was successfully sent to ${existingUser.email}` });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { email } = req;
  const { newPassword } = req.body;

  const newUser = await UserService.changePassword({ email, newPassword });
  if (!newUser) return next(new AppError("Failed to change password", 400));

  res.json({ message: "Password was successfully changed" });
});

const searchUser = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const users = await UserService.searchUser({ name });
  res.json({ data: users });
});

module.exports = {
  signIn,
  logout,
  createUser,
  getUser,
  updateInfoForNewUser,
  updateInfoExistingUser,
  doRefreshToken,
  forgotPassword,
  resetPassword,
  sendEmail,
  updateAvatar,
  searchUser,
};
