let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
let Coupon = require('../Models/coupon.model');
let Blog = require('../Models/blog.model');
let Slider = require('../Models/slide.model');
let resHandler = require('../utils/responseHandler');

module.exports = {
    fetchSlides: fetchSlides,
    fetchTopStores: fetchTopStores,
    fetchTopBlogs: fetchTopBlogs,
    fetchTopDeals: fetchTopDeals,
    fetchCoupons: fetchCoupons,
    singleStoreData: singleStoreData,
    fetchStores: fetchStores,
    fetchRandomStores: fetchRandomStores,
    fetchCategories: fetchCategories,
    searchQuery: searchQuery,
    fetchBlogsWithLimit: fetchBlogsWithLimit,
    fetchSingleBlog: fetchSingleBlog,
    increaseBlogViews: increaseBlogViews
};

function fetchSlides(req, res) {
    Slider.find({}, 'img', function (err, slides) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!slides) res.json(resHandler.respondError("Unable to fetch slides at the moment", -3));
        else res.json(resHandler.respondSuccess(slides, "Slides fetched successfully", 2));
    })
    // Category.
    //     find({}).
    //     skip(Number(req.query.skipNo)).
    //     limit(Number(req.query.limitNo)).
    //     exec(function (err, categories) {
    //         if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    //         else {
    //             if (categories.length) res.json(resHandler.respondSuccess(categories, "Categories fetched successfully", 2));
    //             else res.json(resHandler.respondError("Unable to fetch categories", -3));
    //         }
    //     });
}

function fetchTopStores(req, res) {
    Store.
        find({}, 'img').
        limit(Number(req.query.limitNo)).
        exec(function (err, stores) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (stores.length) res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
                else res.json(resHandler.respondError("Unable to fetch Stores at the moment", -3));
            }
        });
}
function fetchTopBlogs(req, res) {
    Blog.
        find({}, 'title img').
        limit(Number(req.query.limitNo)).
        exec(function (err, blogs) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (blogs.length) res.json(resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2));
                else res.json(resHandler.respondError("Unable to fetch Blogs at the moment", -3));
            }
        });
}

function fetchTopDeals(req, res) {
    var today = new Date();
    Coupon.
        find({ expDate: { $gte: today } }).
        limit(Number(req.query.limitNo)).
        exec(function (err, deals) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (deals) res.json(resHandler.respondSuccess(deals, "Deals fetched successfully", 2));
                else res.json(resHandler.respondError("Can't fetch deals at the moment", -3));
            }
        });
    // Store.findById(req.query._id, function (err, store) {
    //     if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    //     else if (store.length) res.json(resHandler.respondError("No such Store at the moment", -3));
    //     else res.json(resHandler.respondSuccess(store, "", 2));
    // })
}
function fetchCoupons(req, res) {
    Coupon.
        find({ storeId: req.query._id }).
        exec(function (err, coupons) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (coupons) res.json(resHandler.respondSuccess(coupons, "Coupons fetched successfully", 2));
                else res.json(resHandler.respondError("No coupons in this Store", -3));
            }
        });
}
function singleStoreData(req, res) {
    Store.find({ _id: req.query._id }, 'img shortDes categoryRef name', function (err, store) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!store) res.json(resHandler.respondError("Unable to fetch Store Image at the moment", -3));
        else res.json(resHandler.respondSuccess(store, "Store image fetched successfully", 2));
    })
}
function fetchStores(req, res) {
    Store.find({ categoryRef: req.query._id }, 'name img', function (err, stores) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!stores) res.json(resHandler.respondError("Unable to fetch Stores at the moment", -3));
        else res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
    })
}
function fetchCategories(req, res) {
    Category.find({}, 'name', function (err, categories) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!categories) res.json(resHandler.respondError("Unable to fetch categories at the moment", -3));
        else res.json(resHandler.respondSuccess(categories, "Categories fetched successfully", 2));
    })
}
function fetchRandomStores(req, res) {
    Store.
        aggregate([{ $sample: { size: 20 } }, { $project: { name: 1, img: 1, shortDes: 1 } }]).
        exec(function (err, stores) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else if (!stores) res.json(resHandler.respondError("Unable to fetch Stores at the moment", -3));
            else res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
        });
}
function searchQuery(req, res) {
    var regex = new RegExp(req.query["quer"], 'i');
    Store.
        find({ name: regex }, { name: req.query.quer, img: "" }).
        limit(Number(req.query.limitNo)).
        exec(function (err, stores) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (stores.length) res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
                else res.json(resHandler.respondError("Can't fetch Stores at the moment", -3));
            }
        });
}
function fetchBlogsWithLimit(req, res) {
    Blog.
        find({}, 'title img shortDes views CreatedAt').
        skip(Number(req.query.skipNo)).
        limit(Number(req.query.limitNo)).
        exec(function (err, blogs) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (blogs.length) res.json(resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2));
                else res.json(resHandler.respondError("Can't fetch Blogs at the moment", -3));
            }
        });
}
function fetchSingleBlog(req, res) {
    Blog.
        find({ _id: req.query._id }, function (err, blog) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else if (!blog) res.json(resHandler.respondError("Unable to fetch blog at the moment", -3));
            else res.json(resHandler.respondSuccess(blog, "Blog fetched successfully", 2));
        })
}
function increaseBlogViews(req, res) {
    Blog.findOneAndUpdate({ _id: req.body.id }, { $inc: { 'views': 1 } }).exec(function (err, blogs) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else {
            if (blogs.length) res.json(resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2));
            else res.json(resHandler.respondError("Can't fetch Blogs at the moment", -3));
        }
    });
}