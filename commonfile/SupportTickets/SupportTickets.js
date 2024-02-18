const SupportMessagesModels = require('../../models/SupportTickets/SupportMessagesModels');
const SupportAttachmentsModels = require('../../models/SupportTickets/SupportAttachmentsModels');
const { ObjectId } = require('mongodb');
const sharp = require('sharp');
const fs = require('fs');


const SupportFileStore = async (data, file) => {

    try {

        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/')
            }
        });
        const formatedName = file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(file.buffer).toFile(`./public/data/uploads/${fileName}`);

        const storeData = {
            support_message_id: data?._id,
            attachment: `public/data/uploads/${fileName}`,
            created_at: new Date().toLocaleString()
        }
        const resuls = await SupportAttachmentsModels.create(storeData);
    } catch (error) {
        console.log(error);
    }
}



const SupportMessagesStore = async (data, support_ticket_id, file) => {

    try {
        const storeData = {
            support_ticket_id: support_ticket_id,
            message: data?.message,
            created_at: new Date().toLocaleString(),
        }
        const MessagesResuls = await SupportMessagesModels.create(storeData);
        if (file) {
            SupportFileStore(MessagesResuls, file)
        }

    } catch (error) {
        console.log(error);
    }
}






module.exports = { SupportMessagesStore, SupportFileStore };