import express from "express";
import cors from "cors";
import assetsRouter from "./routes/assets.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/assets", assetsRouter);

app.get("/", (req, res) => {
  res.send("Asset Tracking API is running...");
});

app.listen(5001, () => console.log("Server running on port 5001"));