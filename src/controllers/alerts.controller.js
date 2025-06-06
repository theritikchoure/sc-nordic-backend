const Alert = require("../models/alerts.model");
const { createAlertSchema } = require("../validators/alertsValidator");

module.exports = { getAllAlerts, createAlert, deleteAlert };

// Controller to get all alerts
async function getAllAlerts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    const skip = (page - 1) * limit;

    const [alerts, totalCount] = await Promise.all([
      Alert.find().skip(skip).limit(limit),
      Alert.countDocuments(),
    ]);

    res.status(200).json({
      message: "Alerts fetched successfully",
      data: alerts,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: skip + alerts.length < totalCount,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
}

async function createAlert(req, res) {
  try {
    // 1. Validate incoming request data
    const validatedData = createAlertSchema.parse(req.body);

    // 2. Create a new alert document with validated data
    const newAlert = new Alert(validatedData);

    // 3. Save the alert to the database
    await newAlert.save();

    // 4. Respond with success and the created alert
    res.status(201).json({
      message: "Alert created successfully",
      data: newAlert,
    });
  } catch (err) {
    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      return res.status(400).json({
        error: "Validation error",
        message: err.errors[0].message,
        // details: err.errors,
      });
    }

    // Handle other server errors
    console.error("Create alert error:", err);
    res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
}

async function deleteAlert(req, res) {
  try {
    const { id } = req.params;

    // 1. Check if alert exists
    const alert = await Alert.findById(id);
    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    // 2. Delete the alert
    await Alert.findByIdAndDelete(id);

    // 3. Respond with success
    res.status(200).json({ message: "Alert deleted successfully" });
  } catch (err) {
    console.error("Delete alert error:", err);
    res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
}
