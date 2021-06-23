const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

//routes

// @route    POST api/create-or-update-user
// @desc     Create or update a user
// @access   Private
router.post("/create-or-update-user", authCheck, createOrUpdateUser);

// @route    POST api/current-user
// @desc     Current User
// @access   Private
router.post("/current-user", authCheck, currentUser);

// @route    POST api/current-admin
// @desc     Current Admin
// @access   Private
router.post("/current-admin", authCheck, adminCheck, currentUser);


module.exports = router;