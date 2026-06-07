import dotenv from "dotenv";
import InvalidApiKey from "../error/InvalidApiKey.js";

dotenv.config();

const auth = async (request, reply) => {
  //if (["GET"].includes(request.method)) {
  //   return;
  // }
  const apiKey = request.headers["x-api-key"];

  const known_key = process.env.API_key;

  if (!apiKey || apiKey !== known_key) {
    throw new InvalidApiKey("Api key is invalid or expired");
  }
};

export default auth;
