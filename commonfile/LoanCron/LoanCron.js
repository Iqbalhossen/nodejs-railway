const schedule = require('node-schedule');
const TransactionsModels = require('../../models/Transactions/TransactionsModels');
const LoanModels = require('../../models/Loan/LoanModels');
const userModels = require('../../models/userModels');
const { ObjectId } = require('mongodb');
let moment = require('moment');

schedule.scheduleJob("*/10 * * * *", function () {

    // const cronTime = new Date().toISOString().
    //     replace(/T/, ' ').
    //     replace(/\..+/, '');

    // console.log(`running a task every 1 second ${cronTime}`)

    const LoanCron = async () => {

        try {

            const findDate = moment(Date.now()).format('DD-MM-YYYY');
            const data = await LoanModels.find
                (
                    {
                        expired_time: {
                            $lte: findDate,
                        },
                        status: 1
                    }
                );


            for (const singleData of data) {

                const { _id, user_id, interest_amount, } = singleData;

                const query = { _id: new ObjectId(user_id) };
                const LoanQuery = { _id: new ObjectId(_id) };
                const option = { upsert: true };

                const findUser = await userModels.findOne(query);

                if ((parseFloat(findUser?.balance) - parseFloat(interest_amount)) >= 0) {

                    const RemingBalanceSum = parseFloat(findUser?.balance) - parseFloat(interest_amount)
                    await userModels.findByIdAndUpdate(query, { balance: RemingBalanceSum }, option);
                    await LoanModels.findByIdAndUpdate(LoanQuery, { status: 3 }, option);

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

                        const StoreData = { user_id: findUser._id, amount: interest_amount, post_balance: -interest_amount, trx_type: '-', trx: RandomTransaction(15), details: `Loan payment`, }
                        await TransactionsModels.create(StoreData);

                    } else {

                        const StoreData = { user_id: findUser._id, amount: interest_amount, post_balance: (parseFloat(ExitsData.post_balance) - parseFloat(interest_amount)), trx_type: '-', trx: RandomTransaction(15), details: `Loan payment`, }
                        await TransactionsModels.create(StoreData);

                    }

                }



            }

        } catch (error) {
            console.log(error);
        }

    };
    LoanCron().catch(error => console.log(error));

});


