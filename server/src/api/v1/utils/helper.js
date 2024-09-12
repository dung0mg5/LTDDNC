const generateOTP = (digit) =>
  Math.floor(
    `1`.padEnd(digit, "0") * 1 + Math.random() * `9`.padEnd(digit, "0"),
  );

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const parseData = (req, res, next) => {
  const { experiences, educations, users } = req.body;
  const { isGroupChat } = req.query;
  if (experiences) req.body.experiences = JSON.parse(experiences);
  if (educations) req.body.educations = JSON.parse(educations);
  if (users) req.body.users = JSON.parse(users);
  if (isGroupChat) req.query.isGroupChat = JSON.parse(isGroupChat);

  next();
};

module.exports = {
  generateOTP,
  sendErrorDev,
  sendErrorProd,
  parseData,
};
