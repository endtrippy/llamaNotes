const express = require("express");
const noteController = require("../controllers/noteController");
const router = express.Router();

router.get("/notes", noteController.getNotes);
router.post("/notes", noteController.createNote);
router.get("/llamaNote", noteController.generateLlamaNote);

module.exports = router;
