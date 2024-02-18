const nodemailer = require('nodemailer');
require('dotenv').config();
const SubscriberManagerEmail = async (data, email) => {
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
            subject: data?.subject,
            html: data?.body
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





module.exports = { SubscriberManagerEmail, };