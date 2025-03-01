import cors from "cors";
import express from "express";
import router from "./api/router";
import path from "path";
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

// app.use(express.static(path.join(__dirname + "../../../../ui/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "../public/index.html"));
// });

export default app;
