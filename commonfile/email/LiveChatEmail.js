const nodemailer = require('nodemailer');
const AdminModels = require('../../models/Admin/AdminModels');
require('dotenv').config();
const AdminLiveChatEmail = async (ConversationData) => {


    try {
        const AdminData = await AdminModels.find({ live_chat: true });


        for (const data of AdminData) {
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
                    to: data?.email,
                    subject: "Live Chat New Message Gffex User",
                    html: "Live Chat New Message Gffex User. login user admin panel",
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


    } catch (error) {
        console.log(error);
    }




}





module.exports = { AdminLiveChatEmail, };