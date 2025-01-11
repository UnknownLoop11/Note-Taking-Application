import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import asyncHandler from "../lib/asyncHandler";

export const authMiddleware =asyncHandler( async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw {message: "Unauthorized. Access token is required.", statusCode: 401};
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        res.status(401);
        throw {message: "Unauthorized. Access token is expired or invalid.", statusCode: 401};
    }

})