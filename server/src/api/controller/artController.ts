import { Request, Response, Router } from "express";
import { BaseArtService } from "../service/baseArtService";
import config from "../../config/config";
import { LocalArtService } from "../service/localArtService";

export class ArtController {
  router = Router();
  artService: BaseArtService;

  constructor() {
    this.artService = this.getArtService();
    this.router.get("/art-today/:date", this.getArtToday);
  }

  public getArtToday = async (req: Request, res: Response): Promise<any> => {
    return res
      .status(200)
      .json(await this.artService.getArtToday(req.params.date));
  };

  private getArtService = (): BaseArtService => {
    const serviceName = config.art.source;
    if (serviceName == "local") {
      return new LocalArtService();
    } else {
      console.log("No artService specified in config");
      return new BaseArtService();
    }
  };
}
