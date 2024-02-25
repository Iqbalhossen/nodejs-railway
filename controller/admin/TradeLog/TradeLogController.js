const TradeLogModels = require('../../../models/TradeLog/TradeLogModels');

const { ObjectId } = require('mongodb');

const AdminTradeLogAll = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await TradeLogModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await TradeLogModels.find();
        const pageCount = Math.ceil(parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminTradeLogWin = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await TradeLogModels.find({ Result: 'Win' }).sort('-createdAt').skip(skip).limit(limit);
       const dataLength = await TradeLogModels.find({ Result: 'Win' });
        const pageCount = Math.ceil(parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount
        });


    } catch (error) {
        console.log(error);
    }
};



const AdminTradeLogLoss = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await TradeLogModels.find({ Result: 'Loss' }).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await TradeLogModels.find({ Result: 'Loss' });
        const pageCount = Math.ceil(parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount
        });



    } catch (error) {
        console.log(error);
    }
};

const AdminTradeLogDraw = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await TradeLogModels.find({ Result: 'Draw' }).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await TradeLogModels.find({ Result: 'Draw' });
        const pageCount = Math.ceil(parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount
        });

    } catch (error) {
        console.log(error);
    }
};







module.exports = { AdminTradeLogAll, AdminTradeLogWin, AdminTradeLogLoss, AdminTradeLogDraw };
