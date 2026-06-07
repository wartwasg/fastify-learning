import userController from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

async function routes(fastify, options) {
  fastify.get("/", { preHandler: auth }, userController.getAllUsers);
  fastify.get("/:id", userController.getUserById);
  fastify.post("/", userController.createUser);
  fastify.put("/:id", userController.updateUser);
  fastify.delete("/:id", userController.deleteUser);
}

export default routes;
