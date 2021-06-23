const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    profileStatus: {
      type: String,
      default: "public",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);