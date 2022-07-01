import pack from "../../package.json";

const config = {
  inception: new Date("July 1, 2022 00:00:00"),
  server: `http://localhost:${
    process.env.PORT || process.env.REACT_APP_PORT || pack.proxy.split(":")[2]
  }`,
};
export default config;
