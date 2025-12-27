const pool = require("../config/db");

/* =========================
   CREATE NEW GEAR
========================= */
exports.createGear = async (req, res) => {
  try {
    const userId = req.user.id; // 🔐 logged-in user

    const { name, category, status } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Equipment name is required"
      });
    }

    const result = await pool.query(
      `INSERT INTO gears (user_id, name, category, status)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, name, category, status, created_at`,
      [userId, name, category || null, status || "safe"]
    );

    res.status(201).json({
      message: "Equipment added successfully",
      gear: result.rows[0]
    });

  } catch (error) {
    console.error("CREATE GEAR ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* =========================
   GET ALL GEARS (USER ONLY)
========================= */
exports.getAllGears = async (req, res) => {
  try {
    const userId = req.user.id; // 🔐 logged-in user

    const result = await pool.query(
      `SELECT id, user_id, name, category, status, created_at
       FROM gears
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("GET GEARS ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* =========================
   UPDATE GEAR (USER ONLY)
========================= */
exports.updateGear = async (req, res) => {
  try {
    const userId = req.user.id;
    const gearId = req.params.id;

    const { name, category, status } = req.body;

    const result = await pool.query(
      `UPDATE gears
       SET name = $1,
           category = $2,
           status = $3
       WHERE id = $4 AND user_id = $5
       RETURNING id, user_id, name, category, status, created_at`,
      [name, category, status, gearId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Equipment not found or not authorized"
      });
    }

    res.json({
      message: "Equipment updated successfully",
      gear: result.rows[0]
    });

  } catch (error) {
    console.error("UPDATE GEAR ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* =========================
   DELETE GEAR (USER ONLY)
========================= */
exports.deleteGear = async (req, res) => {
  try {
    const userId = req.user.id;
    const gearId = req.params.id;

    const result = await pool.query(
      `DELETE FROM gears
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [gearId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Equipment not found or not authorized"
      });
    }

    res.json({
      message: "Equipment deleted successfully"
    });

  } catch (error) {
    console.error("DELETE GEAR ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
/* =========================
   GET SINGLE GEAR (USER ONLY)
========================= */
exports.getSingleGear = async (req, res) => {
  try {
    const userId = req.user.id;
    const gearId = req.params.id;

    const result = await pool.query(
      `SELECT id, user_id, name, category, status, created_at
       FROM gears
       WHERE id = $1 AND user_id = $2`,
      [gearId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("GET SINGLE GEAR ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

