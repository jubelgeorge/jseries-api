const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const showSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    premiered: {
      type: String
    },
    imdb: {
      type: String
    },
    image: {
      type: String
    },
    watchStatus: {
      type: String,
      default: "Already Watched",
      enum: [
        "Already Watched",
        "Currently Watching",
        "Not Yet Watched"
      ]
    },
    addedBy: { 
      type: ObjectId, 
      ref: "User" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Show", showSchema);
