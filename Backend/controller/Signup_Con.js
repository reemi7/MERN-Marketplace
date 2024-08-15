const User = require("../models/Signup_Model")
const mongoose = require('mongoose');
const Mail_Fun = require("./mailer_fun");
const jwt = require("jsonwebtoken");
const fs = require("fs")
let path = "E:\\Raheem Data\\projects\\Photo-Uploding\\Backend\\controller\\permission.json"

let data = JSON.parse(fs.readFileSync(path))


let token;
let refresh_token;
let Otp = require('../models/otp');
const { verify } = require("crypto");


const mailsender_Signup = async (req, res) => {
    let { name, email, password } = req.body;
    console.log(name, email, password)
    try {
        // const user_exist = await User.
        const otp = Math.floor(Math.random() * 7867)

        let emailcheck = await User.findOne({ email: email })


        if (emailcheck == null) {
            let Otp_collection = new Otp({
                code: otp,
                email: email,
            })
            await Otp_collection.save()

            let EamilData = new User({
                name, email, password,
            })
            await EamilData.save()

            Mail_Fun.sendMail(email, otp);
            res.status(200).json({
                message: "Data succedfully submit"
            })
        }
        else {
            res.status(400).json({
                message: "your all ready login"
            })
        }

    }
    catch (err) {
        console.error(err, "something is wrong in mailsender")
        res.status(200).json({
            message: "Data succedfully submit"
        })
    }
}
const Login = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        let Check_data = await User.find({ password: password, email: email })
        // console.log(Check_data)
        if (Check_data.length == 0) {
            res.status(400).json({ message: "enter valid email Password" })

        }
        else {
            if (Check_data[0].verify == true) {
                if (Check_data[0].roll != null) {
                    const permission_fields = data[0].Admin
                    // console.log(permission_fields)
                    const permission_add = await User.findOneAndUpdate({ _id: Check_data[0]._id }, { $set: { permission: [permission_fields] } }, { new: true })
                    // console.log(permission_add)
                }
                // console.log("else")
                const userId = Check_data[0]._id;
                const userName = Check_data[0].name;
                const user_roll = Check_data[0].roll;
                const roll = user_roll;
                let status_code;
                if (user_roll != null) {
                    status_code = 201
                }
                else {
                    status_code = 200
                }
                try {
                    //Creating jwt token
                    token = jwt.sign(
                        {
                            userId: userId,
                            name: userName,
                            roll: roll,
                        },
                        "abdulraheem",
                        // { expiresIn: "60s" }
                    );
                    refresh_token = jwt.sign({
                        userId: userId,
                        name: userName,
                        roll: roll,
                    },
                        "abdulraheem",
                        { expiresIn: "1d" })
                } catch (err) {
                    console.log(err);
                    const error = new Error("Error! Something went wrong.");
                    return next(error);
                }
                res.status(status_code).json({
                    success: true,
                    data: {
                        userId: userId,
                        name: userName,
                        token: token,
                        Refresh_token: refresh_token,
                        message: "data succesfully store"
                    }
                }
                )

            }

            else {
                res.status(400).json({
                    message: "your are not varified user"
                })
            }


        }


    } catch (error) {
        console.error(error, "somthing wrong in login")
        res.status(500).json("server is not running")

    }
}
const Verify = async (req, res) => {
    try {
        let { email, otp } = req.body;
        // console.log(otp,email)
        let Check_data = await Otp.findOne({ code: otp })
        let email_check = await Otp.findOne({ email: email })

        if (Check_data == null) {
            res.status(400).send("Your otp Is not exixt")
        }
        else if (email_check == "") {
            res.status(400).send("enter valid email ")
        }
        else if (email_check == null) {
            res.status(400).send("email is not exist")
        }
        else if (email_check == "" && Check_data == "") {
            res.status(400).json("User is not Verify")
        }
        else {
            let data_collect = await Otp.findByIdAndDelete({ _id: email_check._id, }, { new: true });


            if (data_collect) {
                let verify_veriable = true;
                let updateVerify = await User.findOneAndUpdate({ email: email }, { verify: verify_veriable })
                res.status(200).json({ message: "you are Valid user" })
                // res.redirect("/home")
            }
            else {
                res.status(400).json({ message: "you are valid user" })
            }
        }


    } catch (error) {
        console.error(error, "somthing wrong in verify")
    }
}
module.exports = { mailsender_Signup, Login, Verify }