import cors from "cors";
import express from "express";
import router from "./api/router";
import path from "path";

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Apply routes before error handling
app.use(express.static(path.resolve(__dirname, "../ui/build")));
// app.use("/", router);

export default app;
