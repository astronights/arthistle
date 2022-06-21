import { Request, Response, Router } from "express";
import { MetService } from "../service/metService";
import { ArtsyService } from "../service/artsyService";
import { BaseArtService } from "../service/baseArtService";
import config from "../../config/config";

export class ArtController {
  router = Router();
  artService: BaseArtService;

  constructor() {
    this.artService = this.getArtService();
    this.router.get("/random-art", this.getRandomArt);
    this.router.get("/artist-art/:artist", this.getArtistArt);
  }

  public getArtistArt = async (req: Request, res: Response) => {
    return res
      .status(200)
      .json(await this.artService.getKeywordArt(req.params.artist));
  };

  public getRandomArt = async (req: Request, res: Response) => {
    return res.status(200).json(await this.artService.getRandomArt());
  };

  private getArtService = (): BaseArtService => {
    const serviceName = config.art.source;
    if (serviceName == "met") {
      return new MetService();
    } else if (serviceName == "artsy") {
      return new ArtsyService();
    } else {
      console.log("No artService specified in config");
      return new BaseArtService();
    }
  };
}
