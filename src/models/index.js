const mongoose = require('mongoose');
const { ProfileSchema } = require("./profileSchema");
const { RegisterSchema } = require("./registerSchema");
const { SubCategorySchema } = require("./subCategorySchema");
const { TopCategorySchema } = require("./topCategorySchema");
const { nutrientSchema } = require('./subCategory');
const { SubCategoryMealSchema } = require('./subCategoryMealSchema');
const { TopCategoryMealSchema } = require('./topCategoryMealSchema');
const { MealPalnnerSchema } = require('./mealPlannerSchema');
const { NutirationSchema } = require('./nutriationSchema');

const SubCategory = mongoose.model('subcategory', SubCategorySchema);
const Register = mongoose.model('Register', RegisterSchema);
const Profile = mongoose.model('Profile', ProfileSchema);
const TopCategory = mongoose.model('topcategories', TopCategorySchema);
const Nutrient = mongoose.model('nutrients', nutrientSchema);
const MealCategory = mongoose.model('mealCategory', TopCategoryMealSchema);
const MealSubCategory = mongoose.model('subCategoryMeal', SubCategoryMealSchema);
const MealPlanner = mongoose.model('mealPlannerList', MealPalnnerSchema);
const Nutrition = mongoose.model('nutriation', NutirationSchema);


module.exports = { Register, Profile, TopCategory, SubCategory, Nutrient, MealCategory, MealSubCategory, MealPlanner, Nutrition };
