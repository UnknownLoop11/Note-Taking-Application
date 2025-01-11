"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Use provided status code or default to 500
    const errorMessage = err.message || "Internal Server Error";
    const errorDetails = err.details || null; // Optional additional error details
    console.error(`[Error] ${statusCode} - ${errorMessage}`);
    if (errorDetails)
        console.error(`Details: ${errorDetails}`);
    res.status(statusCode).json({
        errorCode: statusCode,
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorDetails : undefined,
    });
};
exports.errorHandler = errorHandler;
