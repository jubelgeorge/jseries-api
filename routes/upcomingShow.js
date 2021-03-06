const express = require("express");
const router = express.Router();

const multer = require('multer');

const UpcomingShow = require('../models/upcomingShow');

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { remove, list } = require("../controllers/upcomingShow");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads');
    },
    filename: (req, file, cb) => {   
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });


// routes

// @route    GET api/upcoming-shows
// @desc     Get upcoming shows
// @access   Public
router.get("/upcoming-shows", list);

// @route    DELETE api/admin/upcoming-show/:upcomingShowId
// @desc     Delete a upcoming show by upcomingShowId
// @access   Private
router.delete("/admin/upcoming-show/:upcomingShowId", authCheck, adminCheck, remove);

// @route    POST api/admin/upcoming-show
// @desc     Create a upcomingShow
// @access   Private
router.post('/admin/upcoming-show', authCheck, adminCheck, upload.single('image'), async (req, res) => {
  try {
    const newUpcomingShow = new UpcomingShow({
      name: req.body.name,
      image: req.file.originalname
    });

    const upcomingShow = await newUpcomingShow.save();
    res.json(upcomingShow);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }        
});


module.exports = router;