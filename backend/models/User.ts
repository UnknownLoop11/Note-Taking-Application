import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema({
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
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note',
        }
    ]
}, {timestamps: true});

export interface UserDocument extends Document {
    name: string;
    email: string;
    dob: Date;
    notes: string[];
}

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;