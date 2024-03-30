const router = require("express").Router();
const reservation = require("../controllers/reservation");

const permission = require("../middlewares/permission");

router
  .route("/")
  .get(permission.isLogin, reservation.list)
  .post(permission.isLogin, reservation.create);

router
  .route("/:id")
  .get(permission.isLogin, reservation.read)
  .put(permission.isAdmin, reservation.update)
  .patch(permission.isAdmin, reservation.update)
  .delete(permission.isAdmin, reservation.delete);

module.exports = router;
