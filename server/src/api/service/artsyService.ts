import axios, { AxiosResponse } from "axios";
import { response } from "express";
import config from "../../config/config";
import { Art } from "../../types/art";
import { BaseArtService } from "./baseArtService";

export class ArtsyService extends BaseArtService {
  token: string;
  constructor() {
    super();
    let cur_token = "";
    this.authenticate().then((resolve: string) => {
      cur_token = resolve;
      cur_token == ""
        ? console.log("Unable to authenticate")
        : console.log("Authenticated with Artsy");
    });
    this.token = cur_token;
  }

  private authenticate = async (): Promise<string> => {
    const url = "https://api.artsy.net/api/tokens/xapp_token";
    console.log(config.art.artsy.api);
    const response: AxiosResponse = await axios
      .post(url, {
        params: {
          client_id: config.art.artsy.api.id,
          client_secret: config.art.artsy.api.secret,
        },
      })
      .catch((error) => {
        console.log(error.response.data);
        return {
          data: { token: "" },
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers,
          config: error.response.config,
        };
      });
    return response.data.token;
  };
  public getRandomArt = async (): Promise<Art> => {
    const oid = Math.floor(Math.random() * 100) + 1;
    console.log(oid);
    return this.getArtObject(oid);
  };

  //   public getArtistArt = async (): Promise<Art[]> => {};

  public getKeywordArt = async (keyword: string): Promise<Art[]> => {
    const url = config.art.met.host + config.art.met.path.public + `/search`;
    console.log(url);
    const response: AxiosResponse = await axios
      .get(url, { params: { q: keyword, isHighlight: "TRUE" } })
      .catch((error) => {
        console.log(error);
        return {
          data: { objectID: -1, note: error.response.data.message },
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers,
          config: error.response.config,
        };
      });
    if (response.data == null) {
      return Promise.resolve([{ objectID: -1, note: "No data" }]);
    }
    console.log(`${response.data.total} art objects found`);
    return response.data.objectIDs
      .map(async (oid: number) => await this.getArtObject(oid))
      .filter(async (art: Art) => {
        const resart = await art;
        console.log(resart.artistDisplayName);
        return resart.artistDisplayName
          ?.toLowerCase()
          .includes(keyword.toLowerCase());
      });
  };

  private getArtObject = async (oid: number): Promise<Art> => {
    const url =
      config.art.met.host + config.art.met.path.public + `/objects/${oid}`;
    const response: AxiosResponse<Art> = await axios.get(url).catch((error) => {
      console.log(error);
      return {
        data: { objectID: oid, note: error.response.data.message },
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        config: error.response.config,
      };
    });
    if (response.data == null) {
      return Promise.resolve({ objectID: -1, note: "No data" });
    }
    return Promise.resolve(<Art>response.data);
  };
}
