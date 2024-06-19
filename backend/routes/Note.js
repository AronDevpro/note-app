import express from 'express';
import {getAllNotes, saveNote, updateNote, deleteNote} from "../controllers/NoteController.js";

//creating a router
const router = express.Router();

//api to get all the data
router.get('/:id', getAllNotes);

//api to save task
router.post('/', saveNote)

//api to update task
router.put('/:id', updateNote)

//api to delete task
router.delete('/:id', deleteNote)

export default router;