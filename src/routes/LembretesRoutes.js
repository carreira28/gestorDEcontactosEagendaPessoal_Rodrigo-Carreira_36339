const express = require("express");
const router = express.Router();

const LembretesController = require("../controllers/LembretesController");
const authenticateToken = require("../middlewares/errorHandler");


router.get("/", authenticateToken, LembretesController.getAll);
router.get("/:id", authenticateToken, LembretesController.getAllById);
router.post("/", authenticateToken, LembretesController.create);
router.put("/:id", authenticateToken, LembretesController.update);
router.delete("/:id", authenticateToken, LembretesController.remove);

module.exports = router;