const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const upload = require("../middlewares/upload");

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);

module.exports = router;