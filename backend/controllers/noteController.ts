import { Response, Request } from "express";
import asyncHandler from "../lib/asyncHandler";

// Models
import User from "../models/User";
import Note, { NoteDocument } from "../models/Note";

/** @description Create a Note */
export const createNote = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {_id: userId} = req.body.user.user;
    const {title, content} = req.body;

    console.log(req.body.user);

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

/** @description Get all notes for a User */
export const getNotes = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {_id: userId} = req.body.user.user;

    // Check if the user exists
    const user = await User.findOne({_id: userId}).populate("notes");
    if (!user) {
        throw {message: "User not found", statusCode: 404};
    }

    res.status(200).json({success: true, notes: user.notes});
})

/** @description Get a Note */
export const getNote = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {_id: userId} = req.body.user.user;
    const {noteId} = req.params;

    // Check if the user exists
    const user = await User.findOne({_id: userId}).populate("notes");
    if (!user) {
        throw {message: "User not found", statusCode: 404};
    }

    // Check if the note exists
    const note = user.notes.find((note: any) => note._id == noteId);
    if (!note) {
        throw {message: "Note not found", statusCode: 404};
    }

    res.status(200).json({success: true, note});
})

/** @description Update a Note */
export const updateNote = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {_id: userId} = req.body.user.user;
    const {noteId} = req.params;
    const {title, content} = req.body;

    // Check if the user exists
    const user = await User.findOne({_id: userId}).populate("notes");
    if (!user) {
        throw {message: "User not found", statusCode: 404};
    }

    // Check if the note exists
    const note = await Note.findOne({_id: noteId});
    if (!note) {
        throw {message: "Note not found", statusCode: 404};
    }

    // Update the note
    note.title = title;
    note.content = content;
    await note.save();

    res.status(200).json({success: true, message: "Note updated successfully", note});
})

/** @description Delete a Note */
export const deleteNote = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {_id: userId} = req.body.user.user;
    const {noteId} = req.params;

    // Check if the user exists
    const user = await User.findOne({_id: userId}).populate("notes");
    if (!user) {
        throw {message: "User not found", statusCode: 404};
    }

    // Check if the note exists
    const note = await Note.findOne({_id: noteId});
    if (!note) {
        throw {message: "Note not found", statusCode: 404};
    }

    // Remove the note from the user's notes
    user.notes = user.notes.filter((note: any) => note._id != noteId);
    await user.save();

    // Delete the note
    await note.deleteOne();

    res.status(200).json({success: true, message: "Note deleted successfully"});
})