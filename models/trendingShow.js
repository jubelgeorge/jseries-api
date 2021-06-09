const mongoose = require("mongoose");


const trendingShowSchema = new mongoose.Schema(
  {
    name: {
      type: String      
    },
    image: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrendingShow", trendingShowSchema);
