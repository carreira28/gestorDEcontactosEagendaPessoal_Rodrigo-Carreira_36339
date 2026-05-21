const express = require("express");
const router = express.Router();

const LembretesController = require("../controllers/LembretesController");
const authenticateToken = require("../middlewares/authenticate");


router.get("/", authenticateToken, LembretesController.getAll);
router.get("/proximos/7dias", authenticateToken, LembretesController.get7dias);
router.get("/:id", authenticateToken, LembretesController.getAllById);
router.post("/", authenticateToken, LembretesController.create);
router.put("/:id", authenticateToken, LembretesController.update);
router.delete("/:id", authenticateToken, LembretesController.remove);


module.exports = router;