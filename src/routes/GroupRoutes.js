const express = require("express");
const router = express.Router();

const GroupController = require("../controllers/GroupController");
const authenticateToken = require("../middlewares/errorHandler");


router.get("/", authenticateToken, GroupController.getAll);
router.get("/:id/contacto", authenticateToken, GroupController.searchContactosByGroup);
router.get("/:id", authenticateToken, GroupController.getAllById);
router.post("/", authenticateToken, GroupController.create);
router.put("/:id", authenticateToken, GroupController.update);
router.delete("/:id", authenticateToken, GroupController.remove);

module.exports = router;