const TransactionsModels = require('../../models/Transactions/TransactionsModels');
const userModels = require('../../models/userModels');
const { ObjectId } = require('mongodb');

const TransactionsDeposit = async (data) => {

    try {
        const { user_id, GatewayName, Transaction, Amount, AmountWithVat } = data;

        const query = { _id: new ObjectId(user_id) };
        const option = { upsert: true };

        const userFind = await userModels.findOne(query);

        const userBalance = parseFloat(parseFloat(userFind.balance) + parseFloat(Amount)).toFixed(2);
        await userModels.findByIdAndUpdate(query, { balance: userBalance }, option);

        const ExitsData = await TransactionsModels.findOne().sort('-createdAt');
        if (ExitsData === null) {
            const StoreData = {  user_id: userFind._id, amount: AmountWithVat, charge: (parseFloat(AmountWithVat) - parseFloat(Amount)), post_balance: Amount, trx_type: '+', trx: Transaction, details: `Deposit Via ${GatewayName}`, remark: 'deposit' }
            await TransactionsModels.create(StoreData);

        } else {

            const StoreData = {  user_id: userFind._id, amount: AmountWithVat, charge: (parseFloat(AmountWithVat) - parseFloat(Amount)), post_balance: (parseFloat(Amount) + parseFloat(ExitsData.post_balance)), trx_type: '+', trx: Transaction, details: `Deposit Via ${GatewayName}`, remark: 'deposit' }
            await TransactionsModels.create(StoreData);

        }

    } catch (error) {
        console.log(error);
    }
}


const TransactionsWithdrawal = async (data) => {

    try {
        const { user_id, GatewayName, Transaction, Amount, AmountWithVat } = data;
        const query = { _id: new ObjectId(user_id) };
        const option = { upsert: true };

        const userFind = await userModels.findOne(query);

        const userBalance = parseFloat(parseFloat(userFind.balance) - parseFloat(AmountWithVat)).toFixed(2);
        await userModels.findByIdAndUpdate(query, { balance: userBalance }, option);

        const ExitsData = await TransactionsModels.findOne().sort('-createdAt');

        if (ExitsData === null) {
            const StoreData = { user_id: userFind._id, amount: AmountWithVat, charge: (parseFloat(AmountWithVat) - parseFloat(Amount)), post_balance: -AmountWithVat, trx_type: '-', trx: Transaction, details: `Withdraw Via ${GatewayName}`, remark: 'withdrawal' }
            await TransactionsModels.create(StoreData);

        } else {

            const StoreData = { user_id: userFind._id, amount: AmountWithVat, charge: (parseFloat(AmountWithVat) - parseFloat(Amount)), post_balance: (parseFloat(ExitsData.post_balance) - parseFloat(AmountWithVat)), trx_type: '-', trx: Transaction, details: `Withdraw Via ${GatewayName}`, remark: 'withdrawal' }
            await TransactionsModels.create(StoreData);

        }

    } catch (error) {
        console.log(error);
    }
}

const TransactionsWithdrawalReject = async (data) => {

    try {
        const { user_id, Transaction, Amount, AmountWithVat } = data;
        const query = { _id: new ObjectId(user_id) };
        const option = { upsert: true };


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

        const userFind = await userModels.findOne(query);

        const userBalance = parseFloat(parseFloat(userFind.balance) + parseFloat(AmountWithVat)).toFixed(2);
        await userModels.findByIdAndUpdate(query, { balance: userBalance }, option);

        const ExitsData = await TransactionsModels.findOne().sort('-createdAt');

        if (ExitsData === null) {
            const StoreData = { user_name: userFind.name, user_id: userFind._id, amount: AmountWithVat, charge: 0, post_balance: AmountWithVat, trx_type: '+', trx: RandomTransaction(15), details: `${AmountWithVat} USD Refunded from withdrawal rejection`, remark: 'withdraw_reject' }
            await TransactionsModels.create(StoreData);

        } else {

            const StoreData = { user_name: userFind.name, user_id: userFind._id, amount: AmountWithVat, charge: 0, post_balance: (parseFloat(ExitsData.post_balance) + parseFloat(AmountWithVat)), trx_type: '+', trx: RandomTransaction(15), details: `${AmountWithVat} USD Refunded from withdrawal rejection`, remark: 'withdraw_reject' }
            await TransactionsModels.create(StoreData);

        }

    } catch (error) {
        console.log(error);
    }
}

const TransactionsTradeLog = async (RemingBalanceSum, data, UserData) => {

    try {
        const { Crypto, HighLow, Amount } = data;
        const { _id, name, balance } = UserData;

        const query = { _id: new ObjectId(_id) };
        const option = { upsert: true };

        await userModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);

        const ExitsData = await TransactionsModels.findOne().sort('-createdAt');

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

            const StoreData = { user_id: _id, amount: Amount, post_balance: -Amount, trx_type: '-', trx: RandomTransaction(15), details: `Trade to ${Crypto} ${HighLow}`, }
            await TransactionsModels.create(StoreData);

        } else {

            const StoreData = { user_id: _id, amount: Amount, post_balance: (parseFloat(ExitsData.post_balance) - parseFloat(Amount)), trx_type: '-', trx: RandomTransaction(15), details: `Trade to ${Crypto} ${HighLow}`, }
            await TransactionsModels.create(StoreData);

        }

    } catch (error) {
        console.log(error);
    }
}

const TransactionsTradeLogResults = async (TradeData, userAmount, result) => {

    try {
        const { user_id, Crypto } = TradeData;

        const query = { _id: new ObjectId(user_id) };
        const option = { upsert: true };

        const userFind = await userModels.findOne(query);

        const RemingBalanceSum = parseFloat(userFind.balance) + parseFloat(userAmount)

        await userModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);

        const ExitsData = await TransactionsModels.findOne().sort('-createdAt');

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

            const StoreData = { user_id: userFind._id, amount: userAmount, post_balance: userAmount, trx_type: '+', trx: RandomTransaction(15), details: `Trade ${Crypto} ${result}`, }
            await TransactionsModels.create(StoreData);

        } else {

            const StoreData = { user_id: userFind._id, amount: userAmount, post_balance: (parseFloat(ExitsData.post_balance) + parseFloat(userAmount)), trx_type: '+', trx: RandomTransaction(15), details: `Trade ${Crypto} ${result}`, }
            await TransactionsModels.create(StoreData);

        }

    } catch (error) {
        console.log(error);
    }
}



const TransactionsFixedDeposit = async (User, FixedDepositData,) => {

    try {

        const { amount } = FixedDepositData;
        const query = { _id: new ObjectId(User._id) };
        const option = { upsert: true };

        const RemingBalanceSum = parseFloat(User.balance) - parseFloat(amount)

        await userModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);

        const ExitsData = await TransactionsModels.findOne().sort('-createdAt');

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

            const StoreData = { user_id: User._id, amount: amount, post_balance: -amount, trx_type: '-', trx: RandomTransaction(15), details: `Trade ${Crypto} ${result}`, }
            await TransactionsModels.create(StoreData);

        } else {

            const StoreData = { user_id: User._id, amount: amount, post_balance: (parseFloat(ExitsData.post_balance) - parseFloat(amount)), trx_type: '-', trx: RandomTransaction(15), details: `Fixed Deposit`, }
            await TransactionsModels.create(StoreData);

        }

    } catch (error) {
        console.log(error);
    }
}



const TransactionsMining = async (User, MiningData,) => {

    try {

        const { amount } = MiningData;
        const query = { _id: new ObjectId(User._id) };
        const option = { upsert: true };

        const RemingBalanceSum = parseFloat(User.balance) - parseFloat(amount)

        await userModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);

        const ExitsData = await TransactionsModels.findOne().sort('-createdAt');

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

            const StoreData = { user_id: User._id, amount: amount, post_balance: -amount, trx_type: '-', trx: RandomTransaction(15), details: `Mining`, }
            await TransactionsModels.create(StoreData);

        } else {

            const StoreData = { user_id: User._id, amount: amount, post_balance: (parseFloat(ExitsData.post_balance) - parseFloat(amount)), trx_type: '-', trx: RandomTransaction(15), details: `Mining`, }
            await TransactionsModels.create(StoreData);

        }

    } catch (error) {
        console.log(error);
    }
}


const TransactionsLoan = async (data) => {

    try {

        const { user_id, amount } = data;
        const query = { _id: new ObjectId(user_id) };
        const option = { upsert: true };

        const findUser = await userModels.findOne(query);
        const RemingBalanceSum = parseFloat(findUser.balance) + parseFloat(amount)

        await userModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);

        const ExitsData = await TransactionsModels.findOne().sort('-createdAt');

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

            const StoreData = { user_id: findUser._id, amount: amount, post_balance: amount, trx_type: '+', trx: RandomTransaction(15), details: `Loan successfull`, }
            await TransactionsModels.create(StoreData);

        } else {

            const StoreData = { user_id: findUser._id, amount: amount, post_balance: (parseFloat(ExitsData.post_balance) + parseFloat(amount)), trx_type: '+', trx: RandomTransaction(15), details: `Loan successfull`, }
            await TransactionsModels.create(StoreData);

        }

    } catch (error) {
        console.log(error);
    }
}






module.exports = { TransactionsDeposit, TransactionsWithdrawal, TransactionsTradeLog, TransactionsTradeLogResults, TransactionsWithdrawalReject, TransactionsFixedDeposit, TransactionsMining, TransactionsLoan };