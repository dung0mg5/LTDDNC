const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const { v4: uuid } = require("uuid");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const mongoSanitize = require("express-mongo-sanitize");

const AppError = require("./src/api/v1/utils/appError");
const globalErrorHandler = require("./src/api/v1/middlewares/handleError");

const companiesRouter = require("./src/out/routes/company.router");
const universitiesRouter = require("./src/out/routes/university.router");
const usersRouter = require("./src/api/v1/routes/user.router");
const authRouter = require("./src/api/v1/routes/auth.router");
const postRouter = require("./src/api/v1/routes/post.router");
const connectionRouter = require("./src/api/v1/routes/connection.router");
const chatRouter = require("./src/api/v1/routes/chat.router");
const jobRouter = require("./src/api/v1/routes/job.router");

const app = express();

// for heroku
// app.enable("trust proxy");

// hide the powered that express is using
app.disable("x-powered-by");
// Implement cors
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// Handle preflight requests (Options request) from the browser
app.options("*", cors({ origin: process.env.CLIENT_URL, credentials: true }));
// Set security HTTP headers
app.use(helmet());
// Development logging
// if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
// }

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(
  session({
    genid: () => uuid(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   secure: process.env.NODE_ENV === "production",
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    //   sameSite: "none",
    // },
    name: "session",
  }),
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS (Cross Site Scripting)
app.use(xss());
app.use(compression());

app.use("/server-status", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use("/assets", express.static(path.join(__dirname, "/assets")));

// outsource routes
app.use("/api/v1/companies", companiesRouter);
app.use("/api/v1/universities", universitiesRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/connections", connectionRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/jobs", jobRouter);

app.all("*", (req, res, next) => {
  // if next receive an argument, no matter what is it, it will assume that whatever we into next is gonna be error
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
