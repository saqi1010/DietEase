const express = require('express');
const config = require('../../config/database');
const bodyParser = require('body-parser');
const multer = require('multer');
const { registerPostApi, sendOtpWithPhonNumber, verifyOtp, sendDummy,
    uploadProfileImage, dummyCheckApi, topCategoryListing, subCategoryListing } = require('../controllers/userController');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(uploadProfileImage);
// register Api
app.post('/register', registerPostApi);
// register Api
app.post('/send-otp', sendOtpWithPhonNumber);
// register Api 
app.post('/verify-otp', verifyOtp);
// post Profile Image Api


app.post('/ImageUpload', (req, res) => {
    uploadProfileImage(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send('File uploaded successfully');
    });
});


app.get('/topCategory', topCategoryListing)

app.get('/subCategory', subCategoryListing)

// app.post('/userId/:userId/t',subCategory)





// Dummy check
app.post('/dummy', dummyCheckApi);



// app.get("/seacrch/:key", usernameGetApi);


module.exports = { app }
