import { Router } from "express";

// Controllers
import { createNote, getNotes, getNote, updateNote, deleteNote } from "../controllers/noteController";

// Middleware
import { authMiddleware } from "../middleware/authMiddleware";

// Routes
const noteRoutes = Router();

noteRoutes.use(authMiddleware);
noteRoutes.route("/").post(createNote) // POST /api/notes
    .get(getNotes); // GET /api/notes
noteRoutes.route("/:noteId").get(getNote) // GET /api/notes/:id
    .put(updateNote) // PUT /api/notes/:id
    .delete(deleteNote); // DELETE /api/notes/:id

export default noteRoutes;