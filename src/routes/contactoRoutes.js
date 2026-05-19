const express = require("express");
const router = express.Router();

const contactoController = require("../controllers/contactoController");
const upload = require("../middlewares/upload");

router.get("/", contactoController.getAll);
router.get("/:id/lembrete", contactoController.searchLembresteBYContacto);
router.get("/:id", contactoController.getById);
router.post("/", upload.single("foto"), contactoController.create);
router.put("/:id", upload.single("foto"), contactoController.update);
router.delete("/:id", contactoController.remove);


module.exports = router;
