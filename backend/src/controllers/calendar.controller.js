const pool = require("../config/db");

/* =========================
   CREATE CALENDAR EVENT
========================= */
exports.createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gear_id, title, description, event_date, event_type } = req.body;

    if (!title || !event_date) {
      return res.status(400).json({
        message: "Title and event date are required"
      });
    }

    const result = await pool.query(
      `INSERT INTO calendar_events
       (user_id, gear_id, title, description, event_date, event_type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        userId,
        gear_id || null,
        title,
        description || null,
        event_date,
        event_type || "custom"
      ]
    );

    res.status(201).json({
      message: "Calendar event created",
      event: result.rows[0]
    });

  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET EVENTS (DATE RANGE)
========================= */
exports.getEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const { start, end } = req.query;

    const result = await pool.query(
      `SELECT *
       FROM calendar_events
       WHERE user_id = $1
         AND event_date BETWEEN $2 AND $3
       ORDER BY event_date`,
      [userId, start, end]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("GET EVENTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE EVENT
========================= */
exports.updateEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    const { title, description, event_date, event_type } = req.body;

    const result = await pool.query(
      `UPDATE calendar_events
       SET title = $1,
           description = $2,
           event_date = $3,
           event_type = $4
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [title, description, event_date, event_type, eventId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event updated",
      event: result.rows[0]
    });

  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE EVENT
========================= */
exports.deleteEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const result = await pool.query(
      `DELETE FROM calendar_events
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [eventId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({ message: "Event deleted" });

  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
