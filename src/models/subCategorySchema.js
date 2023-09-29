const mongoose = require('mongoose');
const SubCategorySchema = new mongoose.Schema({
    userId: Number,
    topCategoryId: Number,
    topCategoryName: String,
    // subCategoryData: [{
    //     subCategoryId: Number,
    //     subCategoryName: String,
    //     subCategoryImage: String,
    //     gram: Number,
    //     kCal: Number,
    //     protein: Number,
    //     carbs: Number,
    //     fats: Number,
    //     selected: Boolean
    // }]
}, { versionKey: false });
module.exports = { SubCategorySchema };