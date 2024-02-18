const nodemailer = require('nodemailer');
require('dotenv').config();

const sendVerifyEmail = async (email, codeNumber) => {
    // console.log(codeNumber)
    try {


        const transpoter = nodemailer.createTransport({

            port: 587,
            host: "smtp.gmail.com",
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Account Verficaition code ',
            html: ' <p> your code '+ codeNumber +' </p>'
        }

        transpoter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                // console.log('email send', info.response);
            }
        })


    } catch (error) {
        console.log(error);
    }





}





module.exports = { sendVerifyEmail, };