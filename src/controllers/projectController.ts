import type { Request, Response } from "express";
import ProjectService from "../services/projectService";
import type { TaskBody, TaskUpdatable } from "../interfaces/Task";
import TaskService from "../services/taskService";
import type { ProjectBody, ProjectUpdatable } from "../interfaces/ProjectBody";
import { projectCreateValidation } from "../validations/project.validation";


const ProjectController = {
    create: async (req: Request, res: Response) => {
        try {
            const { name, description, dueDate, status }: ProjectBody = req.body;
            const { error } = projectCreateValidation.validate({
                name,
                description,
                status,
                dueDate,
            });
            if (error) {
                return res.status(422).json({ error: error.details[0].message });
            }
            await ProjectService.create(
                name,
                dueDate,
                req.user?.id as string,
                status,
                description
            );
            return res
                .status(201)
                .json({ success: "Project creation successful" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error creating project" });
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id as string;
            const { projectID } = req.params;
            const project = await ProjectService.find(projectID, userId);
            if (!project) {
                return res.status(404).json({ error: "Project not found" })
            }
            return res.status(200).json({ success: "Project found", project })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error fetching user details" });
        }


    },

    findByUser: async (req: Request, res: Response) => {
        const userID = req.user?.id as string;
        const userProjects = await ProjectService.findByUser(userID);

        if (!userProjects || userProjects.length == 0) {
            return res.status(404).json({ error: "No projects found!" })
        }
        return res.status(200).json({ success: "Projects found", projects: userProjects });

    },

    update: async (req: Request, res: Response) => {
        try {
            const { projectID } = req.params;
            const { name, description, dueDate, status }: ProjectUpdatable = req.body;
            const updateData: Partial<ProjectUpdatable> = {};

            // !TODO => VALIDATION WITH JOI?
            if (name) updateData.name = name;
            if (description) updateData.description = description;
            if (dueDate) updateData.dueDate = dueDate;
            if (status) updateData.status = status;

            const updatedProject = await ProjectService.update(projectID, updateData);
            return res
                .status(200)
                .json({
                    success: "Project updated successcfully",
                    project: updatedProject,
                });
        } catch (error) {
            if ((error as Error).name === "PrismaClientValidationError") {
                return res.status(422).json({ error: "Error validating project update body" })
            }
            console.error(error);
            return res.status(500).json({ error: "Error updating project" });
        }
    },

    delete: async (req: Request, res: Response) => {
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

    addTask: async (req: Request, res: Response) => {
        const { projectID } = req.params;
        const userId = req.user?.id as string;
        const { name, description, status } = req.body;
        try {
            if (!name || !description || !status) {
                return res.status(422).json({ error: "Username, description and status are required" });
            }
            const task: Partial<TaskBody> = { name, description, userId, projectId: projectID };
            const acceptedStatus = ['pending', 'completed', 'ongoing'];
            const validStatus = !!acceptedStatus.find((accepted) => accepted === status as string);
            if (!validStatus) {
                return res.status(422).json({ error: "Invalid task status!" });
            }
            task.status = status;
            const newTask = await TaskService.create(task as TaskBody, userId);

            return res.status(201).json({ success: "Task added successfully", task: newTask });


        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error adding task!" });
        }


    },

    updateTask: async (req: Request, res: Response) => {
        try {
            const { taskID } = req.params;
            const { name, description, status } = req.body;
            const userId = req.user?.id as string;
            if (!name && !description && !status) {
                return res.status(422).json({ error: "One of username, description or status expected" });
            }
            const taskUpdateData: TaskUpdatable = {};
            if (name) taskUpdateData.name = name;
            if (description) taskUpdateData.description = description;
            if (status) taskUpdateData.status = status;

            const updatedTask = await TaskService.update(taskID, userId, taskUpdateData);
            return res.status(200).json({ error: "Task updated successfully" })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error updating task" });
        }
    },

    deleteTask: async (req: Request, res: Response) => {
        try {
            const { taskID } = req.params;
            const userId = req.user?.id as string;

            const deletedTask = await TaskService.remove(taskID, userId);
            return res.status(200).json({ success: "Task deleted successfully", task: deletedTask })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error deleting task" });
        }
    }

}

export default ProjectController;