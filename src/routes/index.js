const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/reservation", require("./reservation"));
router.use("/room", require("./room"));
router.use("/token", require("./token"));
router.use("/auth", require("./auth"));
router.use("/document", require("./document"));

module.exports = router;
