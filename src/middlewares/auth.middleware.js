import dotenv from "dotenv";
import InvalidApiKey from "../error/InvalidApiKey.js";
import Unauthorized from "../error/Unauthorized.js";

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
};
export default { apiKeyAuth, basicAuth };
