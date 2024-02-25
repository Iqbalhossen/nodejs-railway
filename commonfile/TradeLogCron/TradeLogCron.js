const schedule = require('node-schedule');
const TradeLogModels = require('../../models/TradeLog/TradeLogModels');
const userModels = require('../../models/userModels');
const { ObjectId } = require('mongodb');
const { TransactionsTradeLogResults } = require('../Transactions/Transactions')
// ${TradeData?.Symbol} 
schedule.scheduleJob("*/01 * * * * *", function () {

  const TradeLogCron = async () => {

    try {

      const cronTime = new Date().toLocaleString().
        replace(/T/, ' ').
        replace(/\..+/, '');
      const data = await TradeLogModels.find({ OutTime: cronTime, Status:0 });
      // console.log(`running a task every 1 second ${cronTime}`)

      for (const TradeData of data) {
        console.log(TradeData)
        const url = `https://api.exchange.coinbase.com/products/${TradeData?.Crypto}-${TradeData?.currency}/trades`;

        const apiCall = async () => {
          await fetch(url)
            .then((res) => res.json())
            .then(async (data) => {
              const cryptoTradePrice = parseFloat(data[0].price);
              const userTradePrice = parseFloat(TradeData.Crypto_price);
              const userAmount = parseFloat(TradeData.Amount);
              const HighLow = TradeData.HighLow;
              const UserQuery = { _id: new ObjectId(TradeData.user_id) };
              const query = { _id: new ObjectId(TradeData._id) };
              const option = { upsert: true };

              const userFind = await userModels.findOne(UserQuery);

              if (userFind?.first_profit !== null && TradeData?.Time === 30) {//////////////////// first_profit
                const user_first_profit = parseFloat(userFind?.first_profit);

                if (userFind?.trading_type === "Win") {///////////////////////trading_type

                  const updateData = async () => {
                    const amount = userAmount + (parseFloat(parseFloat(user_first_profit) * userAmount) / 100);
                    const storeData = {
                      Result_Amount: amount,
                      Result: 'Win',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, amount, 'Win');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();



                } else if (userFind?.trading_type === "Lose") {//////////////////// trading_type else
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: 0,
                      Result: 'Loss',
                      Status: 1,
                    }

                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();
                } else if (userFind?.trading_type === "Draw") {
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: userAmount,
                      Result: 'Draw',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();

                } else {
                  if (cryptoTradePrice === userTradePrice) {////////// draw section

                    const updateData = async () => {
                      const storeData = {
                        Result_Amount: userAmount,
                        Result: 'Draw',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();

                  } else if (HighLow === 'Low' && cryptoTradePrice < userTradePrice) {//////win section

                    const updateData = async () => {
                      const amount = userAmount + (parseFloat(parseFloat(user_first_profit) * userAmount) / 100);
                      const storeData = {
                        Result_Amount: amount,
                        Result: 'Win',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, amount, 'Win');
                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();

                  } else if (HighLow === 'High' && cryptoTradePrice > userTradePrice) { //// win section

                    const updateData = async () => {
                      const amount = userAmount + (parseFloat(parseFloat(user_first_profit) * userAmount) / 100);
                      const storeData = {
                        Result_Amount: amount,
                        Result: 'Win',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, amount, 'Win');

                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();
                  } else {
                    const updateData = async () => {
                      const storeData = {
                        Result_Amount: 0,
                        Result: 'Loss',
                        Status: 1,
                      }

                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();
                  }

                }///////////////////////trading_type end

              } else if (userFind?.second_profit !== null && TradeData?.Time === 60) {////////////////////   second_profit

                const user_second_profit = parseFloat(userFind?.second_profit);

                if (userFind?.trading_type === "Win") {///////////////////////trading_type

                  const updateData = async () => {
                    const amount = userAmount + (parseFloat(parseFloat(user_second_profit) * userAmount) / 100);
                    const storeData = {
                      Result_Amount: amount,
                      Result: 'Win',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, amount, 'Win');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();



                } else if (userFind?.trading_type === "Lose") {//////////////////// trading_type else
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: 0,
                      Result: 'Loss',
                      Status: 1,
                    }

                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();
                } else if (userFind?.trading_type === "Draw") {
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: userAmount,
                      Result: 'Draw',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();

                } else {

                  if (cryptoTradePrice === userTradePrice) {////////// draw section

                    const updateData = async () => {
                      const storeData = {
                        Result_Amount: userAmount,
                        Result: 'Draw',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();

                  } else if (HighLow === 'Low' && cryptoTradePrice < userTradePrice) {//////win section

                    const updateData = async () => {
                      const amount = userAmount + (parseFloat(parseFloat(user_second_profit) * userAmount) / 100);
                      const storeData = {
                        Result_Amount: amount,
                        Result: 'Win',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, amount, 'Win');
                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();

                  } else if (HighLow === 'High' && cryptoTradePrice > userTradePrice) { //// win section

                    const updateData = async () => {
                      const amount = userAmount + (parseFloat(parseFloat(user_second_profit) * userAmount) / 100);
                      const storeData = {
                        Result_Amount: amount,
                        Result: 'Win',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, amount, 'Win');

                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();
                  } else {
                    const updateData = async () => {
                      const storeData = {
                        Result_Amount: 0,
                        Result: 'Loss',
                        Status: 1,
                      }

                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();
                  }

                }///////////////////////trading_type end


              }//////////////////// second_profit end

              //////////////////// third_profit  
              else if (userFind?.third_profit !== null && TradeData?.Time === 120) {


                const user_third_profit = parseFloat(userFind?.third_profit);

                if (userFind?.trading_type === "Win") {///////////////////////trading_type

                  const updateData = async () => {
                    const amount = userAmount + (parseFloat(parseFloat(user_third_profit) * userAmount) / 100);
                    const storeData = {
                      Result_Amount: amount,
                      Result: 'Win',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, amount, 'Win');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();



                } else if (userFind?.trading_type === "Lose") {//////////////////// trading_type else
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: 0,
                      Result: 'Loss',
                      Status: 1,
                    }

                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();
                } else if (userFind?.trading_type === "Draw") {
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: userAmount,
                      Result: 'Draw',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();

                } else {

                  if (cryptoTradePrice === userTradePrice) {////////// draw section

                    const updateData = async () => {
                      const storeData = {
                        Result_Amount: userAmount,
                        Result: 'Draw',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();

                  } else if (HighLow === 'Low' && cryptoTradePrice < userTradePrice) {//////win section

                    const updateData = async () => {
                      const amount = userAmount + (parseFloat(parseFloat(user_third_profit) * userAmount) / 100);
                      const storeData = {
                        Result_Amount: amount,
                        Result: 'Win',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, amount, 'Win');
                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();

                  } else if (HighLow === 'High' && cryptoTradePrice > userTradePrice) { //// win section

                    const updateData = async () => {
                      const amount = userAmount + (parseFloat(parseFloat(user_third_profit) * userAmount) / 100);
                      const storeData = {
                        Result_Amount: amount,
                        Result: 'Win',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, amount, 'Win');

                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();
                  } else {
                    const updateData = async () => {
                      const storeData = {
                        Result_Amount: 0,
                        Result: 'Loss',
                        Status: 1,
                      }

                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();
                  }

                }///////////////////////trading_type end




              }//////////////////// third_profit   end
              //////////////////// fourth_profit
              else if (userFind?.fourth_profit !== null && TradeData?.Time === 300) {

                const user_fourth_profit = parseFloat(userFind?.fourth_profit);

                if (userFind?.trading_type === "Win") {///////////////////////trading_type

                  const updateData = async () => {
                    const amount = userAmount + (parseFloat(parseFloat(user_fourth_profit) * userAmount) / 100);
                    const storeData = {
                      Result_Amount: amount,
                      Result: 'Win',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, amount, 'Win');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();



                } else if (userFind?.trading_type === "Lose") {//////////////////// trading_type else
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: 0,
                      Result: 'Loss',
                      Status: 1,
                    }

                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();
                } else if (userFind?.trading_type === "Draw") {
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: userAmount,
                      Result: 'Draw',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();

                } else {

                  if (cryptoTradePrice === userTradePrice) {////////// draw section

                    const updateData = async () => {
                      const storeData = {
                        Result_Amount: userAmount,
                        Result: 'Draw',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();

                  } else if (HighLow === 'Low' && cryptoTradePrice < userTradePrice) {//////win section

                    const updateData = async () => {
                      const amount = userAmount + (parseFloat(parseFloat(user_fourth_profit) * userAmount) / 100);
                      const storeData = {
                        Result_Amount: amount,
                        Result: 'Win',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, amount, 'Win');
                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();

                  } else if (HighLow === 'High' && cryptoTradePrice > userTradePrice) { //// win section

                    const updateData = async () => {
                      const amount = userAmount + (parseFloat(parseFloat(user_fourth_profit) * userAmount) / 100);
                      const storeData = {
                        Result_Amount: amount,
                        Result: 'Win',
                        Status: 1,
                      }

                      TransactionsTradeLogResults(TradeData, amount, 'Win');

                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();
                  } else {
                    const updateData = async () => {
                      const storeData = {
                        Result_Amount: 0,
                        Result: 'Loss',
                        Status: 1,
                      }

                      await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                    }
                    updateData();
                  }

                }///////////////////////trading_type end




              }//////////////////// fourth_profit end

              else { ///////////////////////////////////////////////////////////// real
                if (cryptoTradePrice === userTradePrice) {////////// draw section

                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: userAmount,
                      Result: 'Draw',
                      Status: 1,
                    }

                    TransactionsTradeLogResults(TradeData, userAmount, 'Draw');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

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

                    TransactionsTradeLogResults(TradeData, amount, 'Win');
                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

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

                    TransactionsTradeLogResults(TradeData, amount, 'Win');

                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();
                } else {
                  const updateData = async () => {
                    const storeData = {
                      Result_Amount: 0,
                      Result: 'Loss',
                      Status: 1,
                    }

                    await TradeLogModels.findByIdAndUpdate(query, storeData, option);

                  }
                  updateData();
                }


              }



            });

        };


        apiCall();

      }

    } catch (error) {
      console.log(error);
    }
  };
  TradeLogCron().catch(error => console.log(error));

});


