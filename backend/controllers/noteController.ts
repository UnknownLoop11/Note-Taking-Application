import { Response, Request } from "express";
import asyncHandler from "../lib/asyncHandler";

// Models
import User from "../models/User";
import Note from "../models/Note";

/** @description Create a Note */
export const createNote = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {_id: userId} = req.body.user;
    const {title, content} = req.body;

    // Check if the user exists
    const user = await User.findOne({_id: userId});
    if (!user) {
        throw {message: "User not found", statusCode: 404};
    }

    // Create a new note
    const note = new Note({
        title,
        content,
    });

    // Save the note
    await note.save();

    // Add the note to the user's notes
    user.notes.push(note?._id as string);
    await user.save();

    res.status(201).json({success: true, message: "Note created successfully", note});

})