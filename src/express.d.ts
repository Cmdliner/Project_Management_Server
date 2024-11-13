import express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            }
        }

    }
}