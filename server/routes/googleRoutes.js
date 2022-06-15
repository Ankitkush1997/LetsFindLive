const express = require('express');
const router = express.Router();
const {
  searchGoogleWeb,
  searchGoogleImages
} = require('../controllers/googleController');
const {storeSearchData} = require('../controllers/storeSearchDataController');
const {deleteStoredData} = require('../controllers/deleteGoogleData');
const {fetchGoogleData} = require('../controllers/fetchGoogleDataController');
router.get('/search-web/:searchValue/:pageNumber', searchGoogleWeb);
router.get('/search-images/:searchValue/:pageNumber', searchGoogleImages);
router.post('/search/add', storeSearchData);
router.get('/search/delete/:id', deleteStoredData);
router.get('/search/fetch/data', fetchGoogleData);

module.exports = router;
