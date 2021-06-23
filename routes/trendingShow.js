const express = require("express");
const router = express.Router();

const multer = require('multer');

const TrendingShow = require('../models/trendingShow');

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { remove, list } = require("../controllers/trendingShow");

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

// @route    GET api/trending-shows
// @desc     Get trending shows
// @access   Public
router.get("/trending-shows", list);

// @route    DELETE api/admin/trending-show/:trendingShowId
// @desc     Delete a trending show by trendingShowId
// @access   Private
router.delete("/admin/trending-show/:trendingShowId", authCheck, adminCheck, remove);

// @route    POST api/admin/trending-show
// @desc     Create a trendingShow
// @access   Private
router.post('/admin/trending-show', authCheck, adminCheck, upload.single('image'), async (req, res) => {
  try {    
    const newTrendingShow = new TrendingShow({
      name: req.body.name,
      image: req.file.originalname
    });

    const trendingShow = await newTrendingShow.save();
    res.json(trendingShow);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error'); 
  }        
});


module.exports = router;