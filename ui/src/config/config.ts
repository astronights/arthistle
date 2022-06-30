import pack from "../../package.json";

const config = {
  server: `localhost:${process.env["PORT"]}`,
  // server: pack.proxy,
};
export default config;
