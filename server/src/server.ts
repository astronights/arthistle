import app from "./app";
import config from "./config/config";

app.listen(config.port, config.host, () => {
  console.log(`Started server at ${config.host}:${config.port}`);
});
