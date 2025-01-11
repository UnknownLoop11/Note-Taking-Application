"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Controller
const authController_1 = require("../controllers/authController");
// Router
const router = express_1.default.Router();
// Routes
router.get("/", (req, res) => {
    res.send("Hello World");
});
router.post("/verify", authController_1.verifyUser); // Verify User
router.post("/signup", authController_1.signUp); // User SignUp
router.post("/login", authController_1.login); // User Login
router.post("/send-otp", authController_1.sendOtp); // Send OTP
router.post("/verify-otp", authController_1.verifyOtp); // OTP Verification
exports.default = router;
