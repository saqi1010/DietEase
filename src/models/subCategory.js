const mongoose = require('mongoose');
const nutrientSchema = new mongoose.Schema({
    topCategoryId: String,
    topCategoryName: String,
    subCategoryData: [{
        subCategoryId: String,
        isSelected: Boolean
    }],

}, { versionKey: false });
module.exports = { nutrientSchema };