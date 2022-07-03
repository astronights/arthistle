export const getLocalDate = () => {
  return new Date().toISOString().split("T")[0];
};
