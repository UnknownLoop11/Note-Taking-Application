import { createTransport } from "nodemailer";

// Transporter
const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

})

// Email Options
const emailOptions = (to: string, otp: string) => {
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
    }
}

// Send Email
const sendEmail = async (to: string, otp: string) => {
    try {
        await transporter.sendMail(emailOptions(to, otp));

    } catch (error) {
        console.error("Error in sending email", error);
        
    }
}

export { sendEmail };

