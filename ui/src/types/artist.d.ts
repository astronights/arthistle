import art from "./art.d.ts";
export type artist = {
  _id: string;
  name: string;
  url: string;
  date: string;
  art: art[];
};
