import express from "express";
import { ArtController } from "./controller/artController";

const router = express.Router();

const artController = new ArtController();

router.use("/arthistle", artController.router);

router.get("/status", (req, res) => {
  res.status(200).json("Connected!");
});


router.get('/', (req, res) => { res.status(200).json("Art!") });

export default router;
