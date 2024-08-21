import { type User, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const UserService = {
    create: async (username: string, password: string): Promise<User> => {
        try {
            const hashedPassword = await hash(password, 10);
            return prisma.user.create({
                data: {
                    username,
                    password: hashedPassword
                }
            });
        } catch (error) {
            throw error;
        }

    },

    findByUsername: async (username: string): Promise<User> => {
        return prisma.user.findUniqueOrThrow({ where: { username } })
    },

    findById: async (id: string): Promise<User> => {
        return prisma.user.findUniqueOrThrow({ where: { id } })
    }
}

export default UserService;