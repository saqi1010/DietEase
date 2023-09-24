
const { Register } = require("../models");
const registerPostApi = (async (req, res) => {
    let data = new Register(req.body);
    let getAllData = await Register.find()
    let userId = 0
    if (getAllData.length > 0) {
        let lastItem = getAllData[getAllData.length - 1];
        userId = parseInt(lastItem.userId) + 1
    }
    data.userId = userId.toString();
    let result = await data.save();
    result = result.toObject();
    delete result._id;
    delete result.__v;
    res.send(result);
});

module.exports = { registerPostApi };