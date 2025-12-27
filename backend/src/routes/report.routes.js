const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const reportController = require("../controllers/report.controller");

router.get("/equipment", authMiddleware, reportController.equipmentReport);
router.get("/requests", authMiddleware, reportController.requestReport);
router.get("/monthly", authMiddleware, reportController.monthlyReport);
router.get("/calendar", authMiddleware, reportController.calendarReport);

module.exports = router;
