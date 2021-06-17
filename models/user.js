const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      //index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    shows: {
      type: Array
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
