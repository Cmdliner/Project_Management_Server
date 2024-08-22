import { PrismaClient, type Task } from "@prisma/client";
import type { TaskBody } from "../interfaces/Task";
import ProjectService from "./projectService";
import UserService from "./userService";

const prisma = new PrismaClient();

const TaskService = {
    create: async (task: TaskBody): Promise<Task> => {
        try {
            await ProjectService.find(task.projectId);
            await UserService.findById(task.userId);
            return prisma.task.create({ data: task });
        } catch (error) {
            throw error;
        }
    },

    findByUser: async (userId: string) => {
        return prisma.task.findMany({ where: { userId }})
    },

    edit: async(task: TaskBody) => {},

    remove: async(taskId: string) => {
        return prisma.task.delete({ where: { id: taskId }});
    }
}


export default TaskService;