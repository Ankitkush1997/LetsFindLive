const express = require('express');
const router = express.Router();
const {
  deletePageDataController,
    updatePageDataController,
    addPageDataController,
    googleController,
    storeUrlController,
    getPageAllDataController,
} = require('../controllers');

// pages
router.get('/search-web/:searchValue/:pageNumber', googleController.searchGoogleWeb);
router.get('/search-images/:searchValue/:pageNumber', googleController.searchGoogleImages);

// add data to particular page 
router.post('/search/add', addPageDataController.storePageData);

// update data to particular page
router.post('/search/update', updatePageDataController.updatePageData);
// delete data to particular page
router.get('/search/delete', deletePageDataController.deleteStoredData);

// get all data for a particular page
router.get('/search/getUrlData/:pageName',getPageAllDataController.getPageData);


// add url on main page
  router.get('/search/add/url/:url', storeUrlController.storeUrls);

  // delete particular url from main page
  router.get('/search/delete/url/:url', storeUrlController.deleteURLS);
  
  // fetch all url from main page
  router.get('/search/allURL', storeUrlController.URLList);

// clone url on main page
router.get('/search/clone', storeUrlController.cloneURL);

module.exports = router;
