import axios, { Method, AxiosResponse } from "axios";

const api = axios.create({});

export const request = <T>(
  method: Method,
  url: string,
  params: any,
  data: any
): Promise<AxiosResponse> => {
  return api.request<T>({ method, url, params, data });
};
