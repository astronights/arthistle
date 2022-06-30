const config = {
  server: `http://localhost:${
    process.env.PORT || process.env.REACT_APP_PORT || 4242
  }`,
};
export default config;
