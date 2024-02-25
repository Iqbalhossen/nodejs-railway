const TradeLogModels = require('../../../models/TradeLog/TradeLogModels');

const { ObjectId } = require('mongodb');

const AdminUserTradeLogView = async (req, res) => {
    try { 
        let { page, limit } = req.query;
        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const old_id = req.params.id;
        const query = { user_id: old_id };    
        const data = await TradeLogModels.find(query).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await TradeLogModels.find(query);
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data: data,
            page: page,
            limit: limit,
            pageCount
        });


    } catch (error) {
        console.log(error);
    }
};


const AdminUserTradeLogWinView = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { user_id: old_id,  Result:'Win'};    
        const data = await TradeLogModels.find(query);
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminUserTradeLogLossView = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { user_id: old_id,  Result:'Loss'};    
        const data = await TradeLogModels.find(query);
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminUserTradeLogDrawView = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { user_id: old_id,  Result:'Draw'};    
        const data = await TradeLogModels.find(query);
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};







module.exports = { AdminUserTradeLogView, AdminUserTradeLogWinView, AdminUserTradeLogLossView, AdminUserTradeLogDrawView };
