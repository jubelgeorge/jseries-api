const TrendingShow = require('../models/trendingShow');


// @route    GET api/trending-shows
// @desc     Get trending shows
// @access   Public
exports.list = async (req, res) => {
  try {
    res.json(await TrendingShow.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE api/admin/trending-show/:trendingShowId
// @desc     Delete a trending show by trendingShowId
// @access   Private
exports.remove = async (req, res) => {
  try {
    res.json(await TrendingShow.findByIdAndDelete(req.params.trendingShowId).exec());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};