const slugify = require("slugify");
const {validationResult} = require('express-validator');

const Show = require("../models/show");
const User = require("../models/user");

const axios = require("axios");


exports.searchShows = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //console.log(req.body);
    const {queryMultiple, querySingle, queryIMDB} = req.body;

    // Multiple Query
    if(queryMultiple) {
      const result = await axios.get(`http://api.tvmaze.com/search/shows?q=${queryMultiple}`);
      //console.log(result.data);
      res.json(result.data);
    }
    // Single Query
    if(querySingle) {
      const result = await axios.get(`http://api.tvmaze.com/singlesearch/shows?q=${querySingle}`);
      //console.log(result.data);
      res.json(result.data);
    }
    // IMDB Query
    if(queryIMDB) {
      const result = await axios.get(`http://api.tvmaze.com/lookup/shows?imdb=${queryIMDB}`);
      //console.log(result.data);
      res.json(result.data);
    }        
    
  } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};

