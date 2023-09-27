const { ProfileSchema } = require("./profileSchema");
const { RegisterSchema } = require("./registerSchema");
const { TopCategorySchema } = require("./topCategorySchema");

const mongoose = require('mongoose');
const Register = mongoose.model('Register', RegisterSchema);
const Profile = mongoose.model('Profile', ProfileSchema);
const TopCategory = mongoose.model('TopCategory', TopCategorySchema);

module.exports = { Register, Profile, TopCategory };
