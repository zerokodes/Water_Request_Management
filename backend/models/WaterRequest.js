const mongoose = require("mongoose");

const WaterRequestSchema = new mongoose.Schema({
  lodgeName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  phoneNumber: String,
  city: { type: String, enum: ["Awka", "Nnewi"], required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WaterRequest", WaterRequestSchema);
