"use strict";
const userModel = require("../models/usermodel");
const tokenModel = require("../models/token");
const passEncrypt = require("../helper/passEncrypt");

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    if ((username || email) && password) {
      const user = await userModel.findOne({ $or: [{ username }, { email }] });

      if (user && user.password === passEncrypt(password)) {
        if (user.isActive) {
          //login olabilir token olustur
          //token yoksa token olustur

          let tokenData = await tokenModel.findOne({ userId: user.id });

          if (!tokenData) {
            tokenData = await tokenModel.create({
              userId: user.id,
              token: passEncrypt(user.id + Date.now()),
            });
          }
          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username/email or password");
      }
    }
  },
};
