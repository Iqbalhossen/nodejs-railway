const nodemailer = require('nodemailer');
require('dotenv').config();

const sendForgetPasswordEmail = async (email, name, id, token) => {
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
            subject: 'Reset Password in Gffex',
            html: '<h3> Hi! ' + name + '</h3>' + ' <p> Please Click Here <a href="http://66.29.142.198/reset/password/' + id + '/' + token + '"> Reset Password </a></p>'
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

const adminSendForgetPasswordEmail = async (email, name, id, token) => {
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
            subject: 'Reset Password in Gffex',
            html: '<h3> Hi! ' + name + '</h3>' + ' <p> Please Click Here <a href="http://localhost:3000/reset/password/' + id + '/' + token + '"> Reset Password </a></p>'
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





module.exports = { sendForgetPasswordEmail, adminSendForgetPasswordEmail};