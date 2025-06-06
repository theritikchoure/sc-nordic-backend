// Import Express
const express = require("express");
const authRoutes = require("./auth.route");
const alertsRoutes = require("./alerts.route");
const powerRoutes = require("./power.route");
const authMiddleware = require("../middlwares/authMiddleware");

// Create a new router instance using the correct syntax: express.Router()
const router = express.Router();

// GET route for the root path
router.get("/health-check", (req, res) => {
  res.send("OK"); // Responds with a text message
});


router.use("/auth", authRoutes);
router.use("/alerts", authMiddleware, alertsRoutes);
router.use("/power", authMiddleware, powerRoutes);

// Export the router so that it can be used in your main app file
module.exports = router;
