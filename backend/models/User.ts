import { Schema, Model } from "mongoose";

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
    }
}, {timestamps: true});

export default new Model('User', UserSchema);