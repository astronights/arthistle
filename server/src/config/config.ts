import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env["HOST"] || "127.0.0.1",
  port: parseInt(process.env["PORT"] || "3000"),

  art: {
    source: "artsy",
    met: {
      host: "https://collectionapi.metmuseum.org",
      path: {
        public: "/public/collection/v1",
      },
    },
    artsy: {
      api: {
        id: process.env["ARTSY_ID"],
        secret: process.env["ARTSY_SECRET"],
      },
    },
  },
};

export default config;
