import pack from "../../package.json";

const config = {
  server: `http://localhost:${process.env["PORT"]}`,
  // server: pack.proxy,
};
export default config;
