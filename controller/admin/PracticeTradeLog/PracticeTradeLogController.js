const PracticeTradeLogModels = require('../../../models/PracticeTradeLog/PracticeTradeLogModels');
const { ObjectId } = require('mongodb');

const AdminPracticeTradeLogAll = async (req, res) => {
    try {
        const data = await PracticeTradeLogModels.find();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminPracticeTradeLogWin = async (req, res) => {
    try {
        const data = await PracticeTradeLogModels.find({Result:'Win'});
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};



const AdminPracticeTradeLogLoss = async (req, res) => {
    try {
        const data = await PracticeTradeLogModels.find({Result:'Loss'});
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminPracticeTradeLogDraw = async (req, res) => {
    try {
        const data = await PracticeTradeLogModels.find({Result:'Draw'});
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};







module.exports = { AdminPracticeTradeLogAll, AdminPracticeTradeLogWin, AdminPracticeTradeLogLoss, AdminPracticeTradeLogDraw };
