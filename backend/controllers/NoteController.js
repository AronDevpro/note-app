import {noteModel} from "../models/note.model.js";

// function to get all the notes by user
export const getAllNotes = async (req, res) => {
    try {
        const allData = await noteModel.find({
            userId: req.params.id
        });
        // Check if the task exists
        if (!allData || allData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Note found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "All data",
            data: allData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//function to save note
export const saveNote = async (req,res) => {
    try {
        const note = new noteModel(req.body);
        await note.save();
        return res.status(200).json({
            success: true,
            message: "Note saved!",
        })

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//function to update note
export const updateNote = async (req,res) => {

    try {
        // Check if the task exists
        const note = await noteModel.findById({_id:req.params.id});

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        // Update task fields based on request body
        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;

        await note.save();
        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
        });
    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//function to delete note
export const deleteNote = async (req,res) => {
    try {
        // Check if the task exists
        const noteFind = await noteModel.find({_id:req.params.id});

        if (!noteFind || noteFind.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Note found"
            });
        }

        await noteFind[0].deleteOne();

        return res.status(200).json({
            success: true,
            message: "Note deleted.",
        })

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
