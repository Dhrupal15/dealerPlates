// models/Plate.js

const mongoose = require("mongoose");

const plateSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true },
  dealership: { type: String, required: true },
  plateType: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  signedOut: { type: Boolean, default: false },
  signInLogs: [
    {
      employeeName: { type: String, required: true },
      signInDate: { type: Date, default: Date.now },
    },
  ],
  signOutLogs: [
    {
      employeeName: { type: String, required: true },
      signOutDate: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Plate", plateSchema);
