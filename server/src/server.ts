import app from "./app";
import config from "./config/config";

const server = app.listen(config.port, config.host, () => {
  console.log(`Started server at ${config.host}:${config.port}`);
});

export default server;
