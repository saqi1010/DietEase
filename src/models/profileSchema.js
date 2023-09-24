const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    bio: String,
    profilePicture: String
}, { versionKey: false });
module.exports = { ProfileSchema };