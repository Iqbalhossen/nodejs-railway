const UserModels = require('../../../models/userModels');
const DepositModels = require('../../../models/Deposit/DepositModels');
const WithdrawalModels = require('../../../models/Withdrawal/WithdrawalModels');
const TradeLogModels = require('../../../models/TradeLog/TradeLogModels');
const TransactionsModels = require('../../../models/Transactions/TransactionsModels');
const UserLoginsModels = require('../../../models/UserLogins/UserLoginsModels');

const { ObjectId } = require('mongodb');

// Menu section 
const AdminAllUserView = async (req, res) => {

    try {
        const data = await UserModels.find().sort('-created_at');
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminUserViewById = async (req, res) => {

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const data = await UserModels.findOne(query);
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
}; 

const AdminUserBanned = async (req, res) => {

    try {
        const data = await UserModels.find({ status: 2 }).sort('-created_at');
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminUseEmailUnverify = async (req, res) => {

    try {
        const data = await UserModels.find({ is_verified: false }).sort('-created_at');
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminUseMobileUnverify = async (req, res) => {

    try {
        const data = await UserModels.find({ mv: false }).sort('-created_at');
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminUseKYCUnverify = async (req, res) => {

    try {
        const data = await UserModels.find({ kv: false }).sort('-created_at');
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminUseWithBalance = async (req, res) => {

    try {
        const data = await UserModels.find({
            balance: { $gt: 0 } 
           }).sort('-created_at');
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};
const AdminUseKYCPending = async (req, res) => {

    try {
        const data = await UserModels.find({ kyc_data: true }).sort('-created_at');
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminUseHistoryDetails = async (req, res) => {

    try {

        const old_id = req.params.id;

        const DepositAcceptArraySum = await DepositModels.aggregate([
            { $match: { Status: 1, user_id: old_id } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const WithdrawalAcceptArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 1, user_id: old_id } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const TotalTradeLog = await TradeLogModels.find({ user_id: old_id });

        const WinTradeLog = await TradeLogModels.find({ user_id: old_id, Result: 'Win' });

        const LossTradeLog = await TradeLogModels.find({ user_id: old_id, Result: 'Loss' });

        const DrawTradeLog = await TradeLogModels.find({ user_id: old_id, Result: 'Draw' });

        const TotalTransactions = await TransactionsModels.find({ user_id: old_id }).sort('-created_at');

        const DepositAcceptBalanceSum = parseFloat(`${DepositAcceptArraySum[0] ? DepositAcceptArraySum[0].sum : 0}`).toFixed(2);

        const WithdrawalAcceptBalanceSum = parseFloat(`${WithdrawalAcceptArraySum[0] ? WithdrawalAcceptArraySum[0].sum : 0}`).toFixed(2);

        const Balance = `${TotalTransactions[0] !== undefined ? TotalTransactions[0]?.post_balance : 0.00}`;

        res.status(201).json({
            success: true,
            DepositAcceptBalanceSum,
            WithdrawalAcceptBalanceSum,
            TotalTradeLog: TotalTradeLog.length,
            WinTradeLog: WinTradeLog.length,
            LossTradeLog: LossTradeLog.length,
            DrawTradeLog: DrawTradeLog.length,
            TotalTransactions: TotalTransactions.length,
            Balance,
        });
    } catch (error) {
        console.log(error);
    }
};



const AdminUserBalanceAdd = async (req, res) => {
 
    try {
        const data = req.body;
        const query = { _id: new ObjectId(data.user_id) };
        const option = { upsert: true };
        const UserFind = await UserModels.findOne(query);

        const ExitsData = await TransactionsModels.findOne({ user_id: data.user_id }).sort('-created_at');

        function RandomTransaction(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }

        const RemingBalanceSum = parseFloat(UserFind.balance) + parseFloat(data?.amount);

        await UserModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);

        if (ExitsData === null) {
            const StoreData = {user_name: UserFind?.name, user_id: data?.user_id, amount: data?.amount, post_balance: data?.amount, trx_type: '+', trx: RandomTransaction(15), details: data?.remark, remark:'balance_add' }
           
            const results =  await TransactionsModels.create(StoreData);
            res.status(201).json({
                success: true,
                message:'Balance Add Successfull',
                data: results,
            });
        } else {
            const StoreData = {user_name: UserFind?.name, user_id: data?.user_id, amount: data?.amount, post_balance: (parseFloat(data?.amount) + parseFloat(ExitsData.post_balance)), trx_type: '+', trx: RandomTransaction(15), details: data?.remark, remark:'balance_add' }

           const results =  await TransactionsModels.create(StoreData);
            res.status(201).json({
                success: true,
                message:'Balance Add Successfull',
                data: results,
            });
        }



    } catch (error) {
        console.log(error);
    }
};


const AdminUserBalanceSubtract = async (req, res) => {

    try {
        const data = req.body;
        const query = { _id: new ObjectId(data.user_id) };
        const option = { upsert: true };
        const UserFind = await UserModels.findOne(query);
   
        function RandomTransaction(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }
        const RemingBalanceSum = parseFloat(UserFind.balance) - parseFloat(data?.amount)
        await UserModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);

        const ExitsData = await TransactionsModels.findOne({ user_id: data.user_id }).sort('-created_at');
        
        if (ExitsData === null) {

            const StoreData = {user_name: UserFind?.name, user_id: data?.user_id, amount: data?.amount, post_balance: -parseFloat(data?.amount), trx_type: '-', trx: RandomTransaction(15), details: details?.remark, remark:'balance_subtract' }
            const results =  await TransactionsModels.create(StoreData);
            res.status(201).json({
                success: true,
                message:'Balance Subtract  Successfull',
                data: results,
            });
        } else {
            const StoreData = {user_name: UserFind?.name, user_id: data?.user_id, amount: data?.amount, post_balance: parseFloat(parseFloat(ExitsData.post_balance) - parseFloat(data?.amount) ), trx_type: '-', trx: RandomTransaction(15), details: data?.remark, remark:'balance_subtract' }

           const results =  await TransactionsModels.create(StoreData);
            res.status(201).json({
                success: true,
                message:'Balance Subtract  Successfull',
                data: results,
            });
        }



    } catch (error) {
        console.log(error);
    }
};


const AdminUserUpdateById = async (req, res) => {

    try {
        const data = req.body;
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const results = await UserModels.findByIdAndUpdate(query, data, option);
        res.status(201).json({
            success: true,
            message: "User Update successfully",
            data: results,
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminUserBannedByID = async (req, res) => {

    try {
        const data = req.body;
        const updateData = {ban_reason: data.ban_reason, status:2}
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const results = await UserModels.findByIdAndUpdate(query, updateData, option);
        res.status(201).json({
            success: true,
            message: "User Update successfully",
            data: results,
        });

    } catch (error) {
        console.log(error);
    }
};



const AdminUserLoginHistory = async (req, res) => {

    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const results = await UserLoginsModels.find(query);
        res.status(201).json({
            success: true,
            data: results,
        });

    } catch (error) {
        console.log(error);
    }
};



module.exports = { AdminAllUserView, AdminUserViewById, AdminUserBanned, AdminUseEmailUnverify, AdminUseHistoryDetails, AdminUserBalanceAdd, AdminUserBalanceSubtract, AdminUserUpdateById, AdminUseMobileUnverify, AdminUseKYCUnverify, AdminUseWithBalance, AdminUseKYCPending, AdminUserBannedByID, AdminUserLoginHistory };
