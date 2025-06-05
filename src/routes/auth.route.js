// Import Express
const express = require("express");
const authController = require("../controllers/auth.controller");

// Create a new router instance using the correct syntax: express.Router()
const router = express.Router();


// Export the router so that it can be used in your main app file
module.exports = router;


router.post("/register", authController.register);

router.post("/login", authController.login);