import { type Project, Prisma, PrismaClient } from "@prisma/client";
import type { ProjectFilterParams } from "../interfaces/FilterProject";
import type { ProjectUpdatable } from "../interfaces/ProjectBody";

const prisma = new PrismaClient();


const ProjectService = {

    create: async (name: string, dueDate: Date, userId: string, status: string, description: string): Promise<Project> => {
        return prisma.project.create({ data: { name, dueDate, userId, status, description } });
    },

    find: async (id: string, userId: string) => {
        return prisma.project.findFirst({ where: { id, userId }, include: { tasks: true } });
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

    update: async (projectId: string, { name, description, dueDate }: ProjectUpdatable) => {
        const updateData: ProjectUpdatable = {};
        if (name) { updateData.name = name }
        if (description) { updateData.description = description }
        if (dueDate) { updateData.dueDate = dueDate }

        return prisma.project.update({
            where: { id: projectId },
            data: updateData
        });
    },

    remove: async (userId: string, projectId: string) => {
        return prisma.project.delete({ where: { id: projectId, userId } });
    }

}
export default ProjectService;