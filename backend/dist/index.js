"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./lib/db"));
// Middleware
const errorHandler_1 = require("./middleware/errorHandler");
(0, dotenv_1.config)(); // Loading environment variables from .env file
(0, db_1.default)(); // Connecting to MongoDB
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev")); // Logging middleware
app.use(express_1.default.json()); // Body parser middleware
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/notes", noteRoutes_1.default);
// Error Handler Middleware
app.use(errorHandler_1.errorHandler);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
