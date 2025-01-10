import { Router } from "express";

// Controllers
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/userController";

// Middleware
import { authMiddleware } from "../middleware/authMiddleware";


// Routes
const userRoutes = Router();
userRoutes.use(authMiddleware);

userRoutes.get("/", getUsers);
userRoutes.route("/me")
.get(getUser)
.put(updateUser)
.delete(deleteUser);

export default userRoutes;