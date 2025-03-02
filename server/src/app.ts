import cors from "cors";
import express from "express";
import router from "./api/router";
import RateLimit from "express-rate-limit";

const limiter = RateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

const app = express();

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/", router);

export default app;
