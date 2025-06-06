// models/PowerData.js
const mongoose = require("mongoose");

const PowerDataSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, required: true },
    dk1: { type: Number, required: true },
    dk2: { type: Number, required: true },
    dk_gas: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PowerData", PowerDataSchema);
