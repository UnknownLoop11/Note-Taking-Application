"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const noteController_1 = require("../controllers/noteController");
// Middleware
const authMiddleware_1 = require("../middleware/authMiddleware");
// Routes
const noteRoutes = (0, express_1.Router)();
noteRoutes.use(authMiddleware_1.authMiddleware);
noteRoutes.route("/").post(noteController_1.createNote) // POST /api/notes
    .get(noteController_1.getNotes); // GET /api/notes
noteRoutes.route("/:noteId").get(noteController_1.getNote) // GET /api/notes/:id
    .put(noteController_1.updateNote) // PUT /api/notes/:id
    .delete(noteController_1.deleteNote); // DELETE /api/notes/:id
exports.default = noteRoutes;
