import fastifyJwt from "@fastify/jwt";
import Unauthorized from "../error/Unauthorized.js";
const jwtPlugin = async (fastify, options) => {
  fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET_KEY });

  fastify.decorate("jwtAuth", async function (request, reply) {
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw new Unauthorized("Unauthorized");
    }
    const [authType, token] = authHeader.split(" ");

    if (authType != "Bearer") {
      throw new Unauthorized("Invalid authentication type");
    }
    await request.jwtVerify();
  });
};
export default jwtPlugin;
