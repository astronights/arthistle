import { request } from "./request";
import { AxiosResponse } from "axios";
import { artist } from "../types/artist";
import { getLocalDate } from "../utils/dateUtil";
import config from "../config/config";

export const getDailyArt = async (date?: string): Promise<artist> => {
  if (date && date > getLocalDate()) {
    console.log("Cannot fetch for a future date");
    return Promise.reject("Cannot fetch for a future date");
  }
  
  const response: AxiosResponse = await request(
    "GET",
    `${config.server}/arthistle/art-today/${date}`,
    null,
    null
  );
  return response.data;
};
