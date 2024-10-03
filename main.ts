import Fastify, { FastifyInstance, FastifyReply } from "fastify";

import { envToLogger } from "./utils";
import { userRoutes } from "./routes/userRoute";

const environment = "development";

import fastifyMongo from "@fastify/mongodb";

const fastify = Fastify({
  // logger: envToLogger[environment] ?? true,
  logger: true,
});

fastify.addHook("onRequest", async () => {
  fastify.log.info("Got a request");
});

fastify.addHook("onResponse", async (request, reply: FastifyReply) => {
  fastify.log.info(`Responding ${reply.getResponseTime()}`);
});

fastify.get("/", async () => {
  return {
    message: "Hello Fastify!",
  };
});

async function dbConnector(fastify: FastifyInstance, options) {
  fastify.register(fastifyMongo, {
    url: "mongodb://localhost:27017/fastify",
  });

  fastify.log.info("Connected to database", options);
}

fastify.register(userRoutes, {
  prefix: "/api/users",
});

async function main() {
  await fastify.listen({
    port: 9000,
    host: "0.0.0.0",
  });
}

main();
