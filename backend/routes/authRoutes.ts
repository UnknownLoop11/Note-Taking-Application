import express from "express";

// Controller
import { signUp, login, verifyOtp, verifyUser,sendOtp } from "../controllers/authController";

// Router
const router = express.Router();

// Routes
router.get("/", (req, res) => {
    res.send("Hello World");
})
router.post("/verify", verifyUser); // Verify User
router.post("/signup", signUp); // User SignUp
router.post("/login", login); // User Login
router.post("/send-otp", sendOtp); // Send OTP
router.post("/verify-otp", verifyOtp); // OTP Verification

export default router;