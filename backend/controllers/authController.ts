import asyncHandler from "../lib/asyncHandler"; // Async Handler (wrapper for async functions)
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { generate } from "otp-generator";
import { sendEmail } from "../lib/emailConfig";

// Model
import User from "../models/User";
import Otp from "../models/Otp";

/** @description Verifying User */
export const verifyUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;

    // Check if user exists
    const user = await User.findOne({email});

    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }


    res.status(200).json({success:true, message: "User found"});
})

/** @description Send OTP */
export const sendOtp = asyncHandler(async (req: Request, res:Response): Promise<void> => {
    const {email} = req.body;

    // Check if OTP already exists
    const storedOtp = await Otp.findOne({email});
    if (storedOtp) {
        await storedOtp.deleteOne();
    }

    // Generate OTP
    const otp = generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});

    // Store OTP in database
    await Otp.create({email, otp});

    // Send OTP to user's email
    try {
        await sendEmail(email, otp);

    }
    catch (error) {
        throw {message: "Error sending OTP", statusCode: 500, details: error};
    }

    res.status(200).json({success: true, message: "OTP sent successfully"});
})

/** @description Verify OTP */
export const verifyOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {email, otp} = req.body;

    // Check if OTP exists
    const storedOtp = await Otp.findOne({email});

    if (!storedOtp) {
        throw {message: "OTP expired", statusCode: 404};
    }

    if (storedOtp?.otp !== otp) {
        throw {message: "Invalid OTP", statusCode: 400};
    }

    // Delete OTP from database
    await storedOtp?.deleteOne();

    res.status(200).json({success: true, message: "OTP verified successfully"});
})

/** @description SignUp User */
export const signUp = async (req:Request, res:Response): Promise<void> => {
    const {name, dob, email} = req.body;

    // Create user
    const user = await User.create({name, dob, email});

    res.status(201).json({success: true, message: "User created successfully", data: user});
}

/** @description Login User */
export const login = asyncHandler(async (req:Request, res:Response): Promise<void> => {
    const {email} = req.body;

    // Check if user exists
    const user = await User.findOne({email});

    if (!user) {
        throw {message: "User not found", statusCode: 404};
    }

    // Generate JWT
    const token = sign({user}, process.env.JWT_SECRET as string, {expiresIn: "12h"});

    res.status(200).json({success: true, message: "User logged in successfully", token});
})

