import pack from "../../package.json";

const config = {
  server: `http://localhost:${
    process.env.PORT || process.env.REACT_APP_PORT || pack.proxy.split(":")[2]
  }`,
};
export default config;
