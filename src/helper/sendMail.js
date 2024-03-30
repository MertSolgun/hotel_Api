"use strict";
const nodemailer = require("nodemailer");

module.exports = function (to, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, //gonderici
      pass: "phhd aqwi twah rsqw",
    },
  });

  transporter.sendMail(
    {
      to: to, ///alici
      subject: subject,
      text: message,
      html: message,
    },
    (error, success) => console.log(success, error)
  );
};
