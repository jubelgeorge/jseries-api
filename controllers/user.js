const User = require("../models/user");
const Show = require("../models/show");


// @route    POST api/user/show
// @desc     Create a show
// @access   Private
exports.addShow = async (req, res) => {
    try {           
        const show1 = req.body.show;     
        const user = await User.findOne({ email: req.user.email }).exec();

        const newShow = new Show({
            name: show1.name,
            premiered: show1.premiered,
            imdb: show1.externals.imdb,
            image: show1.image.original,
            addedBy: user._id
        });
        const show = await newShow.save();
        res.json(show);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error'); 
    }   
};

// @route    GET api/user/shows
// @desc     Get all shows of a user
// @access   Private
exports.getShows = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).exec();
        let shows = await Show.find({addedBy: user._id}).exec();
        res.json(shows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    DELETE api/user/show/:imdb
// @desc     Delete a show
// @access   Private
exports.removeShow = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).exec();
        const deleted = await Show.findOneAndRemove({
            $and: [{ imdb: req.params.imdb }, { addedBy: user._id }]          
        }).exec();
        res.json(deleted);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    GET api/user/show/:id
// @desc     Get show of loggedIn user
// @access   Private
exports.getShow = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        res.json(show);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    const showId = req.params.id;
    let show = await Show.findOne({_id: showId}).exec();
    res.json(show);
};

// @route    PUT api/user/show/:id
// @desc     Update a show
// @access   Private
exports.updateShow = async (req, res) => {
    try {
        const showId = req.params.id;
        const showWatchStatus = req.body.showWatchStatus;

        const updated = await Show.findByIdAndUpdate(
            {_id: showId},
            { watchStatus: showWatchStatus },
            {new: true}
        ).exec();
        res.json(updated);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    PUT api/user/show-byimdb/:imdb
// @desc     Update a show by IMDB
// @access   Private
exports.updateShowByIMDB = async (req, res) => {
    try {
        const showWatchStatus = req.body.showWatchStatus;
        const user = await User.findOne({ email: req.user.email }).exec();
        const updated = await Show.findOneAndUpdate(
            {$and: [{ imdb: req.params.imdb }, { addedBy: user._id }]},
            { watchStatus: showWatchStatus },
            { new: true }
        ).exec();
        res.json({ ok: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    POST api/user/search-shows
// @desc     Get shows by text
// @access   Private
exports.getShowsByText = async (req, res) => {
    try {
        const query = req.body.text;
        const user = await User.findOne({ email: req.user.email }).exec();
        const shows = await Show.find({$and: [{ "name" : new RegExp(query, 'i')  }, { addedBy: user._id }]})
        res.json(shows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};   

// @route    GET api/user
// @desc     Get loggedIn user
// @access   Private
exports.getLoggedInUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).exec();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }    
};

// @route    PUT api/user
// @desc     Update loggedIn user profile
// @access   Private
exports.updateLoggedInUserProfile = async (req, res) => {
    try {
        const userProfileStatus = req.body.userProfileStatus;
        const updated = await User.findOneAndUpdate(
            { email: req.user.email },
            { profileStatus: userProfileStatus },
            { new: true }
          ).exec();
        res.json(updated);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    GET api/users
// @desc     Get all users
// @access   Private
exports.getUsers = async (req, res) => {
    try {
      const users = await User.find({ profileStatus: 'public' }).exec();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

// @route    GET api/user/:userId
// @desc     Get all shows of a user
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