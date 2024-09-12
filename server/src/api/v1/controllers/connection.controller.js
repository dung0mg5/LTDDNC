const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ConnectionService = require("../services/connection.service");

const requestConnection = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { note } = req.body;

  const { error, status } = await ConnectionService.requestConnection({
    requesterId: req.user.authenticatedUser._id,
    recipientId: userId,
    note,
  });

  if (error) return next(new AppError(error, status));

  res.json({ message: "Connection request sent" });
});

const getPendingConnections = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;

  const { connections, amountConnection } =
    await ConnectionService.getPendingConnections({
      user: req.user.authenticatedUser,
      page,
      limit,
    });

  res.json({
    data: connections,
    count: amountConnection,
  });
});

const confirmConnection = catchAsync(async (req, res, next) => {
  const { connectionId } = req.params;

  const { error, status } = await ConnectionService.confirmConnection({
    connectionId,
    recipientId: req.user.authenticatedUser._id,
  });

  if (error) return next(new AppError(error, status));

  res.json({ message: "Connection confirmed" });
});

const rejectConnection = catchAsync(async (req, res, next) => {
  const { connectionId } = req.params;

  const { error, status } = await ConnectionService.rejectConnection({
    connectionId,
    recipientId: req.user.authenticatedUser._id,
  });

  if (error) return next(new AppError(error, status));

  res.json({ message: "Connection rejected" });
});

const getSentConnection = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;

  const { connections, amountConnection } =
    await ConnectionService.getSentConnection({
      user: req.user.authenticatedUser,
      page,
      limit,
    });

  res.json({
    data: connections,
    count: amountConnection,
  });
});

const withdrawSentConnection = catchAsync(async (req, res, next) => {
  const { connectionId } = req.params;

  const { error, status } = await ConnectionService.withdrawSentConnection({
    connectionId,
    requesterId: req.user.authenticatedUser._id,
  });

  if (error) return next(new AppError(error, status));

  res.json({ message: "Sent connection withdraw" });
});

const getConnections = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;

  const { connections, amountConnection } =
    await ConnectionService.getConnections({
      user: req.user.authenticatedUser,
      page,
      limit,
    });

  res.json({
    data: connections,
    count: amountConnection,
  });
});

const removeConnection = catchAsync(async (req, res, next) => {
  const { connectionId } = req.params;

  const { error, status } = await ConnectionService.removeConnection({
    connectionId,
    requesterId: req.user.authenticatedUser._id,
  });

  if (error) return next(new AppError(error, status));

  res.json({ message: "Connection removed" });
});

const searchConnection = catchAsync(async (req, res, next) => {
  const { page, limit, name } = req.query;

  const { connections, amountConnection } =
    await ConnectionService.searchConnection({
      requesterId: req.user.authenticatedUser._id,
      page,
      limit,
      name,
    });

  res.json({
    data: connections,
    count: amountConnection,
  });
});

const checkConnection = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const isConnection = await ConnectionService.checkUserIsConnected({
    requesterId: req.user.authenticatedUser._id,
    userId,
  });

  res.json({ data: isConnection });
});

module.exports = {
  requestConnection,
  rejectConnection,
  confirmConnection,
  getPendingConnections,
  getSentConnection,
  withdrawSentConnection,
  getConnections,
  searchConnection,
  removeConnection,
  checkConnection,
};
