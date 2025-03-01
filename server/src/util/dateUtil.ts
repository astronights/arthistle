export const getLocalDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const getLocalDateTomorrow = (): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};
