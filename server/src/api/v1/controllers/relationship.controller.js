const catchAsync = require("../utils/catchAsync");
const ConnectionService = require("../services/connection.service");
const AppError = require("../utils/appError");

const followUser = catchAsync(async (req, res, next) => {
  const followerId = req.user.authenticatedUser._id;
  const followingId = req.params.userId;

  const isSuccessful = await ConnectionService.followUser({
    followerId,
    followingId,
  });

  if (!isSuccessful) {
    return next(new AppError("User already followed", 400));
  }

  res.json({
    message: "User is followed successfully",
  });
});

const unfollowUser = catchAsync(async (req, res, next) => {
  const followerId = req.user.authenticatedUser._id;
  const followingId = req.params.userId;

  const isSuccessful = await ConnectionService.unfollowUser({
    followerId,
    followingId,
  });

  if (!isSuccessful) {
    return next(new AppError("Not following this user", 400));
  }

  res.json({
    message: "User is unfollowed successfully",
  });
});

const getFollowingUser = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;

  const { followingUsers, amountFollowing } =
    await ConnectionService.getFollowingUser({
      followerId: req.user.authenticatedUser._id,
      page,
      limit,
    });

  res.json({
    data: followingUsers,
    count: amountFollowing,
  });
});

module.exports = {
  followUser,
  unfollowUser,
  getFollowingUser,
};
