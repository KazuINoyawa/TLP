const express = require("express");
const router = express.Router();
const controller = require("../controllers/Review_controller");

router.get("/:destinationId", controller.getByDestination);
router.post("/", controller.create);
router.delete("/:id", controller.remove);

module.exports = router;
