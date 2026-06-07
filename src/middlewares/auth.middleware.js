import bcrypt from "bcrypt";
import dotenv from "dotenv";
import InvalidApiKey from "../error/InvalidApiKey.js";
import Unauthorized from "../error/Unauthorized.js";
import user from "../models/user.model.js";

dotenv.config();

const apiKeyAuth = async (request, reply) => {
  //if (["GET"].includes(request.method)) {
  //   return;
  // }
  const apiKey = request.headers["x-api-key"];

  const known_key = process.env.API_key;

  if (!apiKey || apiKey !== known_key) {
    throw new InvalidApiKey("Api key is invalid or expired");
  }
};

const basicAuth = async (request, reply) => {
  const authHeader = request.headers["authorization"];

  if (!authHeader) {
    throw new Unauthorized("Unauthorized");
  }
  const [authType, authKey] = authHeader.split(" ");
  if (authType !== "Basic") {
    throw new Unauthorized("Invalid Authentication type");
  }

  const [email, password] = Buffer.from(authKey, "base64")
    .toString("ascii")
    .split(":");
  const User = await user.findOne({ email }).select("password");

  // console.log(User);
  if (!User) {
    throw new Unauthorized("Invalid email or password");
  } else {
    const status = await comparePasswords(password, User.password);
    if (status) {
      return;
    } else {
      throw new Unauthorized("Invalid password");
    }
  }
};

const comparePasswords = async (password, db_password) => {
  const status = await bcrypt.compare(password, db_password);
  return status;
};
export default { apiKeyAuth, basicAuth, comparePasswords };
