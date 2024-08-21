import type { Response } from "express";
import type { AppRequest } from "../interfaces/AppRequest";
import ProjectService from "../services/projectService";

const ProjectController = {
    create: async (req: AppRequest, res: Response) => {
        try {
            const {name, description, dueDate} = req.body as any;
            await ProjectService.create(name, dueDate, req.user?.id as any, description);
            return res.status(201).json({ success: "User creation successful" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error creating project" });
        }
    },

    findByUser: async (req: AppRequest, res: Response) => {
        const userID = req.user?.id as any as string;
        const userProjects = await ProjectService.findByUser(userID);

        if(!userProjects || userProjects.length == 0) {
            return res.status(404).json({ error: "No projects found!"})
        }
        return res.status(200).json({ success: "Projects found", projects: userProjects });

    },

    // !TODO => Update and delete projects
    delete: async (req: AppRequest, res: Response) => {}


    
}

export default ProjectController;