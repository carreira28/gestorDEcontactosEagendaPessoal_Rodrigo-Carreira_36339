const express = require("express");
const router = express.Router();

const GroupController = require("../controllers/GroupController");


router.get("/", GroupController.getAll);
router.get("/:id/contacto",GroupController.searchContactosByGroup);
router.get("/:id", GroupController.getAllById);
router.post("/", GroupController.create);
router.put("/:id", GroupController.update);
router.delete("/:id", GroupController.remove);

module.exports = router;