const User = require("../models/user");


// @route    POST api/create-or-update-user
// @desc     Create or update a user
// @access   Private
exports.createOrUpdateUser = async (req, res) => { 
  try {
    const { email } = req.user;  
    const user = await User.findOneAndUpdate(
      { email },
      { name: email.split("@")[0] },
      { new: true }
    );
    if (user) {
      console.log("USER UPDATED", user);
      res.json(user);
    } else {
      const newUser = await new User({
        email,
        name: email.split("@")[0]
      }).save();
      console.log("USER CREATED", newUser);
      res.json(newUser);
    }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    POST api/current-(user/admin)
// @desc     Current (User/Admin)
// @access   Private
exports.currentUser = async (req, res) => {
  try {
    User.findOne({ email: req.user.email }).exec((err, user) => {
      if (err) throw new Error(err);
      res.json(user);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }  
};