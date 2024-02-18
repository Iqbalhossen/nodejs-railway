const WithdrawalMethodsModels = require('../../../models/WithdrawalMethods/WithdrawalMethodsModels');
const WithdrawalModels = require('../../../models/Withdrawal/WithdrawalModels');
const userModels = require('../../../models/userModels');
const { ObjectId } = require('mongodb');
const { TransactionsWithdrawalReject } = require('../../../commonfile/Transactions/Transactions')

const AdminWithdrawalMethodsView = async (req, res) => {
    try {

        const data = await WithdrawalMethodsModels.find();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminWithdrawalMethodsAdd = async (req, res) => {
    try {
        const data = req.body;
        const storeData = { ...data, Status: 1 }
        const results = await WithdrawalMethodsModels.create(storeData);
        res.status(201).json({
            success: true,
            message: "Withdrawal Methods  add successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminWithdrawalMethodsInableDisable = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await WithdrawalMethodsModels.findOne(query);
        const option = { upsert: true };

        if (data?.Status === 0) {
            const status = { Status: 1 }
            const results = await WithdrawalMethodsModels.findByIdAndUpdate(query, status, option);
            res.status(201).json({
                success: true,
                message: "Enable successfully",
                data: results,
            });
        } else {
            const status = { Status: 0 }
            const results = await WithdrawalMethodsModels.findByIdAndUpdate(query, status, option);
            res.status(201).json({
                success: true,
                message: "Disabled successfully",
                data: results,
            });
        }


    } catch (error) {
        console.log(error);
    }
};
const AdminWithdrawalMethodsEdit = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await WithdrawalMethodsModels.findOne(query);
        res.status(201).json({
            success: true,
            message: "Withdrawal Methods Edit successfully",
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminWithdrawalMethodsUpdate = async (req, res) => {
    try {
        const data = req.body;
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const results = await WithdrawalMethodsModels.findByIdAndUpdate(query, data, option);
        res.status(201).json({
            success: true,
            message: "Withdrawal Methods Update successfully",
            data: results,
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminWithdrawalMethodsDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const results = await WithdrawalMethodsModels.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "Withdrawal Methods Delete successfully",
            data: results
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminWithdrawalSingleViewById = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const results = await WithdrawalModels.findOne(query);

        res.status(201).json({
            success: true,
            message: "Withdrawal data",
            data: results,

        });


    } catch (error) {
        console.log(error);
    }
};
const AdminWithdrawalAccept = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };     
        const option = { upsert: true };
   
        const results = await WithdrawalModels.findByIdAndUpdate(query, { Status: 1 }, option);

        res.status(201).json({
            success: true,
            message: "Withdrawal Approve successfull",
            data: results,

        });


    } catch (error) {
        console.log(error);
    }
};
const AdminWithdrawalReject = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };

        const UserWithdrawalFind = await WithdrawalModels.findOne(query);
   
        const results = await WithdrawalModels.findByIdAndUpdate(query, { Status: 2 }, option);
        if(results){
            TransactionsWithdrawalReject(UserWithdrawalFind);
        }

        res.status(201).json({
            success: true,
            message: "Withdrawal Reject successfull",
            data: results,

        });


    } catch (error) {
        console.log(error);
    }
};


const AdminWithdrawalAllView = async (req, res) => {
    try {

        const WithdrawalAcceptArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 1, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        const WithdrawalRejectArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 2, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        const WithdrawalPendingArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 0, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const WithdrawalAcceptSum = parseFloat(`${WithdrawalAcceptArraySum[0] ? WithdrawalAcceptArraySum[0].sum : 0}`).toFixed(2);
        const WithdrawalRejectSum = parseFloat(`${WithdrawalRejectArraySum[0] ? WithdrawalRejectArraySum[0].sum : 0}`).toFixed(2);
        const WithdrawalPendingSum = parseFloat(`${WithdrawalPendingArraySum[0] ? WithdrawalPendingArraySum[0].sum : 0}`).toFixed(2);

        const results = await WithdrawalModels.find();

        res.status(201).json({
            success: true,
            message: "Withdrawal data",
            data: results,
            WithdrawalAcceptSum: WithdrawalAcceptSum,
            WithdrawalRejectSum: WithdrawalRejectSum,
            WithdrawalPendingSum: WithdrawalPendingSum,
        });


    } catch (error) {
        console.log(error);
    }
};


const AdminWithdrawalPendingView = async (req, res) => {
    try {


        const WithdrawalPendingArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 0, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        
        const WithdrawalPendingSum = parseFloat(`${WithdrawalPendingArraySum[0] ? WithdrawalPendingArraySum[0].sum : 0}`).toFixed(2);

        const results = await WithdrawalModels.find({ Status: 0 });
        res.status(201).json({
            success: true,
            message: "Withdrawal data",
            data: results,
            length: results.length,
            WithdrawalPendingSum,
        });


    } catch (error) {
        console.log(error);
    }
};




const AdminWithdrawalAcceptView = async (req, res) => {
    try {


        const WithdrawalAcceptArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 1, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const WithdrawalAcceptSum = parseFloat(`${WithdrawalAcceptArraySum[0] ? WithdrawalAcceptArraySum[0].sum : 0}`).toFixed(2);

        const results = await WithdrawalModels.find({ Status: 1 });
        res.status(201).json({
            success: true,
            message: "Withdrawal data",
            data: results,
            length: results.length,
            WithdrawalAcceptSum,
        });


    } catch (error) {
        console.log(error);
    }
};




const AdminWithdrawalRejectView = async (req, res) => {
    try {


        const WithdrawalPendingArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 2, } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const WithdrawalPendingSum = parseFloat(`${WithdrawalPendingArraySum[0] ? WithdrawalPendingArraySum[0].sum : 0}`).toFixed(2);

        const results = await WithdrawalModels.find({ Status: 2 });
        res.status(201).json({
            success: true,
            message: "Withdrawal data",
            data: results,
            length: results.length,
            WithdrawalPendingSum: WithdrawalPendingSum,
        });


    } catch (error) {
        console.log(error);
    }
};



const AdminWithdrawalHistoryView = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { user_id: old_id };

        const WithdrawalAcceptArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 1, user_id: old_id  } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        const WithdrawalRejectArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 2, user_id: old_id } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        const WithdrawalPendingArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 0, user_id: old_id } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const WithdrawalAcceptBalanceSum = parseFloat(`${WithdrawalAcceptArraySum[0] ? WithdrawalAcceptArraySum[0].sum : 0}`).toFixed(2);
        const WithdrawalRejectBalanceSum = parseFloat(`${WithdrawalRejectArraySum[0] ? WithdrawalRejectArraySum[0].sum : 0}`).toFixed(2);
        const WithdrawalPendingBalanceSum = parseFloat(`${WithdrawalPendingArraySum[0] ? WithdrawalPendingArraySum[0].sum : 0}`).toFixed(2);

        const results = await WithdrawalModels.find(query);


        res.status(201).json({
            success: true,
            data: results,
            WithdrawalAcceptBalanceSum,
            WithdrawalRejectBalanceSum,
            WithdrawalPendingBalanceSum
        });

    } catch (error) {
        console.log(error);
    }
};



// Home Bouns Store section End


module.exports = { AdminWithdrawalMethodsView, AdminWithdrawalMethodsAdd, AdminWithdrawalMethodsInableDisable, AdminWithdrawalMethodsDelete, AdminWithdrawalMethodsEdit, AdminWithdrawalMethodsUpdate, AdminWithdrawalSingleViewById, AdminWithdrawalAllView, AdminWithdrawalAccept, AdminWithdrawalReject, AdminWithdrawalPendingView, AdminWithdrawalAcceptView, AdminWithdrawalRejectView, AdminWithdrawalHistoryView };
