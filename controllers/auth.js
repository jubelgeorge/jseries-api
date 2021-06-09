const {validationResult} = require('express-validator');

const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
