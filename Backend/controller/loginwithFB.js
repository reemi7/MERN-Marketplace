// const passport = require("passport");
// const dotenv = require("dotenv");
// const strategy = require("passport-facebook");
// const userModel = require("../models/Signup_Model")

// const FacebookStrategy = strategy.Strategy;

// dotenv.config();
// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//     done(null, obj);
// });

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.FACEBOOK_CLIENT_ID,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//             callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//             profileFields: ["email", "name"]
//         },
//         async function (accessToken, refreshToken, profile, done) {
//             const { email, first_name, last_name } = profile._json;
//             console.log(accessToken,refreshToken,profile)
//             const user = await userModel.findOne({

//                 email,
//                 name: first_name,
//                 provider: "facebook"
//             })
//             if (!user) {
//                 const userData = new userModel({
//                     email,
//                     name: first_name,
//                     provider: "facebook"
//                 });
//                 await userData.save()
//                 return done(null,profile)
//             }
//             else{
//                 console.log("you are already exist")
//                 return done(null,profile)

//             }

            
//         }
//     )
// );