const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");

router.get("/", authMiddleware, dashboardController.getDashboard);

module.exports = router;
