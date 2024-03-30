"use strict";
/* ====================================================== */
/*         EXPRESS - HOTEL API DB CONNECTION  */
/* ================================================ */

const mongoose = require("mongoose");

const dbConnect = function () {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Db connected"))
    .catch(() => console.log("Db not connected"));
};

module.exports = {
  mongoose,
  dbConnect,
};
