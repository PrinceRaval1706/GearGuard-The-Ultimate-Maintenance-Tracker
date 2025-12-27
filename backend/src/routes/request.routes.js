const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const requestController = require("../controllers/request.controller");

router.post("/", authMiddleware, requestController.createRequest);
router.get("/", authMiddleware, requestController.getAllRequests);
router.get("/:id", authMiddleware, requestController.getSingleRequest);
router.delete("/:id", authMiddleware, requestController.deleteRequest);

module.exports = router;
