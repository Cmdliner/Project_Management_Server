import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../interfaces/TokenPayload";
import UserService from "../services/userService";

const AuthMiddleware = {
    
    requireAuth: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authToken = req.headers['authorization']?.split(' ')[1];
            if (!authToken) {
                return res.status(401).json({ error: "Unauthorized!" });
            }
            const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
            const { id } = decodedToken as any as TokenPayload;
            const user = await UserService.findById(id);
            if (!user) {
                return res.status(403).json({ error: "Error occured during authenticaton" });
            }
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            if ((error as Error).message === "jwt expired") {
                return res.status(401).json({ "errMssg": "Login session expired :(" })
            }
            return res.status(403).json({
                "errMssg": "Error in decoding", "err": (error as Error).message
            })

        }
    }

}

export default AuthMiddleware;