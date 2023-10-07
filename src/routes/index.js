const express = require('express');
const config = require('../../config/database');
const bodyParser = require('body-parser');
const multer = require('multer');
const { registerPostApi, sendOtpWithPhonNumber, verifyOtp, sendDummy,
    uploadProfileImage, dummyCheckApi, topCategoryListing, subCategoryListing, updateCategorySelection, updateProfilePutApi
    , topCategoryMealsListing, subCategoryMealsListing, postMealSubCategory, checkApi, getDatByMobileNumber, getDataByEmailId, getImageApi, userImageUpload } = require('../controllers/userController');
const { Nutrient } = require('../models');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(uploadProfileImage);



// /////////////////login Section/////////////////////////////////////////
// register Api
app.post('/register', registerPostApi);
// put Edit Profile Api
app.put('/editProfile/:userId', updateProfilePutApi);
// Send Otp  Api
app.post('/send-otp', sendOtpWithPhonNumber);
// register Api 
app.post('/verify-otp', verifyOtp);
// post Profile Image Api
// username and password check api 
app.post('/userNameAndPassowrdCheck', checkApi);
// get data with mobile number
app.post('/getUserDetailWithMobileNumber', getDatByMobileNumber);
// get data with eamil
app.post('/getUserDetailWithEmailId', getDataByEmailId);
// user Upload Image 
app.post('/ImageUpload/:userId', userImageUpload);
// get Image Api
app.get('/getImage/:imageName', getImageApi);
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// //////////// Diary Module ///////////////////////////////////////////////////////////////////////////////
app.get('/topCategory', topCategoryListing)

app.get('/subCategory', subCategoryListing)

app.post('/update_SubCategory', updateCategorySelection);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////Meal Planner //////////////////////////////////////////////

app.get('/meal', topCategoryMealsListing)

app.get('/subCategerMeal', subCategoryMealsListing)

app.post('/UpdateMeals', postMealSubCategory);

///////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////Recipe Api //////////////////////////////////////////////
// app.get("/nutrients", async (req, resp) => {
//     let data = await nutrients.find();
//     resp.send(data);
// });

// app.get("/search/:topCategoryName", async (req, resp) => {

//     let result = await nutrients.find(req.params);
//     resp.send(result)
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////



// Dummy check
app.post('/dummy', dummyCheckApi);
module.exports = { app }

