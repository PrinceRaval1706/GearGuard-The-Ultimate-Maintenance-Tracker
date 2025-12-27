
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const teamController = require("../controllers/team.controller");

router.get("/my", authMiddleware, teamController.getMyTeam);

module.exports = router;