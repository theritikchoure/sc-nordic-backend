const Power = require("../models/power.model");

module.exports = { getPowerDataForChart, storePowerData };

// Controller to get all alerts
async function getPowerDataForChart(req, res) {
  try {
    // Get last 20 entries (adjust as needed)
    const data = await Power.find().sort({ timestamp: -1 }).limit(20);

    // Transform data to match chart format
    const result = {
      categories: data.map((item) => item.timestamp.toLocaleTimeString()),
      series: [
        {
          name: "DK-1",
          data: data.map((item) => item.dk1),
        },
        {
          name: "DK-2",
          data: data.map((item) => item.dk2),
        },
        {
          name: "DK-Gas",
          data: data.map((item) => item.dkGas || null), // Handle missing gas data
        },
      ],
    };

    res.status(200).json({
      message: "Power data fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
}

async function storePowerData(req, res) {
  try {
    // Generate mock data
    const mockData = [];
    const now = new Date();

    for (let i = 0; i < 20; i++) {
      // Create timestamps spaced 2 minutes apart
      const timestamp = new Date(now.getTime() - i * 2 * 60 * 1000);

      mockData.push({
        timestamp,
        dk1: getRandomValue(49.5, 50.5, 2), // Random value between 49.5-50.5 with 2 decimals
        dk2: getRandomValue(49.7, 50.3, 2), // Different range for variety
        dkGas: null, // 30% chance of being null
      });
    }

    // Insert mock data
    await Power.insertMany(mockData);

    // 4. Respond with success and the created alert
    res.status(201).json({
      message: "Power data created successfully",
      data: mockData,
    });
  } catch (err) {
   
    // Handle other server errors
    console.error("Create power data error:", err);
    res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
}

// Helper function to generate random values with precision
function getRandomValue(min, max, precision) {
    const value = Math.random() * (max - min) + min;
    return parseFloat(value.toFixed(precision));
  }