const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const upload = require("../middlewares/upload");

router.post("/:id", AuthController.signup);

module.exports = router;