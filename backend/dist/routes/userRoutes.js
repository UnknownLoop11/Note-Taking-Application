"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const userController_1 = require("../controllers/userController");
// Middleware
const authMiddleware_1 = require("../middleware/authMiddleware");
// Routes
const userRoutes = (0, express_1.Router)();
userRoutes.use(authMiddleware_1.authMiddleware);
userRoutes.get("/", userController_1.getUsers);
userRoutes.route("/me")
    .get(userController_1.getUser)
    .put(userController_1.updateUser)
    .delete(userController_1.deleteUser);
exports.default = userRoutes;
