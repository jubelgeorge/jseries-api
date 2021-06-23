const UpcomingShow = require('../models/upcomingShow');


// @route    GET api/upcoming-shows
// @desc     Get upcoming shows
// @access   Public
exports.list = async (req, res) => {
  try {
    res.json(await UpcomingShow.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE api/admin/upcoming-show/:upcomingShowId
// @desc     Delete a upcoming show by upcomingShowId
// @access   Private
exports.remove = async (req, res) => {
  try {
    res.json(await UpcomingShow.findByIdAndDelete(req.params.upcomingShowId).exec());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};