const pool = require("../config/db");

/* =========================
   GET MY TEAM DETAILS
========================= */
exports.getMyTeam = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's team
    const teamResult = await pool.query(
      `SELECT t.id, t.name
       FROM teams t
       JOIN users u ON u.team_id = t.id
       WHERE u.id = $1`,
      [userId]
    );

    if (teamResult.rows.length === 0) {
      return res.status(404).json({
        message: "User is not assigned to any team"
      });
    }

    const team = teamResult.rows[0];

    // Get team members
    const membersResult = await pool.query(
      `SELECT id, name, email
       FROM users
       WHERE team_id = $1
       ORDER BY name`,
      [team.id]
    );

    res.json({
      team,
      members: membersResult.rows
    });

  } catch (error) {
    console.error("GET TEAM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
