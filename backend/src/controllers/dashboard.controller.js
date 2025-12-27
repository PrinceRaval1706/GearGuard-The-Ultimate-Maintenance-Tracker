const pool = require("../config/db");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id; // 🔑 logged-in user

    /* USER INFO (ONLY LOGGED IN USER) */
    const userResult = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [userId]
    );

    /* SAFETY CHECK */
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    /* GEARS COUNT (ONLY USER’S GEARS) */
    const gearStats = await pool.query(
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

    res.json({
      user: userResult.rows[0],
      gears: gearStats.rows[0]
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
