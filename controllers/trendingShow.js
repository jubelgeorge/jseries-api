const TrendingShow = require('../models/trendingShow');

exports.remove = async (req, res) => {
  //console.log(req.params);
  try {
    res.json(await TrendingShow.findByIdAndDelete(req.params.trendingShowId).exec());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await TrendingShow.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};







