import type { Request } from "express";

export interface AppRequest extends Request
 {
    user?: {
        id: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }
};


