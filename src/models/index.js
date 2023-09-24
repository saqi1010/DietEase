const { ProfileSchema } = require("./profileSchema");
const { RegisterSchema } = require("./registerSchema");
const mongoose = require('mongoose');
const Register = mongoose.model('Register', RegisterSchema);
const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = { Register, Profile };
