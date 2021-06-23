const axios = require("axios");


// @route    POST api/search-shows
// @desc     Search for show(s)
// @access   Public
exports.searchShows = async (req, res) => {
  try {
    const {queryMultiple, querySingle, queryIMDB} = req.body;

    // Multiple Query
    if(queryMultiple) {
      const result = await axios.get(`http://api.tvmaze.com/search/shows?q=${queryMultiple}`);
      res.json(result.data);
    }
    // Single Query
    if(querySingle) {
      const result = await axios.get(`http://api.tvmaze.com/singlesearch/shows?q=${querySingle}`);
      res.json(result.data);
    }
    // IMDB Query
    if(queryIMDB) {
      const result = await axios.get(`http://api.tvmaze.com/lookup/shows?imdb=${queryIMDB}`);
      res.json(result.data);
    }        
    
  } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};