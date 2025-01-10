import mongoose, {Schema, Document} from "mongoose";

export interface IOtp extends Document {
    otp: string;
    email: string;
    createdAt: Date;
}

const OtpSchema: Schema = new Schema({
    otp: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: 300}
});

const Otp = mongoose.model<IOtp>("Otp", OtpSchema);

export default Otp;