import { Router } from "express";
import ProjectController from "../controllers/projectController";

const project = Router();

project.get('/user-projects', ProjectController.findByUser);
project.get('/:projectID', ProjectController.findById);
project.post('/create', ProjectController.create);
project.delete('/:projectID', ProjectController.delete);
project.post('/:projectID/add', ProjectController.addTask); // Add new task to project;
project.put('/:projectID', ProjectController.update)
project.put('/task/:taskID', ProjectController.updateTask);
project.delete('/task/:taskID', ProjectController.deleteTask);

//! TODO => Filter user projects by filerParams.


export default project;