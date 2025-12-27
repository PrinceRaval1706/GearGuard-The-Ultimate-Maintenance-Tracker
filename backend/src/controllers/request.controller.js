const pool = require("../config/db");

/* =========================
   CREATE REQUEST
========================= */
exports.createRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gear_id, request_type, description } = req.body;

    if (!request_type) {
      return res.status(400).json({
        message: "Request type is required"
      });
    }

    const result = await pool.query(
      `INSERT INTO requests (user_id, gear_id, request_type, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, gear_id || null, request_type, description || null]
    );

    res.status(201).json({
      message: "Request created successfully",
      request: result.rows[0]
    });

  } catch (error) {
    console.error("CREATE REQUEST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL REQUESTS (USER)
========================= */
exports.getAllRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT *
       FROM requests
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("GET REQUESTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET SINGLE REQUEST
========================= */
exports.getSingleRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.id;

    const result = await pool.query(
      `SELECT *
       FROM requests
       WHERE id = $1 AND user_id = $2`,
      [requestId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("GET SINGLE REQUEST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE REQUEST
========================= */
exports.deleteRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.id;

    const result = await pool.query(
      `DELETE FROM requests
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [requestId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found or not authorized"
      });
    }

    res.json({
      message: "Request deleted successfully"
    });

  } catch (error) {
    console.error("DELETE REQUEST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
