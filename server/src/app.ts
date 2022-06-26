import cors from "cors";
import express from "express";
import router from "./api/router";
import path from "path";

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/", router);

app.use(express.static(path.resolve(__dirname, "../../../ui/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "../../../ui/build/index.html"));
});

export default app;
