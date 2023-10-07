const mongoose = require('mongoose');
const SubCategoryMealSchema = new mongoose.Schema({
    recipeId: String,
    mealName: String,
    subCategoryData: [{
        subCategoryId: String,
        isSelected: Boolean
    }]
}, { versionKey: false });
module.exports = { SubCategoryMealSchema };

