import pack from "../../package.json";

const config = {
  server: `http://localhost:${process.env.PORT || process.env.REACT_APP_PORT}`,
  // server: pack.proxy,
};
export default config;
