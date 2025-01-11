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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
// Transporter
const transporter = (0, nodemailer_1.createTransport)({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Email Options
const emailOptions = (to, otp) => {
    return {
        from: `Note-Taking-App ${process.env.EMAIL_USER}`,
        to: to,
        subject: "OTP for Email Verification",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        dsn: {
            id: "some random message specific id",
            return: "headers",
            notify: ["failure", "delay"],
            recipient: process.env.EMAIL_USER
        }
    };
};
// Send Email
const sendEmail = (to, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail(emailOptions(to, otp));
    }
    catch (error) {
        console.error("Error in sending email", error);
    }
});
exports.sendEmail = sendEmail;
