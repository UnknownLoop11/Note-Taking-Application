import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    statusCode?: number;
    details?: string;
}

// Error Handler Middleware
export const errorHandler = (
    err: CustomError, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500; // Use provided status code or default to 500
    const errorMessage = err.message || "Internal Server Error";
    const errorDetails = err.details || null; // Optional additional error details

    console.error(`[Error] ${statusCode} - ${errorMessage}`);
    if (errorDetails) console.error(`Details: ${errorDetails}`);

    res.status(statusCode).json({
        errorCode: statusCode,
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorDetails : undefined,
    });
};
