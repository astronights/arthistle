import { request } from "./request";
import { AxiosResponse } from "axios";
import { artist } from "../types/artist";

export const getDailyArt = async (): Promise<artist> => {
  const response: AxiosResponse = await request(
    "GET",
    "/arthistle/art-today",
    null,
    null
  );
  console.log(response);
  return response.data;
};
