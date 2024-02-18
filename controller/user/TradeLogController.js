const ThradeSettingModels = require('../../models/ThradeSetting/ThradeSettingModel');
const TradeLogModels = require('../../models/TradeLog/TradeLogModels');
const userModels = require('../../models/userModels');
const WithdrawalModels = require('../../models/Withdrawal/WithdrawalModels');
const { TransactionsTradeLog } = require('../../commonfile/Transactions/Transactions')
const { ObjectId } = require('mongodb');
// Home Bouns Store section 
const TradeLogStore = async (req, res) => {
    try {
        const data = req.body;
      
        const thradeSettingData = await ThradeSettingModels.findOne({ _id: new ObjectId(data.thradeSetting_id) });

        if(data?.thradeSetting_id === '' || data?.thradeSetting_id === undefined ){
            res.status(201).json({
                success: false,
                message: `Please time select`,
            });
        }else{
            const UserData = await userModels.findOne({ _id: new ObjectId(data.user_id) });
            const RemingBalanceSum = (parseFloat(UserData?.balance) - parseFloat(data?.amount));
    
            if (RemingBalanceSum >= 0) {
                console.log(data)
                const timeObject = new Date();
                const storeData = {
                    user_id: UserData._id,
                    Crypto: data?.CryptoCurrency?.Symbol,
                    Crypto_price: data?.Crypto_price,
                    Amount: data?.amount,
                    Result_Amount: 0,
                    InTime: new Date(),
                    HighLow: data?.HighLow,
                    Result: null,
                    Status: 0,
                    OutTime: new Date(timeObject.getTime() + 1000 * thradeSettingData?.Time).toLocaleString().
                        replace(/T/, ' ').
                        replace(/\..+/, ''),
                    Symbol: data?.CryptoCurrency?.Symbol,
                    Time: thradeSettingData?.Time,
                    Unit: thradeSettingData?.Unit,
                    profit: thradeSettingData?.Profit,
    
                }
    
              TransactionsTradeLog(RemingBalanceSum, storeData, UserData);
    
              const results =   await TradeLogModels.create(storeData);
                res.status(201).json({
                    success: true,
                    message: `Trade ${data?.HighLow}`,
                    data: results,
                });
    
            } else { ////   Balance low
                res.status(400).json({
                    success: false,
                    message: `Insufficient balance`,
                });
            }
    
        }

    

    } catch (error) {
        console.log(error);
    }
};


const TradeLogHistory = async (req, res) => {
    try {
        const { id } = req.params;
        /// Available Balance data
  
        const TradeLogWinBalanceArraySum = await TradeLogModels.aggregate([
            { $match: { user_id: id, Result: 'Win' } },
            { $group: { _id: {}, sum: { $sum: "$Result_Amount" } } }
        ]);

        const TradeLogDrawBalanceArraySum = await TradeLogModels.aggregate([
            { $match: { user_id: id, Result: 'Draw' } },
            { $group: { _id: {}, sum: { $sum: "$Result_Amount" } } }
        ]);
        const TradeLogLossBalanceArraySum = await TradeLogModels.aggregate([
            { $match: { user_id: id, Result: 'Loss' } },
            { $group: { _id: {}, sum: { $sum: "$Amount" } } }
        ]);

        const TradeLogArraySum = await TradeLogModels.aggregate([
            { $match: { user_id: id } },
            { $group: { _id: {}, sum: { $sum: "$Result_Amount" } } }
        ]);


        const TradeLogWinBalanceSum = parseFloat(`${TradeLogWinBalanceArraySum[0] ? TradeLogWinBalanceArraySum[0].sum : 0}`);

        const TradeLogDrawBalanceSum = parseFloat(`${TradeLogDrawBalanceArraySum[0] ? TradeLogDrawBalanceArraySum[0].sum : 0}`);

        const TradeLogLossBalanceSum = parseFloat(`${TradeLogLossBalanceArraySum[0] ? TradeLogLossBalanceArraySum[0].sum : 0}`);

        const TradeLogSum = parseFloat(`${TradeLogArraySum[0] ? TradeLogArraySum[0].sum : 0}`);

        const TradeLog = await TradeLogModels.find({user_id: id})

        res.status(201).json({
            success: true,
            data: TradeLog,
            TradeLogSum:TradeLogSum,
            TradeLogWin: TradeLogWinBalanceSum,
            TradeLogDraw: TradeLogDrawBalanceSum,
            TradeLogLoss: TradeLogLossBalanceSum,
            length: TradeLog.length
        });

    } catch (error) {
        console.log(error);
    }
};


const TradeLogSingleView = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };      
        const data = await TradeLogModels.findOne(query)
        res.status(201).json({
            success: true,
            data,
           
        });

    } catch (error) {
        console.log(error);
    }
};




module.exports = { TradeLogStore, TradeLogHistory, TradeLogSingleView};
