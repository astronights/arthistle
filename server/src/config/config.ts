import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env["HOST"] || "0.0.0.0",
  port: parseInt(process.env["PORT"] || "4242"),
  mongo: {
    uri: process.env["MONGO_URI"]
  },
  art: {
    source: "local",
    inception: "2024-07-01",
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
    wiki: {
      host: {
        public: "https://www.wikiart.org/en/Api/2",
        json: "https://www.wikiart.org/en/popular-paintings?json=1",
      },
      api: {
        id: process.env["WIKI_ID"],
        secret: process.env["WIKI_SECRET"],
      },
    },
  },
};

export default config;
