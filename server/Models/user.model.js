let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    userName: { type: String, required: true, index: true, unique: true },
    userPass: { type: String, required: true, minlength: 6, maxLength: 14 },
    admin: { type: Boolean, required: true }
});

module.exports = mongoose.model('User', userSchema);