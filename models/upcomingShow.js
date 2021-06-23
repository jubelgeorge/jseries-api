const mongoose = require("mongoose");


const upcomingShowSchema = new mongoose.Schema(
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

module.exports = mongoose.model("UpcomingShow", upcomingShowSchema);