const nodemailer = require('nodemailer')

const dotenv = require('dotenv');
dotenv.config();


const sendMail = (email,emailToken) => {
  const transporter = nodemailer.createTransport({
      service: "gmail",
      host:process.env.Node_Mailer_Host_Email,
      port: 587, 
      secure: false, 
      auth: {
        user: process.env.Node_Mailer_Host_Email,
        pass: process.env.Node_Mailer_Pass_key,
      },
  });

  const mailOptions = {
      from: process.env.Node_Mailer_Host_Email,
      to: `${email}`,
      subject: 'Please verify your email...',
      html:`<p>Hello, verify your email address by clicking on this</p>
      <br>
      <a href="http://localhost:5173/">Click here to verify and this your otp Code :${emailToken}</a>
      `
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else { 
        console.log(`Email sent :  ${email}` );
      }
  });
}

// module.exports = sendMail;

module.exports = {sendMail }