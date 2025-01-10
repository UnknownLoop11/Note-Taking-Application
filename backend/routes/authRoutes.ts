import express from "express";

// Controller
import { sendOTP } from "../controllers/authController";

const router = express.Router();

// Routes
router.post("/send-otp", sendOTP);
router.get("/", (req, res) => {
    res.send("Hello World");
})

export default router;