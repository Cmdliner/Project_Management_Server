import { type Project, Prisma, PrismaClient } from "@prisma/client";
import type { ProjectFilterParams } from "../interfaces/FilterProject";
import project from "../routes/project";

const prisma = new PrismaClient();


const ProjectService = {

    create: async (name: string, dueDate: Date, userId: string, description: string): Promise<Project> => {
        try {
            return prisma.project.create({
                data: { name, dueDate, userId, description }
            })
        } catch (error) {
            throw error;
        }
    },

    find: async (id: string) => {
        return prisma.project.findUniqueOrThrow({ where: { id } });
    },

    findAll: async () => {
        return prisma.project.findMany();
    },

    findByUser(userId: string) {
        try {
            return prisma.project.findMany({ where: { userId }, include: { tasks: true } });
        } catch (error) {
            throw error;
        }

    },

    filter: async (filterParams: ProjectFilterParams) => {
        const { userId, name, taskCount, createdAtStart, createdAtEnd } = filterParams;
        const where: Prisma.ProjectWhereInput = {
            userId,
            name: name ? { contains: name } : undefined,
            createdAt: {
                gte: createdAtStart,
                lte: createdAtEnd,
            }
        };
        let projects = await prisma.project.findMany({ where, include: { tasks: true } });

        // If taskCount is provided, filter the projects after fetching
        if (taskCount !== undefined) {
            projects = projects.filter(project => project.tasks.length >= taskCount);
        }

        return projects;
    },

    remove: async (userId: string, projectId: string) => {
        try {
            return prisma.project.delete({ where: { id: projectId, userId } });
        } catch (error) {
            throw error;
        }


    }

}

export default ProjectService;



