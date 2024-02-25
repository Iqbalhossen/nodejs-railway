const PracticeTradeLogModels = require('../../../models/PracticeTradeLog/PracticeTradeLogModels');
const { ObjectId } = require('mongodb');

const AdminPracticeTradeLogAll = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;


        const data = await PracticeTradeLogModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await PracticeTradeLogModels.find();
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

const AdminPracticeTradeLogWin = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;


        const data = await PracticeTradeLogModels.find({ Result: 'Win' }).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await PracticeTradeLogModels.find({ Result: 'Win' });
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



const AdminPracticeTradeLogLoss = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;


        const data = await PracticeTradeLogModels.find({ Result: 'Loss' }).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await PracticeTradeLogModels.find({ Result: 'Loss' });
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

const AdminPracticeTradeLogDraw = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;


        const data = await PracticeTradeLogModels.find({ Result: 'Draw' }).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await PracticeTradeLogModels.find({ Result: 'Draw' });
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







module.exports = { AdminPracticeTradeLogAll, AdminPracticeTradeLogWin, AdminPracticeTradeLogLoss, AdminPracticeTradeLogDraw };
