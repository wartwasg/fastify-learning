import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
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
  fastify.decorate("hasRole", function (role) {
    return async function (request, reply) {
      const userRole = request.user.payload.role;
      if (role !== userRole) {
        throw new Unauthorized("Forbidden. Does not have correct role");
      }
    };
  });
};
export default fp(jwtPlugin);
