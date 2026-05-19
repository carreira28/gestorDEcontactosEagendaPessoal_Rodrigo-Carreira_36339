const express = require("express");
const router = express.Router();

const LembretesController = require("../controllers/LembretesController");


router.get("/", LembretesController.getAll);
router.get("/:id", LembretesController.getAllById);
router.post("/", LembretesController.create);
router.put("/:id",LembretesController.update);
router.delete("/:id", LembretesController.remove);

module.exports = router;