import { PrismaClient, type Task } from "@prisma/client";
import type { TaskBody, TaskUpdatable } from "../interfaces/Task";
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
        return prisma.task.findMany({ where: { userId } })
    },

    update: async (taskId: string, userId: string, { name, description, status }: TaskUpdatable) => {
        try {
            const validStatus = ["pending", "completed", "ongoing"];
            const updateData: TaskUpdatable = {};
            const isTaskCreator = await prisma.task.findUnique({ where: { id: taskId, userId: userId } });
            if (!isTaskCreator) {
                throw new Error("Unauthorized! cannot update task");
            }
            if (name) updateData.name = name;
            if (description) updateData.description = description;
            if (status) {
                const canUpdateStatus = validStatus.indexOf(status) > -1;
                if (canUpdateStatus) updateData.status = status;
            }
            return prisma.task.update({ where: { id: taskId }, data: updateData });
        } catch (error) {
            throw error;
        }
    },

    remove: async (taskId: string, userId: string) => {
        return prisma.task.delete({ where: { id: taskId, userId: userId } });
    }
}


export default TaskService; 