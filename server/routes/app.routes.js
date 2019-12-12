const express = require('express');
const router = express.Router();
let fetchCtrl = require('../api/fetch.ctrl');

router.get('/fetchSlides', fetchCtrl.fetchSlides);
router.get('/fetchTopStores', fetchCtrl.fetchTopStores);
router.get('/fetchTopBlogs', fetchCtrl.fetchTopBlogs);
router.get('/fetchTopDeals', fetchCtrl.fetchTopDeals);
router.get('/fetchCoupons', fetchCtrl.fetchCoupons);
router.get('/singleStoreData', fetchCtrl.singleStoreData);
router.get('/fetchStores', fetchCtrl.fetchStores);
router.get('/fetchRandomStores', fetchCtrl.fetchRandomStores);
router.get('/fetchCategories', fetchCtrl.fetchCategories);
router.get('/searchQuery', fetchCtrl.searchQuery);
router.get('/fetchBlogsWithLimit', fetchCtrl.fetchBlogsWithLimit);
router.get('/fetchSingleBlog', fetchCtrl.fetchSingleBlog);


router.post('/increaseBlogViews', fetchCtrl.increaseBlogViews);

module.exports = router;