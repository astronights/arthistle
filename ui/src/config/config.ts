import pack from "../../package.json";

const config = {
  server: `https://localhost:${process.env["PORT"]}`,
  // server: pack.proxy,
};
export default config;
