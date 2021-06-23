const User = require('../models/user');
const Show = require('../models/show');


// @route    GET api/admin/users
// @desc     Get users by userId
// @access   Private
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE api/admin/user/:userId
// @desc     Delete a user
// @access   Private
exports.removeUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.userId).exec();
    res.json(deleted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET api/admin/user-shows/:userId
// @desc     Get shows by userId
// @access   Private
exports.getUserShows = async (req, res) => {
  try {
    const shows = await Show.find({addedBy: req.params.userId}).exec();
    res.json(shows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }    
};

// @route    DELETE api/admin/user-show/:userId
// @desc     Delete a userShow by userId & showId
// @access   Private
exports.removeUserShow = async (req, res) => {
  try {
    console.log(req.body);
    const deleted = await Show.findOneAndRemove({
        $and: [{ _id: req.body.showId }, { addedBy: req.params.userId }]          
    }).exec();
    //console.log(deleted);
    res.json(deleted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};