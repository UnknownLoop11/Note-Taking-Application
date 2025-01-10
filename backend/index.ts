import express, { Express, Request, Response } from "express";
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

// Routes
import authRoutes from "./routes/authRoutes";
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});
app.use("/api/auth", authRoutes);




// Error Handler Middleware
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

