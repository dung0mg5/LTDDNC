const User = require("../models/user.model");
const Token = require("../models/token.model");
const EmailToken = require("../models/emailToken.model");

module.exports = class {
  static async createUser({ firstName, lastName, email, password }) {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const user = await newUser.save();
    if (user.isNew) return null;

    return newUser;
  }

  static async updateUser({ userId, data }) {
    const existingUser = await this.checkUserExist({ userId });
    if (!existingUser) return null;

    if (!existingUser.headline)
      existingUser.headline =
        data.experiences.length > 0
          ? `${data.experiences[0].jobTitle} at ${data.experiences[0].nameOfCompany}`
          : `Student at ${data.educations[0].nameOfSchool}`;

    existingUser.experiences = data.experiences || existingUser.experiences;
    existingUser.educations = data.educations || existingUser.educations;
    existingUser.location = data.location || existingUser.location;
    existingUser.isVerified = data.isVerified || existingUser.isVerified;
    existingUser.about = data.about || existingUser.about;
    existingUser.skills = data.skills || existingUser.skills;
    existingUser.active = data.active || existingUser.active;
    existingUser.headline = data.headline || existingUser.headline;

    await existingUser.save();
    return existingUser;
  }

  static async checkUserExist({ email, userId }) {
    let existingUser;

    if (email)
      existingUser = await User.findOne({ email: { $eq: email } })
        .populate("experiences.company")
        .populate("educations.school")
        .populate("connections");
    if (userId)
      existingUser = await User.findById(userId)
        .populate("experiences.company")
        .populate("educations.school")
        .populate("connections");

    if (!existingUser) return null;

    return existingUser;
  }

  static async checkPassword({ existingUser, password }) {
    const matched = await existingUser.comparePassword(password);
    if (!matched) return false;

    return true;
  }

  static async changePassword({ email, newPassword }) {
    const existingUser = await this.checkUserExist({ email });
    if (!existingUser) return null;

    existingUser.password = newPassword;
    await existingUser.save();
    await EmailToken.findOneAndDelete({ email });

    return existingUser;
  }

  static async logout({ accessToken }) {
    await Token.findOneAndDelete({ accessToken });
  }

  static async searchUser({ name }) {
    const users = await User.find({
      fullName: { $regex: name, $options: "i" },
    })
      .populate("experiences.company")
      .populate("educations.school")
      .populate("connections")
      .limit(10)
      .lean();

    return users;
  }
};
