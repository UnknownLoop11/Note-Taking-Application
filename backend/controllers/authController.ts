import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { generate } from "otp-generator";
import { sendEmail } from "../lib/emailConfig";

// Model
import User from "../models/User";

/** @description Generate an otp and mail it to the user */
export const sendOTP = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    // Generate OTP
    const otp: string = generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

    // Send Mail
    try {
        await sendEmail(email, otp);
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP" });
    }

    // Saving OTP in the session
    (req.session as any)[email] = otp;

    res.status(200).json({success: true, message: "OTP sent successfully" });
}
