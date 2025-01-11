import { Router } from "express";

// Controllers
import { createNote } from "../controllers/noteController";

// Middleware
import { authMiddleware } from "../middleware/authMiddleware";

// Routes
const noteRoutes = Router();

noteRoutes.use(authMiddleware);
noteRoutes.route("/").post(createNote); // POST /api/notes

export default noteRoutes;