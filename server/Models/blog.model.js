let mongoose = require('mongoose');

let blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    shortDes: { type: String, required: true },
    longDes: { type: String, required: true },
    img: { type: String, required: true },
    imgAlt: { type: String, required: true },
    views: { type: Number },
    metaTitle: { type: String, required: true },
    metaDes: { type: String, required: true },
    metaKeywords: { type: String, required: true },
    storeId: { type: String, required: true },
    featuredForHome: { type: Boolean, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Blog', blogSchema);