const User = require("../models/Signup_Model")

const jwt = require("jsonwebtoken");

let token ; 
let refresh_token;
let status_code ;

const refresh_token_Con = async(req,res)=>{
    try {


        const id  = req.userId;
        const findUser = await User.findById(id)
        if(findUser !==  null){
           let Userid =  findUser._id;
           let userName  = findUser.name;
           let User_roll  = findUser.roll;
           try {
            //Creating jwt token
            if (User_roll != null) {
                status_code = 201
            }
            else {
                status_code = 200
            }
            token = jwt.sign(
                {
                    userId: Userid,
                    name: userName,
                    roll: User_roll,
                },
                "abdulraheem",
                { expiresIn: "1h" }
            );
            refresh_token= jwt.sign({
                userId: Userid,
                name: userName,
                roll: User_roll,
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
                userId: Userid,
                name: userName,
                token: token,
                Refresh_token: refresh_token,
                message: "data succesfully store"
            }
        }
        )
        }
        else{
            console.log(err)
            res.status(400).json({
                success:false,
                message:"your are not attentic user"
            })
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Some error in refersh token"
        })
    }
} 


module.exports = {
    refresh_token_Con
}