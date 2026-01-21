const express = require("express");
const router = express.Router();
const controller = require("../controllers/Destination_controller.js");
const upload = require("../middlewares/uploadMiddleware");


// Upload ảnh đại diện cho địa điểm du lịch
router.post("/:id/upload-image", upload.single('image'), controller.uploadImage);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
