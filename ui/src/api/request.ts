import axios, { Method, AxiosResponse } from "axios";
import config from "../config/config";

const api = axios.create({
  baseURL: config.server,
});

export const request = <T>(
  method: Method,
  url: string,
  params: any,
  data: any
): Promise<AxiosResponse> => {
  return api.request<T>({ method, url, params, data });
};