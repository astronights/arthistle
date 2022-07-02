export const getLocalDate = () => {
  return new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .split("T")[0];
};
