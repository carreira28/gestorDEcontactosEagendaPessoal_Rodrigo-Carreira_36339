const express = require("express");
const router = express.Router();

const contactoController = require("../controllers/contactoController");
const upload = require("../middlewares/upload");

router.get("/", contactoController.getAll);
router.get("/:id", contactoController.getById);
router.post("/", upload.single("foto"), contactoController.create);
router.put("/:id", contactoController.update);
router.delete("/:id", contactoController.remove);

module.exports = router;
