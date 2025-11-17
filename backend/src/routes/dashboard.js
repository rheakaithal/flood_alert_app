// src/routes/dashboard.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET /api/dashboard?regionId=1
router.get("/", async (req, res) => {
  const { regionId } = req.query;

  if (!regionId) {
    return res.status(400).json({ error: "regionId is required" });
  }

  try {
    // Latest readings per sensor in this region
    const [readings] = await pool.query(
      `
      SELECT s.id AS sensor_id, s.name, sr.water_level, sr.recorded_at
      FROM sensors s
      JOIN sensor_readings sr ON sr.sensor_id = s.id
      WHERE s.region_id = ?
      AND sr.recorded_at = (
          SELECT MAX(recorded_at)
          FROM sensor_readings
          WHERE sensor_id = s.id
      )
      ORDER BY sr.recorded_at DESC;
      `,
      [regionId]
    );

    // Recent alerts for this region
    const [alerts] = await pool.query(
      `
      SELECT id, severity, message, created_at
      FROM alerts
      WHERE region_id = ?
      ORDER BY created_at DESC
      LIMIT 20;
      `,
      [regionId]
    );

    res.json({ readings, alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
