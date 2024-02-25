const ConversationModel = require('../../../models/Chat/ConversationModel');
const MessageModels = require('../../../models/Chat/Message');
const userModels = require('../../../models/userModels');
const { ObjectId } = require('mongodb');


const AdminAllConversationView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await ConversationModel.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await ConversationModel.find();
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount,
        });
    } catch (error) {
        console.log(error);
    }
};

const AdminConversationMessageView = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await MessageModels.find({conversationId:id});
        res.status(201).json({
            success: true,
            data,
           
        });

    } catch (error) {
        console.log(error);
    }
};


const AdminConversationView = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ConversationModel.find({adminId:id}).sort('-createdAt');
        res.status(201).json({
            success: true,
            data,
           
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminPendingLiveChatView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await ConversationModel.find({status:0}).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await ConversationModel.find({status:0});
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount,
        });

    } catch (error) {
        console.log(error);
    }
};


const AdminSingleLiveChatView = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const data = await ConversationModel.findOne(query);
        res.status(201).json({
            success: true,
            data,
           
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminSingleMessageView = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await MessageModels.findOne({conversationId:id}).sort('-createdAt');
        res.status(201).json({
            success: true,
            data,
           
        });

    } catch (error) {
        console.log(error);
    }
};
 
const AdminApprovedChating = async (req, res) => {
    try {
        const { id, adminId } = req.params;

        const query = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const data = await ConversationModel.findByIdAndUpdate(query, {adminId:adminId,  status: 1 }, option);

        res.status(201).json({
            success: true,
            message:"Live Chat approved",
            data,
           
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminCloseChating = async (req, res) => {
    try {
        const { id } = req.params;

        const query = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const data = await ConversationModel.findByIdAndUpdate(query, {adminId:null,  status: 2 }, option);

        res.status(201).json({
            success: true,
            message:"Live Chat Close",
            data,
           
        });

    } catch (error) {
        console.log(error);
    }
};




module.exports = {AdminConversationView, AdminPendingLiveChatView, AdminSingleLiveChatView, AdminSingleMessageView, AdminApprovedChating, AdminCloseChating, AdminAllConversationView, AdminConversationMessageView};
