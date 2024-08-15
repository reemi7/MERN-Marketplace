const express = require("express");
const Routes = express.Router()
const User_Profile_Controller = require("../controller/UserProfile_con");
const Signup_login_con = require("../controller/Signup_Con")
const middleware = require("../middleware/Input_fields_check")
const home_con = require("../controller/Home");
const post_int_con = require("../controller/post_intg_con")
const fb_fun = require("../controller/fbsharepost")
const fb_acces = require("../middleware/fb_middle")
const passport = require("passport");
const refresh_token_Con = require("../controller/RefreshToken")

const socketdata = require("../controller/socketdata")


// const ImageDownloader = require("../controller/ImageDownload_fun")

Routes.post("/createpost", middleware.access, User_Profile_Controller.upload.single("photo"), User_Profile_Controller.CraetePost);
Routes.get("/createpost", middleware.access, User_Profile_Controller.validate);
Routes.post("/deletepost",middleware.access,home_con.post_delete)
Routes.post("/signup", middleware.Fields_check, Signup_login_con.mailsender_Signup);
Routes.post("/login", Signup_login_con.Login);
// Routes.get("/allpost",User_Profile_Controller.GetPost)
Routes.post("/verify", Signup_login_con.Verify);
Routes.get("/home", home_con.homePage);
Routes.post("/p",middleware.access, home_con.file);
Routes.post("/createcomment/:id", middleware.access, post_int_con.commentcreate)
Routes.patch("/updatecomment/:id", middleware.access, post_int_con.updateComment)
Routes.patch("/deletecomment/:id", middleware.access, post_int_con.deleteComment)
Routes.patch("/like/:id", middleware.access, post_int_con.likepost);

// Admin Route


// Routes.get("/fb/:id",fb_acces.fb_id,fb_fun)


//  F_B Login Routes Start 

Routes.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));

Routes.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/fail"
    })
);

Routes.get("/fail", (req, res) => {
    res.send("Failed attempt");
});

Routes.get("/", (req, res) => {
    res.send("Success");
});

Routes.post("/refreshtoken",middleware.access,refresh_token_Con.refresh_token_Con)
//  F_B Login Routes End


Routes.get("/",(req,res)=>{
    res.send("hllo")
})

Routes.get("/chat/:userId/:postOwnerId",socketdata)

// Routes.post("/downloadimage/:id",ImageDownloader.ImageDownloader)

module.exports = { Routes }



