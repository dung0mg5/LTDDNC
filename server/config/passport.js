/* eslint-disable camelcase */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const User = require("../src/api/v1/models/user.model");
const Token = require("../src/api/v1/models/token.model");
const AppError = require("../src/api/v1/utils/appError");

const opts = {};
opts.jwtFromRequest = fromAuthHeaderAsBearerToken();
// opts.jwtFromRequest = (req) => req.cookies?.accessToken;
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ email: jwt_payload.email })
        .select("-password")
        .populate("experiences.company")
        .populate("educations.school")
        .populate("connections")
        .lean();

      if (user) {
        const refreshTokenFromDB = await Token.findOne({
          user: user._id,
        });
        if (!refreshTokenFromDB)
          return done(new AppError("Unauthorized. Please Login again", 401));

        const refreshPayload = jwt.verify(
          refreshTokenFromDB.refreshToken,
          process.env.JWT_REFRESH_SECRET,
        );

        if (refreshPayload.email !== jwt_payload.email)
          return done(
            new AppError(
              "Unauthorized. Something problem about email, please login again",
              401,
            ),
          );

        const tokenExpiration = new Date(jwt_payload.exp * 1000);
        const now = new Date();
        const timeDifference = tokenExpiration.getTime() - now.getTime();
        if (timeDifference > 0 && timeDifference < 30 * 60 * 1000) {
          const payloadNew = {
            _id: user._id,
            email: user.email,
          };
          const newToken = jwt.sign(payloadNew, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          return done(null, { authenticatedUser: { ...user }, newToken });
        }

        return done(null, { authenticatedUser: { ...user } });
      } else {
        return done(new AppError("Unauthorized. User not found", 404));
      }
    } catch (err) {
      return done(new AppError(err.message, 500));
    }
  }),
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile._json.email })
          .select("-password")
          .populate("experiences.company")
          .populate("educations.school")
          .populate("connections")
          .lean();

        if (user) {
          return done(null, { authenticatedUser: { ...user } });
        }
        const newUser = new User({
          provider: profile.provider,
          googleId: profile.id,
          email: profile._json.email,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          avatar: profile._json.picture,
        });
        await newUser.save();
        return done(null, { authenticatedUser: { ...newUser } });
      } catch (err) {
        return done(new AppError(err.message, 500));
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  // console.log("serializeUser", user);
  done(null, { ...user });
});

passport.deserializeUser((user, done) => {
  // console.log("deserializeUser", user);
  done(null, { ...user });
});
