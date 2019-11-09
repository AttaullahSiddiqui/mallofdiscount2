let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
let Coupon = require('../Models/coupon.model');
let Deal = require('../Models/deal.model');
let Blog = require('../Models/blog.model');
let Slider = require('../Models/slide.model');
let errHandler = require('../utils/errorHandler');
let resHandler = require('../utils/responseHandler');

module.exports = {
    authUser: authUser,
    verifyUserToken: verifyUserToken,
    registerUser: registerUser,
    createCategory: createCategory,
    addStore: addStore,
    addCoupon: addCoupon,
    addDeal: addDeal,
    addBlog: addBlog,
    addSlide: addSlide
};

function authUser(req, res) {
    if (!req.body.userPass || !req.body.userName) return res.respondError("Username & Password is required", -4);
    User.findOne({ userName: req.body.userName }, function (err, fetchedUser) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!fetchedUser) res.json(resHandler.respondError("Wrong Username or Password", -3));
        else {
            if (req.body.userPass == fetchedUser.userPass) {
                jwt.generateToken({ userID: fetchedUser._id }, function (jwtErr, jwtSuccess) {
                    if (jwtErr) {
                        res.json(resHandler.respondError("Unexpected Error", -1));
                    }
                    res.json(resHandler.respondSuccess(jwtSuccess, "User login successfully", 1));
                });
            } else res.json(resHandler.respondError("Wrong password", -3));
        }
    })
}
function verifyUserToken(req, res) {
    var token = req.body.token;
    if (!token) res.json(resHandler.respondError("Authorization token is required", -2));
    return jwt.verifyToken(token, function (err, data) {
        if (err) res.json(resHandler.respondError("Invalid token", -2));
        res.json(resHandler.respondSuccess(data, "Token is Valid", 1));
    })
}

function registerUser(req, res) {
    var newUser = new User({
        userName: req.body.userName,
        userPass: req.body.userPass,
        admin: req.body.admin
    });
    newUser.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "User account created successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}

function createCategory(req, res) {
    var newCategory = new Category({
        name: req.body.catName,
        slug: req.body.catSlug,
        metaTitle: req.body.catMetaTitle,
        metaDescription: req.body.catMetaDescription,
        metaKeywords: req.body.catMetaKeywords,
        featuredForHome: req.body.catFeatured,
    });
    newCategory.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "Category created successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}

function addStore(req, res) {
    var newStore = new Store({
        name: req.body.name,
        storeURL: req.body.storeURL,
        heading: req.body.heading,
        categoryRef: req.body.categoryRef,
        shortDes: req.body.shortDes,
        longDes: req.body.longDes,
        img: req.body.img,
        imgAlt: req.body.imgAlt,
        directUrl: req.body.directUrl,
        trackUrl: req.body.trackUrl,
        metaTitle: req.body.metaTitle,
        metaDes: req.body.metaDes,
        metaKeywords: req.body.metaKeywords,
        fb: req.body.fb,
        pin: req.body.pin,
        wik: req.body.wik,
        twit: req.body.twit,
        gplus: req.body.gplus,
        android: req.body.android,
        ios: req.body.ios,
        topStore: req.body.topStore,
        editorChoice: req.body.editorChoice
    });
    newStore.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "Store added successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}

function addCoupon(req, res) {
    Coupon.countDocuments({ storeId: req.body.storeId }, function (err, response) {
        if (err) {
            var error = errHandler.handle(err);
            res.json(resHandler.respondError(error[0], (error[1] || -1)));
        }
        if (!response) {
            req.body.sortNo = 1;
            addCouponCallback(req, res)
        }
        if (response) {
            req.body.sortNo = response + 1;
            addCouponCallback(req, res)
        }
    })
}
function addCouponCallback(req, res) {
    var newCoupon = new Coupon({
        offerBox: req.body.offerBox,
        offerDetail: req.body.offerDetail,
        trackingLink: req.body.trackingLink,
        expDate: req.body.expDate,
        activeStatus: req.body.activeStatus,
        code: req.body.code,
        storeId: req.body.storeId,
        featuredForHome: req.body.featuredForHome,
        trending: req.body.trending,
        newArrival: req.body.newArrival,
        sortNo: req.body.sortNo
    });
    newCoupon.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "Coupon added successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}
function addDeal(req, res) {
    var newDeal = new Deal({
        title: req.body.title,
        shortDes: req.body.shortDes,
        longDes: req.body.longDes,
        metaTitle: req.body.metaTitle,
        metaDes: req.body.metaDes
    });
    newDeal.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "Deal added successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}
function addBlog(req, res) {
    var newBlog = new Blog({
        title: req.body.title,
        shortDes: req.body.shortDes,
        longDes: req.body.longDes,
        img: req.body.img,
        imgAlt: req.body.imgAlt,
        metaTitle: req.body.metaTitle,
        metaDes: req.body.metaDes,
        metaKeywords: req.body.metaKeywords,
        storeId: req.body.storeId,
        featuredForHome: req.body.featuredForHome
    });
    newBlog.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "Blog added successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}
function addSlide(req, res) {
    Slider.
        find({ $and: [{ storeId: req.body.storeId }, { arrIndex: req.body.arrIndex }] }).
        exec(function (err, slide) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (slide.length) {
                    req.body._id = slide[0]._id;
                    updateSlide(req, res)
                }
                else addNewSlide(req, res)
            }
        });
}
function addNewSlide(req, res) {
    var newSlider = new Slider({
        link: req.body.link,
        img: req.body.img,
        storeId: req.body.storeId,
        arrIndex: req.body.arrIndex
    });
    newSlider.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "Slide added successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}
function updateSlide(req, res) {
    Slider.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!updatedNode) res.json(resHandler.respondError("Unknown error occured", -3));
        else res.json(resHandler.respondSuccess(updatedNode, "Slider updated successfully", 2));
    })
}