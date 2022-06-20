import express from "express";
import { MetController } from "./controller/metController";

const router = express.Router();

const metController = new MetController();

router.use("/met", metController.router);

router.get("/", (req, res) => {
  res.status(200).json("Connected!");
});

export default router;
