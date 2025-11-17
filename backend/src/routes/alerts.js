// src/routes/alerts.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET /api/alerts?regionId=1
router.get("/", async (req, res) => {
  const { regionId } = req.query;
  if (!regionId) {
    return res.status(400).json({ error: "regionId is required" });
  }

  try {
    const [alerts] = await pool.query(
      `
      SELECT id, severity, message, created_at
      FROM alerts
      WHERE region_id = ?
      ORDER BY created_at DESC
      LIMIT 50;
      `,
      [regionId]
    );

    res.json(alerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
