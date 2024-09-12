const rateLimit = require("express-rate-limit");
const AppError = require("../utils/appError");

const MESSAGE = "Too many requests from this IP, please try again later!";
const ONEHOURMESSAGE =
  "Too many requests from this IP, please try again in an hour!";

const createLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: message,
    handler: (req, res, next) => {
      next(new AppError(message, 429));
    },
  });

const configLimiter = createLimiter(60 * 60 * 1000, 3500, ONEHOURMESSAGE);
const logLimiter = createLimiter(60 * 60 * 1000, 3500, ONEHOURMESSAGE);
const createPostLimiter = createLimiter(5 * 60 * 1000, 20, MESSAGE);
const likeSaveLimiter = createLimiter(10 * 60 * 1000, 250, MESSAGE);
const followLimiter = createLimiter(10 * 60 * 1000, 100, MESSAGE);
const connectionLimiter = createLimiter(10 * 60 * 1000, 100, ONEHOURMESSAGE);
const jobLimiter = createLimiter(10 * 60 * 1000, 100, ONEHOURMESSAGE);
const signUpSignInLimiter = createLimiter(10 * 60 * 1000, 100, MESSAGE);
const commentLimiter = createLimiter(5 * 60 * 1000, 100, MESSAGE);
const sendEmailLimiter = createLimiter(60 * 60 * 1000, 5, ONEHOURMESSAGE);

module.exports = {
  configLimiter,
  logLimiter,
  createPostLimiter,
  likeSaveLimiter,
  followLimiter,
  signUpSignInLimiter,
  commentLimiter,
  sendEmailLimiter,
  connectionLimiter,
  jobLimiter,
};
