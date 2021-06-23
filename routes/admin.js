const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    getUsers,
    removeUser,
    getUserShows,
    removeUserShow
} = require("../controllers/admin");
  
  
// routes

// @route    GET api/admin/users
// @desc     Get users by userId
// @access   Private
router.get("/admin/users", authCheck, adminCheck, getUsers);

// @route    DELETE api/admin/user/:userId
// @desc     Delete a user
// @access   Private
router.delete("/admin/user/:userId", authCheck, adminCheck, removeUser);

// @route    GET api/admin/user-shows/:userId
// @desc     Get shows by userId
// @access   Private
router.get("/admin/user-shows/:userId", authCheck, adminCheck, getUserShows);

// @route    DELETE api/admin/user-show/:userId
// @desc     Delete a userShow by userId & showId
// @access   Private
router.put("/admin/user-show/:userId", authCheck, adminCheck, removeUserShow);

  
module.exports = router;