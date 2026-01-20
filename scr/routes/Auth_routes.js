const express = require("express");
const router = express.Router();
const controller = require("../controllers/Auth_controller");

router.post("/login", controller.login);

module.exports = router;
