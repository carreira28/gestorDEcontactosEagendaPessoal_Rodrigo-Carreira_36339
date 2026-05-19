const express = require("express");
const router = express.Router();

const LembretesController = require("../controllers/LembretesController");


router.get("/", LembretesController.getAll);
router.post("/", LembretesController.create);

module.exports = router;