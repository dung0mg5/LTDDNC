require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter;
// if (process.env.NODE_ENV === "production") {
//   transporter = nodemailer.createTransport({
//     service: "SendGrid",
//     auth: {
//       user: process.env.SENDGRID_USERNAME,
//       pass: process.env.SENDGRID_PASSWORD,
//     },
//   });
// } else if (process.env.NODE_ENV === "development") {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
// }

module.exports = transporter;
