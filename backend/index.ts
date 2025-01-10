import express, { Express, Request, Response } from "express";
import session from "express-session";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./lib/db";

// Middleware
import { errorHandler } from "./middleware/errorHandler";

config(); // Loading environment variables from .env file
connectDB(); // Connecting to MongoDB

const app: Express = express();
app.use(morgan("dev")); // Logging middleware
app.use(express.json()); // Body parser middleware
app.use(session({
    secret: process.env.SECRET_KEY || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        secure: false,
        httpOnly: true
    }
})); // Session middleware

app.get("/", (req: Request, res: Response) => {
    throw new Error("This is an error");
    res.send("Hello World");
});

// Error Handler Middleware
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

