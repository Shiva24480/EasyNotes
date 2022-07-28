const asyncHandler = require('express-async-handler');
const { model } = require('mongoose');
const Note = require('../models/noteModel');

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
        res.status(401)
        throw new Error('please fill all the Fields')
    } else {
        const note = new Note({
            user: req.user._id,
            title,
            content,
            category
        })
        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }
});

const getNotesById = asyncHandler(async (req, res) => {
    const notes = await Note.findById(req.params.id);
    if (notes) {
        res.json(notes);
    } else {
        res.status(404).json({ message: "not found" });
    }
});

const updateNoteById = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error("Note not found");
    }

});
 
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if(note){
        await note.remove();
        res.json({message: 'note removed'});
    }else{
        res.status(404);
        throw new Error("Note not found");
    }
});

module.exports = { getNotes, createNotes, getNotesById, updateNoteById, deleteNote }