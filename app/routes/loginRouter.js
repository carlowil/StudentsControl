const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.route("/register").post(loginController.register);
router.route("/login").post(loginController.login);

module.exports = router;