import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/", {
    handler: async (
      request: FastifyRequest<{ Body: { name: string; email: string } }>,
      reply: FastifyReply
    ) => {
      const { name, email } = request.body;
      const prisma = new PrismaClient();

      const user = await prisma.user.create({
        data: { name, email },
      });
      prisma.$disconnect();

      return reply.code(201).send(user);
    },
  });

  fastify.get("/", {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const prisma = new PrismaClient();

      const allUsers = await prisma.user.findMany();
      prisma.$disconnect();

      return reply.code(201).send({ users: allUsers });
    },
  });
};
