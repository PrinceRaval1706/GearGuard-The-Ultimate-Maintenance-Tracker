const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const calendarController = require("../controllers/calendar.controller");

router.post("/", authMiddleware, calendarController.createEvent);
router.get("/", authMiddleware, calendarController.getEvents);
router.put("/:id", authMiddleware, calendarController.updateEvent);
router.delete("/:id", authMiddleware, calendarController.deleteEvent);

module.exports = router;
