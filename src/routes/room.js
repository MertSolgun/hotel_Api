const router = require("express").Router();
const room = require("../controllers/room");
const { isAdmin } = require("../middlewares/permission");

const upload = require("../middlewares/upload");

router
  .route("/")
  .get(room.list)
  .post(isAdmin, upload.array("image"), room.create);

router
  .route("/:id")
  .get(room.read)
  .put(isAdmin, upload.array("image"), room.update)
  .patch(isAdmin, upload.array("image"), room.update)
  .delete(isAdmin, room.delete);

module.exports = router;
