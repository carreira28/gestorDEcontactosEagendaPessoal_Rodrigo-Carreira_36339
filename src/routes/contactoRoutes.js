const express = require("express");
const router = express.Router();

const contactoController = require("../controllers/contactoController");
const upload = require("../middlewares/upload");
const authenticateToken = require("../middlewares/errorHandler");

router.get("/", authenticateToken, contactoController.getAll);
router.get("/:id/lembrete", authenticateToken, contactoController.searchLembresteBYContacto);
router.get("/:id", authenticateToken, contactoController.getById);
router.post("/", authenticateToken, upload.single("foto"), contactoController.create);
router.put("/:id", authenticateToken, upload.single("foto"), contactoController.update);
router.delete("/:id", authenticateToken, contactoController.remove);


module.exports = router;
