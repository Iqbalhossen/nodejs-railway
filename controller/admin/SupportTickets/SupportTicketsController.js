const SupportTicketsModels = require('../../../models/SupportTickets/SupportTicketsModels');
const SupportMessagesModels = require('../../../models/SupportTickets/SupportMessagesModels');
const SupportAttachmentsModels = require('../../../models/SupportTickets/SupportAttachmentsModels');
const userModels = require('../../../models/userModels');
const { SupportFileStore } = require('../../../commonfile/SupportTickets/SupportTickets');
const sharp = require('sharp');
const fs = require('fs');

const { ObjectId } = require('mongodb');

const AdminSupportTicketsPending = async (req, res) => {
    try {

        const SupportTickets = await SupportTicketsModels.find({ status: 0 }).sort('-created_at');
        res.status(201).json({
            success: true,
            data: SupportTickets,
        });
    } catch (error) {
        console.log(error);
    }
};

const AdminSupportTicketsDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const SupportTickets = await SupportTicketsModels.findOne(query);
        const SupportTicketsMessage = await SupportMessagesModels.find({ support_ticket_id: id });
        res.status(201).json({
            success: true,
            SupportTickets: SupportTickets,
            SupportTicketsMessage: SupportTicketsMessage,
        });
    } catch (error) {
        console.log(error);
    }
};

const AdminSupportTicketsFile = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await SupportAttachmentsModels.findOne({ support_message_id: id });
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(error);
    }
};

const AdminSupportTicketsMessageStore = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const SupportTickets = await SupportTicketsModels.findOne(query);


        const findSupportMessages = await SupportMessagesModels.findOne({ support_ticket_id: id }).sort('-created_at');

        if (findSupportMessages?.admin_id === null) {
            await SupportTicketsModels.findByIdAndUpdate(query, { status: 1 }, option);
        }
        if (SupportTickets?.status === 3) {
            await SupportTicketsModels.findByIdAndUpdate(query, { status: 0 }, option);
        }

        const storeData = {
            support_ticket_id: id,
            admin_id: data?.admin_id,
            message: data?.message,
            created_at: new Date().toLocaleString(),
        }

        const results = await SupportMessagesModels.create(storeData);

        if (req.file) {
            SupportFileStore(results, req.file);
        }

        res.status(201).json({
            success: true,
            message: 'Ticket answered successfull',
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};



const AdminSupportTicketsMessageDelete = async (req, res) => {
    try {

        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const existsdata = await SupportAttachmentsModels.findOne({ support_message_id: id });
        if (existsdata?.attachment) {
            fs.unlinkSync(existsdata.attachment);
            const querySupportAttachments = { _id: new ObjectId(existsdata._id) };
            await SupportAttachmentsModels.findByIdAndDelete(querySupportAttachments);
        }

        const results = await SupportMessagesModels.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: 'Message delete successfull',
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};




const AdminSupportTicketsClose = async (req, res) => {
    try {

        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const option = { upsert: true };

        const data = await SupportTicketsModels.findByIdAndUpdate(query, { status: 3 }, option);

        res.status(201).json({
            success: true,
            message: 'Support Tickets Close successfull',
            data,
        });
    } catch (error) {
        console.log(error);
    }
};




const AdminSupportTicketsCloseView = async (req, res) => {
    try {
        const data = await SupportTicketsModels.find({ status: 3 }).sort('-created_at');
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(error);
    }
};



const AdminSupportTicketsAnsweredView = async (req, res) => {
    try {
        const data = await SupportTicketsModels.find({ status: 1 }).sort('-created_at');
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(error);
    }
};


const AdminSupportTicketsAllView = async (req, res) => {
    try {
        const data = await SupportTicketsModels.find().sort('-created_at');
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(error);
    }
};






module.exports = { AdminSupportTicketsPending, AdminSupportTicketsDetails, AdminSupportTicketsFile, AdminSupportTicketsMessageStore, AdminSupportTicketsMessageDelete, AdminSupportTicketsClose, AdminSupportTicketsCloseView, AdminSupportTicketsAnsweredView, AdminSupportTicketsAllView };
