import { Request, Response, NextFunction } from "express";

// Error Handler Middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        errorCode: 500,
        error: "Internal Server Error",
    });
}
