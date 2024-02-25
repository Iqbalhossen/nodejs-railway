const FixedDepositModels = require('../../../models/FixedDeposit/FixedDepositModels');
const UserFixedDeposit = require('../../../models/UserFixedDeposit/UserFixedDeposit');
const userModels = require('../../../models/userModels');
const { TransactionsFixedDeposit } = require('../../../commonfile/Transactions/Transactions');
const { ObjectId } = require('mongodb');
var moment = require('moment');

const UserFixedDepositView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;
        const timeObject = new Date();
        const findDate = moment(timeObject).format('MM-DD-YYYY');

        const data = await FixedDepositModels.find
            (
                {
                    expired_time: {
                        $gte: findDate,
                        // $lte: "2021-02-15",
                    }
                }
            ).sort('-createdAt').skip(skip).limit(limit);
            const dataLength = await FixedDepositModels.find( {
                expired_time: {
                    $gte: findDate,
                    // $lte: "2021-02-15",
                }
            });
            const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
            res.status(201).json({
                success: true,
                data,
                length: dataLength.length,
                page,
                limit,
                pageCount,
            });

    } catch (error) {
        console.log(error);
    }
};

const UserFixedDepositSingleView = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await FixedDepositModels.findOne(query)
        res.status(201).json({
            success: true,
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};

const UserFixedDepositStore = async (req, res) => {
    try {
        const { user_id, amount } = req.body;
        const old_id = req.params.id;
        const timeObject = new Date();
        const findDate = moment(timeObject).format('MM-DD-YYYY');
        const FixedDepositQuery = { _id: new ObjectId(old_id), expired_time: { $gte: findDate, } };
        const ExsitsData = await FixedDepositModels.find(FixedDepositQuery);
        const FindUserQuery = { _id: new ObjectId(user_id) };
        const FindUser = await userModels.findOne(FindUserQuery);

        if(amount === '' || amount === undefined){
            res.status(400).json({
                success: false,
                message: `Amount field is required`,
            });
        }
        if (ExsitsData.length !== 0) {

            if(parseFloat(ExsitsData[0]?.min_amount) > parseFloat(amount)){
                res.status(400).json({
                    success: false,
                    message: `Minimum amount ${ExsitsData[0]?.min_amount}$`,
                });
            }else if(parseFloat(ExsitsData[0]?.max_amount) < parseFloat(amount)){
                res.status(400).json({
                    success: false,
                    message: `Maximum amount ${ExsitsData[0]?.max_amount}$`,
                });
            }else{
                if(parseFloat(parseFloat(FindUser.balance) - parseFloat(amount) ) >= 0){
                    const userProfitAmount = (parseFloat(amount) + ((parseFloat(amount) * parseFloat(ExsitsData[0]?.profit) / 100)));
                    const data = Date.now();
                    const periodTime = parseFloat(ExsitsData[0]?.period)
                    const AddDate = new Date(data + periodTime * 24 * 60 * 60 * 1000);
                    const findDate = moment(AddDate).format('DD-MM-YYYY, h:mm:ss a');
                    const storeData = {
                        user_id: user_id,
                        promotion_name: ExsitsData[0]?.promotion_name,
                        name: ExsitsData[0]?.name,
                        amount,
                        profit_amount: userProfitAmount,
                        period: ExsitsData[0]?.period,
                        expired_time: findDate,
                    }
                    // tran 
                    TransactionsFixedDeposit(FindUser, storeData);
                    // tran 
                    await UserFixedDeposit.create(storeData);
                    res.status(201).json({
                        success: true,
                        message: "Fixed deposit successfull",
                        data: storeData,
                    });
                }else{
                    res.status(400).json({
                        success: false,
                        message: `Amount low`,
                    });
                }
               
    
                
            }

            

        } else {
            res.status(400).json({
                success: false,
                message: `Expired`,
            });
        }


    } catch (error) {
        console.log(error);
    }
};


const UserFixedDepositStoreView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;
        const id = req.params.id;
      
        const data = await UserFixedDeposit.find({user_id: id}).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await UserFixedDeposit.find({user_id: id});
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount,
        });
 

    } catch (error) {
        console.log(error);
    }
};



module.exports = { UserFixedDepositView, UserFixedDepositSingleView, UserFixedDepositStore, UserFixedDepositStoreView };
