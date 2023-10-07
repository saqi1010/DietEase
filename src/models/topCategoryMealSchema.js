const mongoose = require('mongoose');
const TopCategoryMealSchema = new mongoose.Schema({
    mealName: String,
    recipeId: String,
}, { versionKey: false });
module.exports = { TopCategoryMealSchema };