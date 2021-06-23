const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {
  addShow,
  getShows,
  removeShow,
  getShow,
  updateShow,
  updateShowByIMDB,
  getShowsByText,
  getLoggedInUser,
  updateLoggedInUserProfile,
  getUsers,
  getUserShows
} = require("../controllers/user");


// routes

// @route    POST api/user/show
// @desc     Create a show
// @access   Private
router.post("/user/show", authCheck, addShow);

// @route    GET api/user/shows
// @desc     Get all shows of loggedIn user
// @access   Private
router.get("/user/shows", authCheck, getShows);

// @route    DELETE api/user/show/:imdb
// @desc     Delete a show
// @access   Private
router.delete("/user/show/:imdb", authCheck, removeShow);

// @route    GET api/user/show/:id
// @desc     Get show of loggedIn user
// @access   Private
router.get("/user/show/:id", authCheck, getShow);

// @route    PUT api/user/show/:id
// @desc     Update a show
// @access   Private
router.put("/user/show/:id", authCheck, updateShow);

// @route    PUT api/user/show-byimdb/:imdb
// @desc     Update a show by IMDB
// @access   Private
router.put("/user/show-byimdb/:imdb", authCheck, updateShowByIMDB);

// @route    POST api/user/search-shows
// @desc     Get shows by text
// @access   Private
router.post("/user/search-shows", authCheck, getShowsByText);

// @route    GET api/user
// @desc     Get loggedIn user
// @access   Private
router.get("/user", authCheck, getLoggedInUser);  

// @route    PUT api/user
// @desc     Update loggedIn user profile
// @access   Private
router.put("/user", authCheck, updateLoggedInUserProfile);

// @route    GET api/users
// @desc     Get all users
// @access   Private
router.get("/users", authCheck, getUsers);

// @route    GET api/user/:userId
// @desc     Get all shows of a user
// @access   Private
router.get("/user/:userId", authCheck, getUserShows);   


module.exports = router;