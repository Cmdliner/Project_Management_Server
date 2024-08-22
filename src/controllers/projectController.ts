import type { Response } from "express";
import type { AppRequest } from "../interfaces/AppRequest";
import ProjectService from "../services/projectService";
import type { TaskBody } from "../interfaces/Task";
import TaskService from "../services/taskService";

const ProjectController = {
    create: async (req: AppRequest, res: Response) => {
        try {
            const { name, description, dueDate } = req.body;
            await ProjectService.create(name, dueDate, req.user?.id as string, description);
            return res.status(201).json({ success: "User creation successful" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error creating project" });
        }
    },

    findByUser: async (req: AppRequest, res: Response) => {
        const userID = req.user?.id as string;
        const userProjects = await ProjectService.findByUser(userID);

        if (!userProjects || userProjects.length == 0) {
            return res.status(404).json({ error: "No projects found!" })
        }
        return res.status(200).json({ success: "Projects found", projects: userProjects });

    },

    // !TODO => Update projects
    update: async (req: AppRequest, res: Response) => {

    },

    delete: async (req: AppRequest, res: Response) => {
        try {
            const userID = req.user?.id as string;
            const { projectID } = req.params;
            const project = await ProjectService.remove(userID, projectID);
            return res.status(200).json({ success: "Project deleted successfully", deleted: project })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error deleting project!" });
        }

    },

    addTask: async (req: AppRequest, res: Response) => {
        const { projectID } = req.params;
        const userId = req.user?.id as string;
        const { name, description, status } = req.body;
        try {
            if (!name || !description || !status) {
                return res.status(422).json({ error: "Username, description and status are required" });
            }
            const task: Partial<TaskBody> = {name, description, userId, projectId: projectID};
            const acceptedStatus = ['pending', 'completed', 'ongoing'];
            const validStatus = !!acceptedStatus.find((accepted) => accepted === status as string);
            if(!validStatus) {
                return res.status(422).json({ error: "Invalid task status!"});
            }
            task.status = status;
            const newTask  = await TaskService.create(task as TaskBody);

            return res.status(201).json({success: "Task added successfully", task: newTask});
            
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error adding task!" });
        }


    },

    updateTask: (req: AppRequest, res: Response) => { },

    deleteTask: (req: AppRequest, res: Response) => { }



}

export default ProjectController;