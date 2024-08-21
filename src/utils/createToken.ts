import jwt from "jsonwebtoken";
import type { TokenPayload } from "../interfaces/TokenPayload";

function CreateToken(payload: TokenPayload) {

    // JWT expires in  48 hrs
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 48 })
}

export default CreateToken;
