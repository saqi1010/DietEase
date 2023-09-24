const mongoose = require('mongoose');
const databaseDetail = {
    host: 'localhost',
    port: 27017,
    dbName: 'Gym',
};
mongoose.connect(`mongodb://${databaseDetail.host}:${databaseDetail.port}/${databaseDetail?.dbName}`)