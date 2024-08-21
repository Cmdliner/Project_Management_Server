import { type Project, Prisma, PrismaClient } from "@prisma/client";
import type { ProjectFilterParams } from "../interfaces/FilterProject";

const prisma = new PrismaClient();


const ProjectService = {

    create: async (name: string, dueDate: Date, userId: string, description: string): Promise<Project> => {
        return prisma.project.create({
            data: { name, dueDate, userId, description }
        })
    },

    findAll: async () => {
        return prisma.project.findMany();
    },

    findByUser(userId: string) {
        return prisma.project.findMany({ where: { userId }, include: { tasks: true } });
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

    remove: async(projectId: string) => {
        return prisma.project.delete({where: { id: projectId }});
    }

}

export default ProjectService;



