const express = require("express");
const app = express()
// const config = require("config");
// const session = require('express-session');
// const passport = require("passport");
// const mongoose = require('mongoose');


const dotenv = require("dotenv");
dotenv.config()

// const config = require('./config/config');
// const Port = config.app.port || 3000;

const adminRoute = require("./routers/adminroutes")

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Routers = require("./routers/UserProfile_router");

app.use("/app", Routers.Routes)
app.use("/app", adminRoute.adminRoutes)

app.use('/upload', express.static('upload'));


module.exports = {app}


