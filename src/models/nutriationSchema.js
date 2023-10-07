const mongoose = require('mongoose');
const NutirationSchema = new mongoose.Schema({
    topCategoryId: String,
    topCategoryName: String
}, { versionKey: false });
module.exports = { NutirationSchema };