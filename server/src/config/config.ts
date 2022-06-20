import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env["HOST"] || "127.0.0.1",
  port: parseInt(process.env["PORT"] || "3000"),

  art: {
    met: {
      host: "https://collectionapi.metmuseum.org",
      path: {
        public: "/public/collection/v1",
      },
    },
  },
};

export default config;
