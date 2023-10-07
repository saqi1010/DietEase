
const { Register, TopCategory, SubCategory, Nutrient, MealCategory, MealSubCategory, MealPlanner } = require("../models");
const twilio = require('twilio');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { escape } = require("querystring");
const { warn } = require("console");
// token genrator 

const jwtSecret = 'sdjgfsdgfgdiweutrispvfwersgfjgsdjgf3453423434'
const accountSid = 'AC7c7d5d7b026fa945574266b97e9a2317';
const authToken = '977dd071ee95e3870d20ffec771eeec4';
const twilioPhoneNumber = '+13342342776';
const client = twilio(accountSid, authToken);


const sendOTP = (to, otp) => {
    return client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: twilioPhoneNumber,
        to: `+91${to}`
    });
};

const generateToken = (phoneNumber) => {
    return jwt.sign({ phoneNumber }, jwtSecret, { expiresIn: '1h' }); // Token expires in 10 minutes
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};




// const API_KEY = 'ewiqj3RGAW61ktoEhMv8InYlFOXagf5zQNcVbC7SZLH90UsKdxjkv2gqxCGEb5ZdywYDa1nSe7JtcVON';
// const sendSMS = async (to, message) => {
//     console.log('--->>', to, message)
//     const response = await fast2sms.sendMessage({ authorization: API_KEY, message, numbers: [to] });
//     return response;
// };

const OTP = generateOTP();
//   

const registerPostApi = (async (req, res) => {
    let data = new Register({ ...req.body, imageName: '' });
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

const updateProfilePutApi = (async (req, res) => {
    const userId = req.params.userId;
    try {
        let data = await Register.findOne({ userId });
        if (!data) {
            return res.status(404).send({ message: 'User not found' });
        }
        data.userName = req.body?.userName || data.userName;
        data.phoneNumber = req.body?.phoneNumber || data.phoneNumber;
        data.email = req.body?.email || data.email;
        data.password = req.body?.password || data.password;
        data.dateOfBirth = req.body?.dateOfBirth || data.dateOfBirth;
        let result = await data.save();
        result = result.toObject();
        delete result._id;
        delete result.__v;
        res.send(result);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: 'Internal Server Error' });
    }
});




const sendOtpWithPhonNumber = (async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        await sendOTP(phoneNumber, OTP);
        console.log('1')
        const token = generateToken(phoneNumber);
        console.log('2', token)
        res.json({ success: true, message: 'OTP sent successfully', token });
    } catch (error) {

        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

const verifyOtp = ((req, res) => {
    const { otp, token } = req.body;
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const { phoneNumber } = decoded;
        if (otp == OTP) { // Replace with your actual OTP validation logic
            res.json({ success: true, message: 'OTP verified successfully' });
        } else {
            res.json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
const updateImageName = async (userId, imageName, res) => {
    console.warn("Check", userId, imageName, res);
    res.status(500).json({ success: false, message: 'Error uploading image', error: error.message });
    // try {
    //     const updatedUser = await Register.findOneAndUpdate({ userId }, { image: imageName }, { new: true });
    //     await updatedUser.save();
    // } catch (error) {
    //     res.status(500).json({ success: false, message: 'Error uploading image', error: error.message });
}

const uploadProfileImage = (requset, response) => {
    console.warn("1====>", requset);
    let fileImageName = ''
    multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                const imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
                cb(null, imageName);
                fileImageName = imageName
            }
        })
    }).single("file");
    // updateImageName(requset.params.userId, fileImageName, response);
}


const userImageUpload = (async (req, res) => {
    try {
        const userId = req.params.userId;
        // console.warn("=======>>", userId);
    } catch (error) {
        // res.status(500).send({ message: 'Internal Server Error' });
    }
})

const getImageApi = (async (req, res) => {
    const imageName = req.params.imageName;
    console.log('imageName', imageName)
    res.sendFile(path.join(__dirname, 'uploads/', imageName));
});



const topCategoryListing = (async (req, res) => {
    let topCategoryAllData = await TopCategory.find();
    console.log(topCategoryAllData)
    topCategoryAllData = topCategoryAllData.map(item => {
        const { _id, ...rest } = item.toObject();
        return rest;
    });
    res.send(topCategoryAllData);
});

const subCategoryListing = (async (req, res) => {
    let topCategoryAllData = await SubCategory.find();
    console.log(topCategoryAllData)
    topCategoryAllData = topCategoryAllData.map(item => {
        const { _id, ...rest } = item.toObject();
        return rest;
    });
    res.send(topCategoryAllData);
});

const updateCategorySelection = (async (req, res) => {
    const { userId, subCategoryId, isSelected } = req.body;
    try {
        const nutrient = await Nutrient.findOne({ userId });
        if (!nutrient) {
            return res.status(404).json({ message: "User not found." });
        }
        const subCategory = nutrient.subCategoryData.find(item => item.subCategoryId == subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ message: "SubCategory not found." });
        }
        subCategory.isSelected = isSelected;
        await nutrient.save();
        res.json({ message: "Selection updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// Meal Planner


const topCategoryMealsListing = (async (req, res) => {
    let topCategoryAllData = await MealCategory.find();
    console.log(topCategoryAllData)
    topCategoryAllData = topCategoryAllData.map(item => {
        const { _id, ...rest } = item.toObject();
        return rest;
    });
    res.send(topCategoryAllData);
});

const subCategoryMealsListing = (async (req, res) => {
    let topCategoryAllData = await MealCategory.find();
    topCategoryAllData = topCategoryAllData.map(item => {
        const { _id, ...rest } = item.toObject();
        return rest;
    });
    res.send(topCategoryAllData);
});



const postMealSubCategory = (async (req, res) => {
    const { recipeId, subCategoryId, isSelected } = req.body;
    try {
        const nutrient = await MealSubCategory.findOne({ recipeId });
        if (!nutrient) {
            return res.status(404).json({ message: "Recipe not found." });
        }
        const subCategory = nutrient.subCategoryData.find(item => item.subCategoryId == subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ message: "SubCategory not found." });
        }
        subCategory.isSelected = isSelected;
        const otherCollectionDoc = await MealPlanner.findOne({ recipeId });
        if (!otherCollectionDoc) {
            return res.status(404).json({ message: "Recipe not found in other collection." });
        }
        otherCollectionDoc.mealPlannerData.push(subCategory);
        await nutrient.save()
        await otherCollectionDoc.save();
        res.json({ message: "Selection updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


const checkApi = (async (req, res) => {
    let userName = req.body.userName
    let password = req.body.password
    const getAllData = await Register.findOne({ userName, password });
    if (getAllData?.userName == userName && getAllData?.password == password) {
        res.send(getAllData);
    } else {
        return res.status(500).send("Username or password not exists.");
    }
});


const getDatByMobileNumber = (async (req, res) => {
    let phoneNumber = req.body.phoneNumber
    const getUserDetailWithMobileNumber = await Register.findOne({ phoneNumber });
    if (getUserDetailWithMobileNumber?.phoneNumber == phoneNumber) {
        res.send(getUserDetailWithMobileNumber);
    } else {
        return res.status(500).send("User not exist");
    }
});
const getDataByEmailId = (async (req, res) => {
    let email = req.body.email
    const getUserDetailWithEmailr = await Register.findOne({ email });
    if (getUserDetailWithEmailr?.email == email) {
        res.send(getUserDetailWithEmailr);
    } else {
        return res.status(500).send("User not exist");
    }
});




const dummyCheckApi = ((req, res) => {
    res.json({ success: true, message: 'successfully' });
});





module.exports = {
    registerPostApi, sendOtpWithPhonNumber, verifyOtp, uploadProfileImage, dummyCheckApi, topCategoryListing, subCategoryListing, updateCategorySelection, updateProfilePutApi,
    topCategoryMealsListing, subCategoryMealsListing, postMealSubCategory, checkApi, getDatByMobileNumber, getDataByEmailId, getImageApi, userImageUpload
};
