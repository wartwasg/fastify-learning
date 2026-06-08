import userController from "../controllers/user.controller.js";
import { default as auth } from "../middlewares/auth.middleware.js";
import user from "../models/user.model.js";

async function routes(fastify, options) {
  fastify.get("/", { onRequest: fastify.jwtAuth }, userController.getAllUsers);
  fastify.get("/:id", userController.getUserById);
  fastify.post(
    "/",
    { onRequest: [fastify.jwtAuth, fastify.hasRole("Admin")] },
    userController.createUser,
  );
  fastify.put("/:id", userController.updateUser);
  fastify.delete("/:id", userController.deleteUser);
  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body;

    const User = await user
      .findOne({ email })
      .select(["password", "role", "firstName", "lastName"]);

    // console.log(User);
    if (!User) {
      throw new Unauthorized("Invalid email or password");
    } else {
      const status = await auth.comparePasswords(password, User.password);
      if (status) {
        const token = fastify.jwt.sign({
          payload: {
            Email: email,
            fname: User.firstName,
            lname: User.lastName,
            role: User.role,
          },
        });
        reply.send({ Token: token });
      } else {
        throw new Unauthorized("Invalid password");
      }
    }
  });
}

export default routes;
