// Import Express
const express = require("express");
const powerController = require("../controllers/power.controller.js");

// Create a new router instance using the correct syntax: express.Router()
const router = express.Router();


// Export the router so that it can be used in your main app file
module.exports = router;


router.get("/chart", powerController.getPowerDataForChart);
router.post("/", powerController.storePowerData);
