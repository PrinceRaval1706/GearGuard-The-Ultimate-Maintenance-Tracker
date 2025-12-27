const pool = require("../config/db");

/* =========================
   EQUIPMENT REPORT
========================= */
exports.equipmentReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'safe') AS safe,
        COUNT(*) FILTER (WHERE status = 'damaged') AS damaged,
        COUNT(*) FILTER (WHERE status = 'expired') AS expired
      FROM gears
      WHERE user_id = $1
      `,
      [userId]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("EQUIPMENT REPORT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   REQUEST REPORT
========================= */
exports.requestReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'pending') AS pending,
        COUNT(*) FILTER (WHERE status = 'approved') AS approved,
        COUNT(*) FILTER (WHERE status = 'rejected') AS rejected
      FROM requests
      WHERE user_id = $1
      `,
      [userId]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("REQUEST REPORT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   MONTHLY ACTIVITY REPORT
========================= */
exports.monthlyReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        TO_CHAR(created_at, 'YYYY-MM') AS month,
        COUNT(*) AS count
      FROM gears
      WHERE user_id = $1
      GROUP BY month
      ORDER BY month
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("MONTHLY REPORT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   CALENDAR REPORT
========================= */
exports.calendarReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        event_type,
        COUNT(*) AS count
      FROM calendar_events
      WHERE user_id = $1
      GROUP BY event_type
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("CALENDAR REPORT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
