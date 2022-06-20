import { Request, Response, Router } from "express";
import { MetService } from "../service/metService";

export class MetController {
  router = Router();
  metService: MetService;

  constructor() {
    this.metService = new MetService();
    this.router.get("/random-art", this.getRandomArt);
    this.router.get("/artist-art/:artist", this.getArtistArt);
  }

  public getArtistArt = async (req: Request, res: Response) => {
    return res
      .status(200)
      .json(await this.metService.getKeywordArt(req.params.artist));
  };

  public getRandomArt = async (req: Request, res: Response) => {
    return res.status(200).json(await this.metService.getRandomArt());
  };
}
