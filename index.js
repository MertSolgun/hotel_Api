"use strict";
/* ====================================================== */
/*                   EXPRESS - HOTEL API                  */
/* ================================================ */
const express = require("express");
const { dbConnect } = require("./src/configs/dbConnect");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

require("./src/configs/dbConnect");
dbConnect();

app.use(express.json());

/* ==================Middleware============================ */
app.use(require("./src/middlewares/queryHandler"));
app.use(require("./src/middlewares/authentication"));

/* ==================Middleware============================ */

app.all("/", (req, res) => {
  res.send({
    message: "Welcome Hotel",
    user: req.user,
  });
});
/* ==================Route============================ */

app.use(require("./src/routes"));

/* ==================Route============================ */

app.use(require("./src/middlewares/errorHandler"));

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
