const TransactionsModels = require('../../models/Transactions/TransactionsModels');
const UserMiningModels = require('../../models/UserMining/UserMiningModels');
const userModels = require('../../models/userModels');
const { ObjectId } = require('mongodb');
let moment = require('moment');

const Mining = async () => {


    try {

        const findDate = moment(Date.now()).format('DD-MM-YYYY, h:mm:ss a');
        const data = await UserMiningModels.find({ expired_time: findDate, status:0 });
        
        for (const singleData of data) {

            const { _id, user_id, profit_amount } = singleData;

            const query = { _id: new ObjectId(user_id) };
            const MiningQuery = { _id: new ObjectId(_id) };
            const option = { upsert: true };
    
            const userFind = await userModels.findOne(query);
    
            const RemingBalanceSum = parseFloat(userFind.balance) + parseFloat(profit_amount)
    
            await userModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);
            await UserMiningModels.findByIdAndUpdate(MiningQuery, { status: 1 }, option);
    
            const ExitsData = await TransactionsModels.findOne().sort('-created_at');
    
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
    
            if (ExitsData === null) {
                const StoreData = {  user_id: userFind._id, amount: profit_amount,  post_balance: profit_amount, trx_type: '+', trx: RandomTransaction(15), details: `Mining`, }
                await TransactionsModels.create(StoreData);
    
            } else {
                const StoreData = {  user_id: userFind._id, amount: profit_amount,  post_balance: (parseFloat(ExitsData.post_balance) + parseFloat(profit_amount)), trx_type: '+', trx: RandomTransaction(15), details: `Mining`, }
                await TransactionsModels.create(StoreData);
    
            }

        }

    } catch (error) {
        console.log(error);
    }
}




module.exports = { Mining, };