// Import Express
const express = require("express");
const alertsController = require("../controllers/alerts.controller");

// Create a new router instance using the correct syntax: express.Router()
const router = express.Router();


// Export the router so that it can be used in your main app file
module.exports = router;


router.get("/", alertsController.getAllAlerts);
router.post("/", alertsController.createAlert);

router.delete("/:id", alertsController.deleteAlert);