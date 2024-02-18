const DepositModels = require('../../../models/Deposit/DepositModels');
const userModels = require('../../../models/userModels');


const { ObjectId } = require('mongodb');
const { TransactionsDeposit } = require('../../../commonfile/Transactions/Transactions')

const AdminDepositall = async (req, res) => {
    try {

        const DepositAcceptArraySum = await DepositModels.aggregate([
            { $match: { Status: 1, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        const DepositRejectArraySum = await DepositModels.aggregate([
            { $match: { Status: 2, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        const DepositPendingArraySum = await DepositModels.aggregate([
            { $match: { Status: 0, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const DepositAcceptBalanceSum = parseFloat(`${DepositAcceptArraySum[0] ? DepositAcceptArraySum[0].sum : 0}`).toFixed(2);
        const DepositRejectBalanceSum = parseFloat(`${DepositRejectArraySum[0] ? DepositRejectArraySum[0].sum : 0}`).toFixed(2);
        const DepositPendingBalanceSum = parseFloat(`${DepositPendingArraySum[0] ? DepositPendingArraySum[0].sum : 0}`).toFixed(2);

        const data = await DepositModels.find();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length,
            DepositAcceptBalanceSum,
            DepositRejectBalanceSum,
            DepositPendingBalanceSum,

        });

    } catch (error) {
        console.log(error);
    }
};
const AdminDepositPending = async (req, res) => {
    try {

        const DepositPendingArraySum = await DepositModels.aggregate([
            { $match: { Status: 0, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const DepositPendingBalanceSum = parseFloat(`${DepositPendingArraySum[0] ? DepositPendingArraySum[0].sum : 0}`).toFixed(2);

        const data = await DepositModels.find({ Status: 0 });
        res.status(201).json({
            success: true,
            data: data,
            length: data.length,
            DepositPendingBalanceSum
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminDepositAccept = async (req, res) => {
    try {

        const DepositAcceptArraySum = await DepositModels.aggregate([
            { $match: { Status: 1, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const DepositAcceptBalanceSum = parseFloat(`${DepositAcceptArraySum[0] ? DepositAcceptArraySum[0].sum : 0}`).toFixed(2);

        const data = await DepositModels.find({ Status: 1 });
        res.status(201).json({
            success: true,
            data: data,
            length: data.length,
            DepositAcceptBalanceSum
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminDepositReject = async (req, res) => {
    try {


        const DepositRejectArraySum = await DepositModels.aggregate([
            { $match: { Status: 2, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const DepositRejectBalanceSum = parseFloat(`${DepositRejectArraySum[0] ? DepositRejectArraySum[0].sum : 0}`).toFixed(2);


        const data = await DepositModels.find({ Status: 2 });
        res.status(201).json({
            success: true,
            data: data,
            length: data.length,
            DepositRejectBalanceSum
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminDepositAcceptUpdate = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const data = await DepositModels.findOne(query);

        // Transactions function Call start
        TransactionsDeposit(data);
        // Transactions function Call end

        const results = await DepositModels.findByIdAndUpdate(query, { Status: 1 }, option);
        res.status(201).json({
            success: true,
            message: "Deposits accept successfully",
            data: results,
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminDepositRejectUpdate = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const results = await DepositModels.findByIdAndUpdate(query, { Status: 2 }, option);
        res.status(201).json({
            success: true,
            message: "Deposts reject successfully",
            data: results,
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminDepositRejectsum = async (req, res) => {
    try {
        // ObjectId('6599aec53bfcec4e90943ff2'),
        const results = await DepositModels.aggregate([
            { $match: { Status: 1, user_id: '655f050cc50ed357a73003c1' } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);

        const pending = await DepositModels.aggregate([
            { $match: { Status: 0, user_id: '655f050cc50ed357a73003c1' } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);

        const reject = await DepositModels.aggregate([
            { $match: { Status: 2, user_id: '655f050cc50ed357a73003c1' } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);

        const resultes = await DepositModels.aggregate([
            { $match: { Status: 1, user_id: '655f050cc50ed357a73003c1' } }
        ]);

        // const results = await DepositModels.aggregate([{$group:{_id:{}, sum:{$sum:"$Amount"}}}]);

        res.status(201).json({
            success: true,
            message: "Deposts reject successfully",
            data: resultes.length,
            sum: results
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminDepositSingleView = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const results = await DepositModels.findOne(query);


        res.status(201).json({
            success: true,
            message: "Deposts  successfully",
            data: results,

        });

    } catch (error) {
        console.log(error);
    }
};

const AdminDepositDepositHistoryView = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { user_id: old_id };

        const DepositAcceptArraySum = await DepositModels.aggregate([
            { $match: { Status: 1, user_id: old_id } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);
        const DepositRejectArraySum = await DepositModels.aggregate([
            { $match: { Status: 2, user_id: old_id } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);
        const DepositPendingArraySum = await DepositModels.aggregate([
            { $match: { Status: 0, user_id: old_id } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);

        const DepositAcceptBalanceSum = parseFloat(`${DepositAcceptArraySum[0] ? DepositAcceptArraySum[0].sum : 0}`).toFixed(2);
        const DepositRejectBalanceSum = parseFloat(`${DepositRejectArraySum[0] ? DepositRejectArraySum[0].sum : 0}`).toFixed(2);
        const DepositPendingBalanceSum = parseFloat(`${DepositPendingArraySum[0] ? DepositPendingArraySum[0].sum : 0}`).toFixed(2);

        const results = await DepositModels.find(query);


        res.status(201).json({
            success: true,
            message: "Deposts  successfully",
            data: results,
            DepositAcceptBalanceSum,
            DepositRejectBalanceSum,
            DepositPendingBalanceSum
        });

    } catch (error) {
        console.log(error);
    }
};



module.exports = { AdminDepositall, AdminDepositPending, AdminDepositAccept, AdminDepositReject, AdminDepositAcceptUpdate, AdminDepositRejectUpdate, AdminDepositRejectsum, AdminDepositSingleView, AdminDepositDepositHistoryView };
