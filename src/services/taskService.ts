import { PrismaClient, type Task } from "@prisma/client";
import type { TaskBody } from "../interfaces/Task";

const prisma = new PrismaClient();

const TaskService = {
    create: async (task: TaskBody): Promise<Task> => {
        return prisma.task.create({ data: task });
    },

    findByUser: async (userId: string) => {
        return prisma.task.findMany({ where: { userId }})
    },

    edit: async(task: TaskBody) => {},

    remove: async(taskId: string) => {
        return prisma.task.delete({ where: { id: taskId }});
    }
}