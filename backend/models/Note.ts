import { Schema, Model } from "mongoose";

const NoteSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    }}
, {timestamps: true});

export default new Model('Note', NoteSchema);
