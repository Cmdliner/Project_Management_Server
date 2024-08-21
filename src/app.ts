import express, { type Request, type Response } from "express";
import cors from "cors";
import auth from "./routes/auth";
import AuthMiddleware from "./middlewares/auth";
import project from "./routes/project";
const app = express();

const API_VERSION = '/api/v1';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(`${API_VERSION}/auth`, auth);
app.use(`${API_VERSION}/project`, AuthMiddleware.requireAuth as any, project);

app.get('/healthz', (_: Request, res: Response) => { res.status(200).json("Server is up and running") });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server is up and listening on port ', PORT);
})
