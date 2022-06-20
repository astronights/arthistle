import axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { Art } from "../../types/art";

export class MetService {
  public getRandomArt = async (): Promise<Art> => {
    const oid = Math.floor(Math.random() * 100) + 1;
    console.log(oid);
    return this.getArtObject(oid);
  };

  private getArtObject = async (oid: number): Promise<Art> => {
    const url =
      config.art.met.host + config.art.met.path.public + `/objects/${oid}`;
    console.log(url);
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
