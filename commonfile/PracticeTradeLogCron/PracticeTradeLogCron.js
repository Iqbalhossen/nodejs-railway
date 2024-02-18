

const schedule = require('node-schedule');
const PracticeTradeLogModels = require('../../models/PracticeTradeLog/PracticeTradeLogModels');
const { FixedDeposit } = require('../FixedDeposit/FixedDeposit');
const { Mining } = require('../Mining/Mining');
const { ObjectId } = require('mongodb');
// ${TradeData?.Symbol}
schedule.scheduleJob("*/01 * * * * *", function () {
  // const timeObject = new Date();
  // console.log(new Date(timeObject.getTime()).toLocaleString().
  // replace(/T/, ' ').
  // replace(/\..+/, '') === "2/7/2024, 11:36:15 PM")
  // console.log(new Date(timeObject.getTime()).toLocaleString().
  // replace(/T/, ' ').
  // replace(/\..+/, '') )

  const PracticeTradeLogCron = async () => {
    try {

      // Fixed Deposit cron run
      FixedDeposit();
      // Fixed Deposit cron run 

      // Mining cron run 
      Mining();
      // Mining cron run 

    

      const cronTime = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
      const data = await PracticeTradeLogModels.find({ OutTime: cronTime });
      // console.log(`running a task every 1 second ${cronTime}`)


      for (const TradeData of data) {
        const url = `https://api.exchange.coinbase.com/products/${TradeData?.Crypto}-USD/trades`;

        const apiCall = async () => {
          await fetch(url)
            .then((res) => res.json())
            .then((data) => {
              const cryptoTradePrice = parseFloat(data[0].price);
              const userTradePrice = parseFloat(TradeData.Crypto_price);
              const userAmount = parseFloat(TradeData.Amount);
              const HighLow = TradeData.HighLow;
              const query = { _id: new ObjectId(TradeData._id) };
              const option = { upsert: true };

              if (cryptoTradePrice === userTradePrice) {////////// draw section

                const updateData = async () => {
                  const storeData = {
                    Result_Amount: userAmount,
                    Result: 'Draw',
                    Status: 1,
                  }

                  await PracticeTradeLogModels.findByIdAndUpdate(query, storeData, option);

                }
                updateData();

              } else if (HighLow === 'Low' && cryptoTradePrice < userTradePrice) {//////win section

                const updateData = async () => {
                  const amount = userAmount + (parseFloat(parseFloat(TradeData.profit) * userAmount) / 100);
                  const storeData = {
                    Result_Amount: amount,
                    Result: 'Win',
                    Status: 1,
                  }

                  await PracticeTradeLogModels.findByIdAndUpdate(query, storeData, option);

                }
                updateData();

              } else if (HighLow === 'High' && cryptoTradePrice > userTradePrice) { //// win section

                const updateData = async () => {
                  const amount = userAmount + (parseFloat(parseFloat(TradeData.profit) * userAmount) / 100);
                  const storeData = {
                    Result_Amount: amount,
                    Result: 'Win',
                    Status: 1,
                  }

                  await PracticeTradeLogModels.findByIdAndUpdate(query, storeData, option);

                }
                updateData();
              } else {
                const updateData = async () => {
                  const storeData = {
                    Result_Amount: 0,
                    Result: 'Loss',
                    Status: 1,
                  }

                  await PracticeTradeLogModels.findByIdAndUpdate(query, storeData, option);

                }
                updateData();
              }

            });

        };


        apiCall();

      }

    } catch (error) {
      console.log(error);
    }
  };
  PracticeTradeLogCron().catch(error => console.log(error));

});


