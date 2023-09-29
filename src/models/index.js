const { ProfileSchema } = require("./profileSchema");
const { RegisterSchema } = require("./registerSchema");
const { SubCategorySchema } = require("./subCategorySchema");
const { TopCategorySchema } = require("./topCategorySchema");

const mongoose = require('mongoose');
const SubCategory = mongoose.model('subcategory', SubCategorySchema);
const Register = mongoose.model('Register', RegisterSchema);
const Profile = mongoose.model('Profile', ProfileSchema);
const TopCategory = mongoose.model('topcategories', TopCategorySchema);


module.exports = { Register, Profile, TopCategory, SubCategory };
