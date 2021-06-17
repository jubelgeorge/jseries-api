const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  searchShows
} = require("../controllers/show");

// routes
router.post("/search-shows", searchShows);







module.exports = router;
