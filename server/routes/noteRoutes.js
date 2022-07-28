const express = require('express');
const { getNotes, createNotes, getNotesById, updateNoteById, deleteNote } = require('../controllers/noteControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect,getNotes);
router.route('/create').post(protect, createNotes);
router.route('/:id').get(getNotesById).put(protect,updateNoteById).delete(protect,deleteNote);

module.exports = router; 