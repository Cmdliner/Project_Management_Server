import { Router } from "express";
import AuthController from "../controllers/authController";

const auth = Router();


auth.post('/register', AuthController.register as any);
auth.post('/login',AuthController.login as any);

export default auth;