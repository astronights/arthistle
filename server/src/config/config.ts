import dotenv from "dotenv";
dotenv.config();

const config = {
  nodeEnv: process.env["HOST"] ?? "localhost",
  port: process.env["PORT"] ?? 3000,
};

export default config;
