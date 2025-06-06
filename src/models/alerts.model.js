const mongoose = require("mongoose");

const AlertsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price_signal: {
      type: String,
      required: false, // fixed from 'require' to 'required'
      default: null,
    },
    criteria: {
      type: String,
      enum: ["gt", "lt"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    frequency: {
      type: String,
      enum: ["Everyday", "Weekdays"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      // Basic email regex validation
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Alert", AlertsSchema);
