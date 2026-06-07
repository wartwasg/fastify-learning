import fastify from "fastify"; //loading the fastfy instance

import dotenv from "dotenv"; //loading enviroment variables from the .env file

dotenv.config();
//import my routes
import mongoose from "mongoose";
import projectRoutes from "./routes/project.route.js";
import userRoutes from "./routes/user.route.js";

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  return reply.status(error.statusCode || 500).send({
    success: "fail",
    message: error.message,
  });
});

//app.addHook("preHandler", auth);

//connect to the database

//start my server
app.register(userRoutes, { prefix: "/api/v1/users" });

app.register(projectRoutes, { prefix: "/api/v1/projects" });

const start = async () => {
  await app.listen({ port: process.env.PORT });
  app.log.info(`Server is running on port ${process.env.PORT}`);
};

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Successful connected to the database");
    start();
  })
  .catch((e) => console.log("An error occured while connecting to the db ", e));
