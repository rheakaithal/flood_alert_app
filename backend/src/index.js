// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dashboardRouter from "./routes/dashboard.js";
import alertsRouter from "./routes/alerts.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Flood alert backend running");
});

app.use("/api/dashboard", dashboardRouter);
app.use("/api/alerts", alertsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
