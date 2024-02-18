const SupportTicketsModels = require('../../../models/SupportTickets/SupportTicketsModels');
const SupportMessagesModels = require('../../../models/SupportTickets/SupportMessagesModels');
const SupportAttachmentsModels = require('../../../models/SupportTickets/SupportAttachmentsModels');
const userModels = require('../../../models/userModels');
const { SupportMessagesStore } = require('../../../commonfile/SupportTickets/SupportTickets');

const { ObjectId } = require('mongodb');

const UserSupportTicketsStore = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const Userquery = { _id: new ObjectId(id) };

        const UserFind = await userModels.findOne(Userquery);

        function RandomTransaction(length) {
            let result = '';
            const characters = '0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }

        const storeData = {
            user_id: UserFind?._id,
            name: UserFind?.name,
            email: data?.email,
            ticket: RandomTransaction(6),
            subject: data?.subject,
            priority: data?.priority,
            last_reply: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
        }

        const resuls = await SupportTicketsModels.create(storeData);

        SupportMessagesStore(data, resuls?._id, req.file);

        res.status(201).json({
            success: true,
            message: "New Ticket successfull",
            data: storeData,
        });
    } catch (error) {
        console.log(error);
    }
};


const UserSupportTicketsView = async (req, res) => {
    try {
        const id = req.params.id;
        const resuls = await SupportTicketsModels.find({ user_id: id }).sort('-created_at');

        res.status(201).json({
            success: true,
            data: resuls,
        });
    } catch (error) {
        console.log(error);
    }
};



const UserSupportTicketsViewById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const resuls = await SupportTicketsModels.findOne(query);

        res.status(201).json({
            success: true,
            data: resuls,
        });
    } catch (error) {
        console.log(error);
    }
};



const UserSupportTicketsReplay = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const option = { upsert: true };

        const findSupportMessages = await SupportMessagesModels.findOne({support_ticket_id:id}).sort('-created_at');
        const findSupportTickets = await SupportTicketsModels.findOne(query).sort('-created_at');

        if(findSupportMessages?.admin_id !== null && findSupportTickets.status !== 3){
              await SupportTicketsModels.findByIdAndUpdate(query, { status: 2 }, option);
        }
        if( findSupportTickets.status === 3){
              await SupportTicketsModels.findByIdAndUpdate(query, { status: 0 }, option);
        }
        SupportMessagesStore(data, id, req.file);

        res.status(201).json({
            success: true,
            message: "Ticket reply successfull",
            data: data,
        });
    } catch (error) {
        console.log(error);
    }
};




const UserSupportTicketsMessageView = async (req, res) => {
    try {
        const id = req.params.id;

        const results = await SupportMessagesModels.find({support_ticket_id:id});

        res.status(201).json({
            success: true,
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const UserSupportTicketsFileiew = async (req, res) => {
    try {
        const id = req.params.id;

        const results = await SupportAttachmentsModels.findOne({support_message_id:id});

        res.status(201).json({
            success: true,
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};







module.exports = { UserSupportTicketsStore, UserSupportTicketsView, UserSupportTicketsViewById, UserSupportTicketsReplay, UserSupportTicketsMessageView, UserSupportTicketsFileiew, };
