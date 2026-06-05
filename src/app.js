import fastify from "fastify"; //loading the fastfy instance

import dotenv from "dotenv"; //loading enviroment variables from the .env file

dotenv.config();
//import my routes
import mongoose from "mongoose";
import routes from "./routes/user.route.js";

const app = fastify({ logger: true });

//connect to the database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Successful connected to the database"))
  .catch((e) => console.log("An error occured while connecting to the db ", e));

//start my server
app.register(routes, { prefix: "/api/v1/users" });

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT });
    app.log.info(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    app.log.error(
      `Oops an error occurred Please resolve the error first to continue`,
    );
    process.exit(1);
  }
};

start();
