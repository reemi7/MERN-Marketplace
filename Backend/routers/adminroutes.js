
const express = require("express");
const adminRoutes = express.Router()
const Admin_Portel = require('../controller/AdminPortel')

adminRoutes.post("/adminreadpost",Admin_Portel.admin_per)
adminRoutes.post("/admindeletepost",Admin_Portel.admin_per_del)
adminRoutes.post("/allusers",Admin_Portel.admin_userData)

module.exports = { adminRoutes }
