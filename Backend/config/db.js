const mongoose = require('mongoose');
const config = require('./config');
// mongodb://localhost:27017/

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DataBase is Conected")
}).catch((err) => {
    console.error(err, "Something is wrong in Database")
});