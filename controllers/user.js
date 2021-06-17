const User = require("../models/user");
const Show = require("../models/show");


exports.addShow = async (req, res) => {
    try {           
        const show1 = req.body.show; 
        //console.log(show1);       
        const user = await User.findOne({ email: req.user.email }).exec();

        const newShow = new Show({
            name: show1.name,
            premiered: show1.premiered,
            imdb: show1.externals.imdb,
            image: show1.image.original,
            addedBy: user._id
        });
        //console.log(newShow)
        const show = await newShow.save();
        res.json(show);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error'); 
    }   
};
  
exports.getShows = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    let shows = await Show.find({addedBy: user._id}).exec();
    //console.log(shows);
    res.json(shows);
};
  
exports.removeShow = async (req, res) => {
    try {
        //console.log(req.params);
        const user = await User.findOne({ email: req.user.email }).exec();
        const deleted = await Show.findOneAndRemove({
            $and: [{ imdb: req.params.imdb }, { addedBy: user._id }]          
        }).exec();
        //console.log(deleted);
        res.json(deleted);
    } catch (err) {
        console.log(err);
        return res.staus(400).send("Show delete failed");
    }
};

exports.getShow = async (req, res) => {
    //console.log(req.params);
    const showId = req.params.id;
    // const user = await User.findOne({ email: req.user.email }).exec();
    let show = await Show.findOne({_id: showId}).exec();
    //console.log(show);
    res.json(show);
};

exports.updateShow = async (req, res) => {
    try {
        console.log(req.body);
        const showId = req.params.id;
        const showWatchStatus = req.body.showWatchStatus;
        //const user = await User.findOne({ email: req.user.email }).exec();
        const show = await Show.findById(req.params.id).exec();
        const updated = await Show.findByIdAndUpdate(
            {_id: showId},
            { watchStatus: showWatchStatus },
            {new: true}
        ).exec();
        //console.log(updated);
        res.json(updated);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Show delete failed");
    }
};