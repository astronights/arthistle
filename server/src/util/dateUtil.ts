export const getLocalDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const getLocalDateTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};
