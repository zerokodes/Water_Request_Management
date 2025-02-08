const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
  city: { type: String, enum: ['Awka', 'Nnewi'], required: true }
});

module.exports = mongoose.model("User", UserSchema);
