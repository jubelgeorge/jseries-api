const express = require("express");
const router = express.Router();

// controller
const {
  searchShows
} = require("../controllers/show");


// routes

// @route    POST api/search-shows
// @desc     Search for show(s)
// @access   Public
router.post("/search-shows", searchShows);


module.exports = router;