import UserService from "../services/userService";
import type { AppRequest } from "../interfaces/AppRequest";
import type { Response } from "express";
import type { UserBody } from "../interfaces/User";
import CreateToken from "../utils/createToken";
import bcrypt from "bcryptjs";
import { UserValidationSchema } from "../validations/auth.validation";

const AuthController = {

    register: async (req: AppRequest, res: Response) => {
        try {
            const { username, password }: UserBody = req.body as UserBody;
            if (!username || !password) {
                return res.status(422).json({ error: `${username ? 'username' : 'password'} required!` })
            }
            const { error } = UserValidationSchema.validate({username, password});
            if(error) {
                return res.status(422).json({ error: error.details[0].message });
            }
            const newUser = await UserService.create(username, password);
            const authToken = CreateToken({ id: newUser.id, username: newUser.username });
            res.setHeader("Authorization", `Bearer ${authToken}`);
            return res.status(201).json({ success: "User registration successful", user: newUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error creating user" })
        }
    },

    login: async (req: AppRequest, res: Response) => {
        try {
            const { username, password }: UserBody = req.body;
            const user = await UserService.findByUsername(username);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const passwordsMatch = bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            const authToken = CreateToken({ id: user.id, username: user.username });
            res.setHeader("Authorization", `Bearer ${authToken}`);
            return res.status(200).json({success: "Login successful!" })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error signing in user" });
        }
    }
}

export default AuthController;
