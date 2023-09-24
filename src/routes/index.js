const express = require('express');
const config = require('../../config/database');
const { registerPostApi } = require('../controllers/userController');
const { usernameGetApiApi } = require('../controllers/userController');

const app = express();
app.use(express.json());
// register Api
app.post('/register', registerPostApi);
// register Api
// app.post('/register', registerPostApi);

app.get("/seacrch/:key",usernameGetApi);
   

module.exports = { app }
