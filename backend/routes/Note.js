import express from 'express';
import {getAllNotes, saveNote, updateNote, deleteNote} from "../controllers/NoteController.js";
import {authenticationToken} from "../utils/authMiddleware.js";

//creating a router
const router = express.Router();

//api to get all the data
router.get('/:id', authenticationToken, getAllNotes);

//api to save task
router.post('/',authenticationToken, saveNote)

//api to update task
router.put('/:id', authenticationToken, updateNote)

//api to delete task
router.delete('/:id', authenticationToken, deleteNote)

export default router;