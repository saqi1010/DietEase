const mongoose = require('mongoose');
const SubCategorySchema = new mongoose.Schema({
    topCategoryName: String,
    topCategoryId: String,
}, { versionKey: false });
module.exports = { SubCategorySchema };