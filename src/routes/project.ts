import { Router } from "express";
import ProjectController from "../controllers/projectController";

const project = Router();

project.get('/user-projects', ProjectController.findByUser);
project.post('/create', ProjectController.create);
project.delete('/:projectID', ProjectController.delete);
project.post('/:projectID/add', ProjectController.addTask); // Add new task to project;


export default project;