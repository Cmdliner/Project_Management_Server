import { Router } from "express";
import ProjectController from "../controllers/projectController";

const project = Router();

project.get('/user-projects', ProjectController.findByUser as any);
project.post('/create', ProjectController.create as any);


export default project;