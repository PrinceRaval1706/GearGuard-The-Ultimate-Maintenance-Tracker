const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const gearController = require("../controllers/gear.controller");

/* =========================
   EQUIPMENT PAGE ROUTES
========================= */

// Add equipment
router.post("/", authMiddleware, gearController.createGear);

// Get all equipment (equipment list page)
router.get("/", authMiddleware, gearController.getAllGears);

// Get single equipment (edit/view page)
router.get("/:id", authMiddleware, gearController.getSingleGear);

// Update equipment
router.put("/:id", authMiddleware, gearController.updateGear);

// Delete equipment
router.delete("/:id", authMiddleware, gearController.deleteGear);

module.exports = router;
