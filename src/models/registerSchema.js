const mongoose = require('mongoose');
const RegisterSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    phoneNumber: String,
    email: String,
    password: String,
    dateOfBirth: String,
    imageName: String
}, { versionKey: false });
module.exports = { RegisterSchema };