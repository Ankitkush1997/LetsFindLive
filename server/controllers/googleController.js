const axios = require('axios');

//please store these in a secure place
const key = 'AIzaSyAIlVBnrUonVHQRGA1FEtFiOf4iIEqES44';
const cx = '25916ac6dd32a1340';

// @desc    Makes a search request to google and returns the json data
// @route   GET /api/google/search-web/:searchValue/:pageNumber
// @access  Public
const searchGoogleWeb = (req, res) => {
  const searchVal = req.params.searchValue;
  const pageNumber = req.params.pageNumber;
  const start = pageNumber == 1 ? 1 : pageNumber * 10 - 9;

  axios
    .get(
      `https://www.googleapis.com/customsearch/v1?key=${key}&start=${start}&cx=${cx}&q=${searchVal}`
    )
    .then((response) => {
      res.status(200).json({
        results: response.data.items,
        searchInformation: response.data.searchInformation,
      });
    })
    .catch((error) => res.status(429).json(error));
};

// @desc    Makes a search request to google and returns the json images
// @route   GET /api/google/search-images/:searchValue/:pageNumber
// @access  Public
const searchGoogleImages = (req, res) => {
  const searchVal = req.params.searchValue;
  const pageNumber = req.params.pageNumber;
  const start = pageNumber == 1 ? 1 : pageNumber * 10 - 9;

  axios
    .get(
      `https://www.googleapis.com/customsearch/v1?key=${key}&searchType=image&start=${start}&cx=${cx}&q=${searchVal}`
    )
    .then((response) => {
      res.status(200).json({
        images: response.data.items,
        searchInformation: response.data.searchInformation,
      });
    })
    .catch((error) => res.status(429).json(error));
};

module.exports = {
  searchGoogleWeb,
  searchGoogleImages,
};
