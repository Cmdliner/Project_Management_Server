import { Router } from "express";
import ProjectController from "../controllers/projectController";

const project = Router();

project.get('/user-projects', ProjectController.findByUser as any);
project.get('/:projectID', ProjectController.findById as any);
project.post('/create', ProjectController.create as any);
project.delete('/:projectID', ProjectController.delete as any);
project.post('/:projectID/add', ProjectController.addTask as any); // Add new task to project;
project.put('/:projectID', ProjectController.update as any)
project.put('/task/:taskID', ProjectController.updateTask as any);
project.delete('/task/:taskID', ProjectController.deleteTask as any);

//! TODO => Filter user projects by filerParams.


export default project;