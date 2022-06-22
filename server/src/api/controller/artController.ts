import { Request, Response, Router } from "express";
import { BaseArtService } from "../service/baseArtService";
import config from "../../config/config";
import { WikiArtService } from "../service/wikiArtService";

export class ArtController {
  router = Router();
  artService: BaseArtService;

  constructor() {
    this.artService = this.getArtService();
    this.router.get("/art-today", this.getArtToday);
  }

  public getArtToday = async (req: Request, res: Response) => {
    return res.status(200).json(await this.artService.getArtToday());
  };

  private getArtService = (): BaseArtService => {
    const serviceName = config.art.source;
    if (serviceName == "wiki") {
      return new WikiArtService();
    } else {
      console.log("No artService specified in config");
      return new BaseArtService();
    }
  };
}
