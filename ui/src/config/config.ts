import dotenv from "dotenv";
dotenv.config();

const config = {
  server: `http://localhost:${process.env["PORT"] || "4242"}`,
};
export default config;
