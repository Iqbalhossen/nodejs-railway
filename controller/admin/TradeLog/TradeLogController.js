const TradeLogModels = require('../../../models/TradeLog/TradeLogModels');

const { ObjectId } = require('mongodb');

const AdminTradeLogAll = async (req, res) => {
    try {
        const data = await TradeLogModels.find();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminTradeLogWin = async (req, res) => {
    try {
        const data = await TradeLogModels.find({Result:'Win'});
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};



const AdminTradeLogLoss = async (req, res) => {
    try {
        const data = await TradeLogModels.find({Result:'Loss'});
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminTradeLogDraw = async (req, res) => {
    try {
        const data = await TradeLogModels.find({Result:'Draw'});
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};







module.exports = { AdminTradeLogAll, AdminTradeLogWin, AdminTradeLogLoss, AdminTradeLogDraw };
