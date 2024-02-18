const userModels = require('../../../models/userModels');
const WithdrawalModels = require('../../../models/Withdrawal/WithdrawalModels');
const WithdrawalMethodsModels = require('../../../models/WithdrawalMethods/WithdrawalMethodsModels');
const {TransactionsWithdrawal} = require('../../../commonfile/Transactions/Transactions');

const { ObjectId } = require('mongodb');

const WithdrawalView = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await WithdrawalModels.find({user_id:id});
        const WithdrawalAcceptSum = await WithdrawalModels.aggregate([
            { $match: { Status: 1, user_id: id } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        const WithdrawalRejectSum = await WithdrawalModels.aggregate([
            { $match: { Status: 2, user_id: id } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        const WithdrawalPendingSum = await WithdrawalModels.aggregate([
            { $match: { Status: 1, user_id: id } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
        res.status(201).json({
            success: true,
            data: data,
            WithdrawalAcceptSum: WithdrawalAcceptSum,
            WithdrawalRejectSum: WithdrawalRejectSum,
            WithdrawalPendingSum: WithdrawalPendingSum,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};
const WithdrawalMethodView = async (req, res) => {
    try {

        const data = await WithdrawalMethodsModels.find({ Status: 1 });
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const WithdrawalAmountCheck = async (req, res) => {
    try {
        const data = req.body;
    
        
 
        const Userquery = { _id: new ObjectId(data.user_id) };

        const UserFind = await userModels.findOne(Userquery);

        /// Minus Balance data 
        const WithdrawalPendingBalanceArraySum = await WithdrawalModels.aggregate([
            { $match: { user_id: UserFind._id, Status: 0 } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);
     
        const WithdrawalPendingBalanceSum = parseFloat(`${WithdrawalPendingBalanceArraySum[0] ? WithdrawalPendingBalanceArraySum[0].sum : 0}`);


        /// Reming Available Balance
        const RemingBalanceSum = parseFloat(UserFind.balance) - parseFloat(data?.Amount) - parseFloat(WithdrawalPendingBalanceSum);

        const query = { _id: new ObjectId(data.MethodId) };
        const results = await WithdrawalMethodsModels.findOne(query);
        if (parseFloat(results.MinimumAmount) > parseFloat(data.Amount)) {
            res.status(400).json({
                success: false,
                message: `Minimum Amount ${results.MinimumAmount} USD`,
            });
        } else if (parseFloat(results.MaximumAmount) < parseFloat(data.Amount)) {
            res.status(400).json({
                success: false,
                message: `Maximum Amount ${results.MaximumAmount} USD`,
            });
        } else if (RemingBalanceSum >= 0) {
            res.status(201).json({
                success: true,
                data: results,
                user_id: data?.user_id,
                amount: data?.Amount,
            });
        } else {
            res.status(400).json({
                success: false,
                message: `Amount low`,
            });
        }



    } catch (error) {
        console.log(error);
    }
};

const WithdrawalStore = async (req, res) => {
    try {
        const data = req.body;
        const query = { _id: new ObjectId(data.GatewayData.data.user_id) };
        const FindUser = await userModels.findOne(query);

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

        const FixedCharge = parseFloat(data.GatewayData.data.data.FixedCharge);
        const PercentCharge = parseFloat(data.GatewayData.data.data.PercentCharge);
        const userAmount = parseFloat(data.GatewayData.data.amount);

        if (FixedCharge > 0 && PercentCharge <= 0) {

            const ChargeAmount = (userAmount - parseFloat(FixedCharge))

            const storeData = {
                user_name: FindUser?.name,
                user_id: data.GatewayData.data.user_id,
                GatewayName: data.GatewayData.data.data.Name,
                Transaction: RandomTransaction(15),
                Amount:  ChargeAmount,
                AmountWithVat: userAmount,
                MinimumAmount: data.GatewayData.data.data.MinimumAmount,
                MaximumAmount: data.GatewayData.data.data.MaximumAmount,
                Conversion: data.GatewayData.data.data.Rate,
                WithdrawalAddress: data.WithdrawalAddress,
                NetworkType: data.NetworkType,
                Status: 0,
            } 
            await WithdrawalModels.create(storeData);
            if(results){
                TransactionsWithdrawal(storeData);
              }
            res.status(201).json({
                success: true,
                message: `Withdraw pending`,
                data: storeData,
            });

        } else if (FixedCharge <= 0 && PercentCharge > 0) {
            const ChargeAmount = (userAmount - parseFloat((PercentCharge * userAmount) / 100));

            const storeData = {
                user_name: FindUser?.name,
                user_id: data.GatewayData.data.user_id,
                GatewayName: data.GatewayData.data.data.Name,
                Transaction: RandomTransaction(15),
                Amount: ChargeAmount,
                AmountWithVat: userAmount,
                MinimumAmount: data.GatewayData.data.data.MinimumAmount,
                MaximumAmount: data.GatewayData.data.data.MaximumAmount,
                Conversion: data.GatewayData.data.data.Rate,
                WithdrawalAddress: data.WithdrawalAddress,
                NetworkType: data.NetworkType,
                Status: 0,
            }
            
          const results =  await WithdrawalModels.create(storeData);
          if(results){
            TransactionsWithdrawal(storeData);
          }
            res.status(201).json({
                success: true,
                message: `Withdraw pending`,
                data: storeData,
            });

        } else {

            const storeData = {
                user_name: FindUser?.name,
                user_id: data.GatewayData.data.user_id,
                GatewayName: data.GatewayData.data.data.Name,
                Transaction: RandomTransaction(15),
                Amount: userAmount,
                AmountWithVat: userAmount,
                MinimumAmount: data.GatewayData.data.data.MinimumAmount,
                MaximumAmount: data.GatewayData.data.data.MaximumAmount,
                Conversion: data.GatewayData.data.data.Rate,
                WithdrawalAddress: data.WithdrawalAddress,
                NetworkType: data.NetworkType,
                Status: 0,
            }           
            await WithdrawalModels.create(storeData);
            if(results){
                TransactionsWithdrawal(storeData);
              }
            res.status(201).json({
                success: true,
                message: `WithDraw pending`,
                data: storeData,
            });
        }





    } catch (error) {
        console.log(error);
    }
};






module.exports = { WithdrawalMethodView, WithdrawalStore, WithdrawalAmountCheck, WithdrawalView};
