const DepositModels = require('../../../models/Deposit/DepositModels');
const TradeLogModels = require('../../../models/TradeLog/TradeLogModels');
const WithdrawalModels = require('../../../models/Withdrawal/WithdrawalModels');
const sharp = require('sharp');
const fs = require('fs');
const { ObjectId } = require('mongodb');
// Home Bouns Store section 
const UserDepositAllView = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const UserDepositData = await DepositModels.find({ user_id: user_id });

        res.status(201).json({
            success: true,
            data: UserDepositData,
            length: UserDepositData.length
        });


    } catch (error) {
        console.log(error);
    }
};
const UserAvailabeBalance = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const AvailableBalanceData = await DepositModels.aggregate([
            { $match: { Status: 1, user_id: user_id } }
        ]);


        /// Available Balance data

        const DepositBalanceArraySum = await DepositModels.aggregate([
            { $match: { Status: 1, user_id: user_id } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);

        const TradeLogWinBalanceArraySum = await TradeLogModels.aggregate([
            { $match: { user_id: user_id, Result: 'win' } },
            { $group: { _id: {}, sum: { $sum: "$Result_Amount" } } }
        ]);

        const TradeLogDrawBalanceArraySum = await TradeLogModels.aggregate([
            { $match: { user_id: user_id, Result: 'draw' } },
            { $group: { _id: {}, sum: { $sum: "$Result_Amount" } } }
        ]);

        const DepositBalanceSum = parseFloat(`${DepositBalanceArraySum[0] ? DepositBalanceArraySum[0].sum : 0}`);
        const TradeLogWinBalanceSum = parseFloat(`${TradeLogWinBalanceArraySum[0] ? TradeLogWinBalanceArraySum[0].sum : 0}`);
        const TradeLogDrawBalanceSum = parseFloat(`${TradeLogDrawBalanceArraySum[0] ? TradeLogDrawBalanceArraySum[0].sum : 0}`);


        /// Minus Balance data 
        const TradeLogBalanceArraySum = await TradeLogModels.aggregate([
            { $match: { user_id: user_id } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);

        const WithdrawalPendingBalanceArraySum = await WithdrawalModels.aggregate([
            { $match: { user_id: user_id, Status:0 } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const WithdrawalSuccessBalanceArraySum = await WithdrawalModels.aggregate([
            { $match: { user_id: user_id, Status:1 } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);


        const TradeLogBalanceSum = parseFloat(`${TradeLogBalanceArraySum[0] ? TradeLogBalanceArraySum[0].sum : 0}`);
        const WithdrawalPendingBalanceSum = parseFloat(`${WithdrawalPendingBalanceArraySum[0] ? WithdrawalPendingBalanceArraySum[0].sum : 0}`);
        const WithdrawalSuccessBalanceSum = parseFloat(`${WithdrawalSuccessBalanceArraySum[0] ? WithdrawalSuccessBalanceArraySum[0].sum : 0}`);


        /// Available Balance 
        const AvailableBalanceSum = DepositBalanceSum + TradeLogWinBalanceSum + TradeLogDrawBalanceSum;



        /// Minus Balance
        const MinusBalenceSum = TradeLogBalanceSum + WithdrawalPendingBalanceSum + WithdrawalSuccessBalanceSum;

        /// Reming Available Balance
        const RemingBalanceSum = AvailableBalanceSum - MinusBalenceSum;
        res.status(201).json({
            success: true,
            data: AvailableBalanceData,
            Balance: RemingBalanceSum,
            length: AvailableBalanceData.length
        });


    } catch (error) {
        console.log(error);
    }
};



// Home Bouns Store section End


module.exports = { UserAvailabeBalance, UserDepositAllView, };
