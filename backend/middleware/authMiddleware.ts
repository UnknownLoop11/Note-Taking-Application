import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "Unauthorized. Access token is required."});
        return;
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }

}