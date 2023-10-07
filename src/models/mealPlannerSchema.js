const mongoose = require('mongoose');
const MealPalnnerSchema = new mongoose.Schema({
    mealName: String,
    recipeId: String,
    mealPlannerData: [{
        subCategoryId: String,
        isSelected: Boolean
    }]
}, { versionKey: false });
module.exports = { MealPalnnerSchema };