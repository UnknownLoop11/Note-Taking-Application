"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNote = exports.getNotes = exports.createNote = void 0;
const asyncHandler_1 = __importDefault(require("../lib/asyncHandler"));
// Models
const User_1 = __importDefault(require("../models/User"));
const Note_1 = __importDefault(require("../models/Note"));
/** @description Create a Note */
exports.createNote = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.body.user.user;
    const { title, content } = req.body;
    console.log(req.body.user);
    // Check if the user exists
    const user = yield User_1.default.findOne({ _id: userId });
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }
    // Create a new note
    const note = new Note_1.default({
        title,
        content,
    });
    // Save the note
    yield note.save();
    // Add the note to the user's notes
    user.notes.push(note === null || note === void 0 ? void 0 : note._id);
    yield user.save();
    res.status(201).json({ success: true, message: "Note created successfully", note });
}));
/** @description Get all notes for a User */
exports.getNotes = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.body.user.user;
    // Check if the user exists
    const user = yield User_1.default.findOne({ _id: userId }).populate("notes");
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }
    res.status(200).json({ success: true, notes: user.notes });
}));
/** @description Get a Note */
exports.getNote = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.body.user.user;
    const { noteId } = req.params;
    // Check if the user exists
    const user = yield User_1.default.findOne({ _id: userId }).populate("notes");
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }
    // Check if the note exists
    const note = user.notes.find((note) => note._id == noteId);
    if (!note) {
        throw { message: "Note not found", statusCode: 404 };
    }
    res.status(200).json({ success: true, note });
}));
/** @description Update a Note */
exports.updateNote = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.body.user.user;
    const { noteId } = req.params;
    const { title, content } = req.body;
    // Check if the user exists
    const user = yield User_1.default.findOne({ _id: userId }).populate("notes");
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }
    // Check if the note exists
    const note = yield Note_1.default.findOne({ _id: noteId });
    if (!note) {
        throw { message: "Note not found", statusCode: 404 };
    }
    // Update the note
    note.title = title;
    note.content = content;
    yield note.save();
    res.status(200).json({ success: true, message: "Note updated successfully", note });
}));
/** @description Delete a Note */
exports.deleteNote = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.body.user.user;
    const { noteId } = req.params;
    // Check if the user exists
    const user = yield User_1.default.findOne({ _id: userId }).populate("notes");
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }
    // Check if the note exists
    const note = yield Note_1.default.findOne({ _id: noteId });
    if (!note) {
        throw { message: "Note not found", statusCode: 404 };
    }
    // Remove the note from the user's notes
    user.notes = user.notes.filter((note) => note._id != noteId);
    yield user.save();
    // Delete the note
    yield note.deleteOne();
    res.status(200).json({ success: true, message: "Note deleted successfully" });
}));
