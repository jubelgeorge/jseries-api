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
  updateShow
} = require("../controllers/user");


// routes
router.post("/user/show", authCheck, addShow);
router.get("/user/shows", authCheck, getShows);
router.delete("/user/show/:imdb", authCheck, removeShow);
router.get("/user/show/:id", authCheck, getShow);
router.put("/user/show/:id", authCheck, updateShow);

module.exports = router;
