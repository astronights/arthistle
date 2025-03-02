import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import RateLimit from "express-rate-limit";

import router from "../../src/api/router";
import config from '../../src/config/config';

const limiter = RateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

const app = express();

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/art", router);

// app.listen(config.port, () => {
//   console.log(`Started server at ${config.host}:${config.port}`);
// });

export const handler = serverless(app);