import mongoose, { Schema, Document  } from "mongoose";

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

export interface NoteDocument extends Document {
    title: string;
    content: string;
}

const Note = mongoose.model<NoteDocument>('Note', NoteSchema);

export default Note;
