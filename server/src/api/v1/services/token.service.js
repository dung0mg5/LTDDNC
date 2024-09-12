const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");

module.exports = class {
  static async checkTokenExist({ refreshToken }) {
    const existingToken = await Token.findOne({
      refreshToken: { $eq: refreshToken },
    });

    if (!existingToken) return null;

    return existingToken;
  }

  static async createToken({ existingUser }) {
    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    });

    const newRefreshToken = new Token({
      user: existingUser._id,
      refreshToken,
      accessToken,
    });
    await newRefreshToken.save();

    return { accessToken, refreshToken };
  }

  static async checkRefreshTokenExpired({ existingToken }) {
    const refreshTokenExpiresAt =
      jwt.decode(existingToken.refreshToken).exp * 1000;
    if (Date.now() >= refreshTokenExpiresAt) {
      await existingToken.deleteOne();
      return false;
    }

    return true;
  }

  static async createAccessToken({ existingUser }) {
    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return accessToken;
  }
};
