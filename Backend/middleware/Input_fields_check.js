const jwt = require("jsonwebtoken");


const Fields_check = (req, res, next) => {
    let { email, password } = req.body;
    if (!email) {
        res.send('Please Enter Your Email')
    }
    else if (!email.includes("@") && !email.includes(".")) {
        res.send("plz enter a valid email")
    }
    else if (!password) {
        res.status(400).send("Please enter your password")
    }
    next()
}

const otp_check = (req, res, next) => {
    let { email, otp } = req.body;
    if (!email && !otp) {
        res.status(400).send(enter)

    }
    else if (typeof otp !== Number) {
        res.status(400).send("enter valid type otp")
    }
    else if (!email) {
        res.status(400).send('enter your email ')
    }
    else if (!otp) {
        res.status(400).send('enter your  Otp')
    }
    else if (!email && !otp) {
        res.status(400).send('enter your email and Otp')

    }
    else {
        next()
    }
}

const access = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            res.status(400).json({
                success: false,
                message: "Error! You are not athentic user.",
            });
        }

        //Decoding the token
        else {

            const decodedToken = jwt.verify(token, "abdulraheem");
            // jwt.
            req.userId = decodedToken.userId
            // console.log(req.userId)
            const roll = decodedToken.roll
            // console.log(roll)
            next()
        }

    }
    catch (err) {
        // console.error(err)
        res.json({ error: 'you are not valid user' })
    }

};
module.exports = { Fields_check, access, otp_check }

