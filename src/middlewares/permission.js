"use strict";

module.exports = {
  isLogin: async (req, res, next) => {
    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 401;
      throw new Error("No permission you must login");
    }
  },
  isAdmin: async (req, res, next) => {
    if (req.user && req.user.isAdmin && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 401;
      throw new Error("No permission you must login and must be admin");
    }
  },
};
