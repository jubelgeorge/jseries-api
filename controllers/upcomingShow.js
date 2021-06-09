const UpcomingShow = require('../models/upcomingShow');

exports.remove = async (req, res) => {
  //console.log(req.params);
  try {
    res.json(await UpcomingShow.findByIdAndDelete(req.params.upcomingShowId).exec());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await UpcomingShow.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};







