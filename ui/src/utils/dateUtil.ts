import config from "../config/config";

export const midnightTom = () => {
  const d = new Date();
  let td = new Date(d.setDate(new Date(d).getDate() + 1));
  td.setHours(0, 0, 0, 0);
  return td;
};

export const getNumber = () => {
  const d = new Date();
  const diff = d.getTime() - config.inception.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
};

export const getLocalDate = () => {
  const localDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );
  console.log(new Date());
  console.log(new Date().getTimezoneOffset());
  console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  console.log(localDate);
  return localDate.toISOString().split("T")[0];
};
