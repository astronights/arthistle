import pack from "../../package.json";

const config = {
  inception: new Date("July 1, 2024 00:00:00"),
  server: `http://localhost:${
    import.meta.env.PORT || import.meta.env.REACT_APP_PORT || pack.proxy.split(":")[2]
  }`,
};
export default config;
