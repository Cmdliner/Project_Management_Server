import express, { type Request, type Response } from "express";
import cors from "cors";
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/healthz', (req: Request, res: Response) => {res.status(200).json("Server is up and running")});


const PORT = process.env.PORT || 4000
app.listen(PORT)