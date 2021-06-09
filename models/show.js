const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const showSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Show", showSchema);
