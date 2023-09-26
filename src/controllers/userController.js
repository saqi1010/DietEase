
const { Register } = require("../models");
const twilio = require('twilio');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadProfileImage = multer({ storage }).single("file");




const dummyCheckApi = ((req, res) => {
    res.json({ success: true, message: 'successfully' });
});
// const uploadProfileImage = multer({ storage }).single("file");
// const uploadProfileImage = ((req, res) => {
//     try {
//         multer({
//             limits: {
//                 fileSize: 5 * 1024 * 1024,
//             },
//             storage: multer.diskStorage({
//                 destination: function (req, file, cb) {
//                     const dir = 'upload';
//                     if (!fs.existsSync(dir)) {
//                         fs.mkdirSync(dir);
//                     }
//                     cb(null, dir);
//                 },
//                 filename: function (req, file, cb) {
//                     cb(null, file.originalname)
//                 }
//             })
//         }).single("user_file")
//     } catch (error) {
//         console.error('error come in this image:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });






module.exports = { registerPostApi, sendOtpWithPhonNumber, verifyOtp, uploadProfileImage, dummyCheckApi };
