import { Router } from "express";
import AuthController from "../controllers/authController";

const auth = Router();


auth.post('/register', AuthController.register);
auth.post('/login',AuthController.login);

export default auth;