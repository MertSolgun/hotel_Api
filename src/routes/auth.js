const router = require("express").Router();
const authControlller = require("../controllers/auth");

router.route("/login").post(authControlller.login);

module.exports = router;
