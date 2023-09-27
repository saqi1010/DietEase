const mongoose = require('mongoose');
const TopCategorySchema = new mongoose.Schema({
    topCategoryName: String,
    topCategoryId: String,
}, { versionKey: false });
module.exports = { TopCategorySchema };