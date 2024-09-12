const EmailToken = require("../models/emailToken.model");
const EmailTransporter = require("../../../../config/mail");
const { generateOTP } = require("../utils/helper");
const { EmailTemplate } = require("../utils/templates");

module.exports = class {
  static async sendVerificationEmail({ user, type }) {
    const verificationCode = generateOTP(6);
    const verificationLink = `${process.env.CLIENT_URL}/auth/verify?token=${verificationCode}&email=${user.email}`;
    console.log("OTP", verificationCode);

    const info = await EmailTransporter.sendMail({
      from: `"SocialJob" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject:
        type === "signup" ? "Verify your email address" : "Reset your password",
      html: EmailTemplate({
        name: `${user.firstName} ${user.lastName}`,
        title:
          type !== "signup" ? "Reset password" : '"Thank you for signing up"',
        verificationCode,
        verificationLink,
      }),
    });
    const newEmailToken = new EmailToken({
      email: user.email,
      token: verificationCode,
      messageId: info.messageId,
      for: type,
    });

    await newEmailToken.save();
  }

  static async verifyEmailToken({ token, email }) {
    const emailToken = await EmailToken.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (!emailToken) return false;

    const result = await emailToken.compareToken(token);
    if (!result) return false;

    return true;
  }
};
