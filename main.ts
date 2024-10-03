import Fastify, { FastifyInstance, FastifyReply } from "fastify";

import { envToLogger } from "./utils";
import { userRoutes } from "./routes/userRoute";

const environment = "development";

const fastify = Fastify({
  // logger: envToLogger[environment] ?? true,
  logger: true,
});

fastify.addHook("onRequest", async () => {
  fastify.log.info("Got a request");
});

fastify.addHook("onResponse", async (request, reply: FastifyReply) => {
  fastify.log.info(`Responding`);
});

fastify.get("/", async () => {
  return {
    message: "Hello Fastify!",
  };
});

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
