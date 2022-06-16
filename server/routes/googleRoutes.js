const express = require('express');
const router = express.Router();
const {
  googleController,
  storeSearchDataController,
  fetchGoogleDataController,
  deleteGoogleDataController,
  storeUrlController
} = require('../controllers');

router.get('/search-web/:searchValue/:pageNumber', googleController.searchGoogleWeb);
router.get('/search-images/:searchValue/:pageNumber', googleController.searchGoogleImages);
router.post('/search/add', storeSearchDataController.storeSearchData);
router.get('/search/delete/:id', deleteGoogleDataController.deleteStoredData);
router.get('/search/fetch/data', fetchGoogleDataController.fetchGoogleData);

//  url 
  router.get('/search/add/url/:url', storeUrlController.storeUrls);
  router.get('/search/delete/url/:url', storeUrlController.deleteURLS);
  router.get('/search/allURL', storeUrlController.URLList);


module.exports = router;
