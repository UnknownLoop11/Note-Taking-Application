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
exports.login = exports.signUp = exports.verifyOtp = exports.sendOtp = exports.verifyUser = void 0;
const asyncHandler_1 = __importDefault(require("../lib/asyncHandler")); // Async Handler (wrapper for async functions)
const jsonwebtoken_1 = require("jsonwebtoken");
const otp_generator_1 = require("otp-generator");
const emailConfig_1 = require("../lib/emailConfig");
// Model
const User_1 = __importDefault(require("../models/User"));
const Otp_1 = __importDefault(require("../models/Otp"));
/** @description Verifying User */
exports.verifyUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // Check if user exists
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }
    res.status(200).json({ success: true, message: "User found" });
}));
/** @description Send OTP */
exports.sendOtp = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // Check if OTP already exists
    const storedOtp = yield Otp_1.default.findOne({ email });
    if (storedOtp) {
        yield storedOtp.deleteOne();
    }
    // Generate OTP
    const otp = (0, otp_generator_1.generate)(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    // Store OTP in database
    yield Otp_1.default.create({ email, otp });
    // Send OTP to user's email
    try {
        yield (0, emailConfig_1.sendEmail)(email, otp);
    }
    catch (error) {
        throw { message: "Error sending OTP", statusCode: 500, details: error };
    }
    res.status(200).json({ success: true, message: "OTP sent successfully" });
}));
/** @description Verify OTP */
exports.verifyOtp = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    // Check if OTP exists
    const storedOtp = yield Otp_1.default.findOne({ email });
    if (!storedOtp) {
        throw { message: "OTP expired", statusCode: 404 };
    }
    if ((storedOtp === null || storedOtp === void 0 ? void 0 : storedOtp.otp) !== otp) {
        throw { message: "Invalid OTP", statusCode: 400 };
    }
    // Delete OTP from database
    yield (storedOtp === null || storedOtp === void 0 ? void 0 : storedOtp.deleteOne());
    res.status(200).json({ success: true, message: "OTP verified successfully" });
}));
/** @description SignUp User */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dob, email } = req.body;
    // Create user
    const user = yield User_1.default.create({ name, dob, email });
    res.status(201).json({ success: true, message: "User created successfully", data: user });
});
exports.signUp = signUp;
/** @description Login User */
exports.login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // Check if user exists
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }
    // Generate JWT
    const token = (0, jsonwebtoken_1.sign)({ user }, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.status(200).json({ success: true, message: "User logged in successfully", token });
}));
