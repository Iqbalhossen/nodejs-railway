const MiningModels = require('../../../models/Mining/MiningModels');
const UserMiningModels = require('../../../models/UserMining/UserMiningModels');
const userModels = require('../../../models/userModels');
const { TransactionsMining } = require('../../../commonfile/Transactions/Transactions');

const { ObjectId } = require('mongodb');
var moment = require('moment');


const UserMiningView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const timeObject = new Date();
        const findDate = moment(timeObject).format('MM-DD-YYYY');

        const data = await MiningModels.find
            (
                {
                    expired_time: {
                        $gte: findDate,
                    }
                }
            ).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await MiningModels.find(
            {
                expired_time: {
                    $gte: findDate,
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

const UserMiningSingleView = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await MiningModels.findOne(query)
        res.status(201).json({
            success: true,
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};



const UserMiningStore = async (req, res) => {
    try {
        const { user_id, amount } = req.body;
        const old_id = req.params.id;
        const timeObject = new Date();
        const findDate = moment(timeObject).format('MM-DD-YYYY');
        const FixedDepositQuery = { _id: new ObjectId(old_id), expired_time: { $gte: findDate, } };
        const ExsitsData = await MiningModels.findOne(FixedDepositQuery);
        const FindUserQuery = { _id: new ObjectId(user_id) };
        const FindUser = await userModels.findOne(FindUserQuery);


        if (amount === '' || amount === undefined) {
            res.status(400).json({
                success: false,
                message: `Amount field is required`,
            });
        }
        if (ExsitsData) {

            if (parseFloat(ExsitsData?.min_amount) > parseFloat(amount)) {
                res.status(400).json({
                    success: false,
                    message: `Minimum amount ${ExsitsData?.min_amount}$`,
                });
            } else if (parseFloat(ExsitsData?.max_amount) < parseFloat(amount)) {
                res.status(400).json({
                    success: false,
                    message: `Maximum amount ${ExsitsData?.max_amount}$`,
                });
            } else {
                if (parseFloat(parseFloat(FindUser.balance) - parseFloat(amount)) >= 0) {

                    if (ExsitsData?.period_type === "Hours") {
                        const userProfitAmount = (parseFloat(amount) + ((parseFloat(amount) * parseFloat(ExsitsData?.profit) / 100)));
                        const data = Date.now();
                        const periodTime = parseFloat(ExsitsData?.period)
                        const AddDate = new Date(data + periodTime * 60 * 60 * 1000);
                        const findDate = moment(AddDate).format('DD-MM-YYYY, h:mm:ss a');
                        const storeData = {
                            user_id: user_id,
                            promotion_name: ExsitsData?.promotion_name,
                            name: ExsitsData?.name,
                            amount,
                            profit_amount: userProfitAmount,
                            period_type: ExsitsData?.period_type,
                            period: ExsitsData?.period,
                            expired_time: findDate,
                        }
                        // tran 
                        TransactionsMining(FindUser, storeData);
                        // tran 
                        await UserMiningModels.create(storeData);
                        res.status(201).json({
                            success: true,
                            message: "Mining successfull",
                            data: storeData,
                        });

                    }


                    if (ExsitsData?.period_type === "Day") {
                        const userProfitAmount = (parseFloat(amount) + ((parseFloat(amount) * parseFloat(ExsitsData?.profit) / 100)));
                        const data = Date.now();
                        const periodTime = parseFloat(ExsitsData?.period)
                        const AddDate = new Date(data + periodTime * 24 * 60 * 60 * 1000);
                        const findDate = moment(AddDate).format('DD-MM-YYYY, h:mm:ss a');
                        const storeData = {
                            user_id: user_id,
                            promotion_name: ExsitsData?.promotion_name,
                            name: ExsitsData?.name,
                            amount,
                            profit_amount: userProfitAmount,
                            period_type: ExsitsData?.period_type,
                            period: ExsitsData?.period,
                            expired_time: findDate,
                        }
                        // tran 
                        TransactionsMining(FindUser, storeData);
                        // tran 
                        await UserMiningModels.create(storeData);
                        res.status(201).json({
                            success: true,
                            message: "Mining successfull",
                            data: storeData,
                        });

                    }

                    if (ExsitsData?.period_type === "Months") {
                        const userProfitAmount = (parseFloat(amount) + ((parseFloat(amount) * parseFloat(ExsitsData?.profit) / 100)));
                        const data = Date.now();
                        const periodTime = parseFloat(ExsitsData?.period)
                        const AddDate = new Date(data + periodTime * 30 * 24 * 60 * 60 * 1000);
                        const findDate = moment(AddDate).format('DD-MM-YYYY, h:mm:ss a');
                        const storeData = {
                            user_id: user_id,
                            promotion_name: ExsitsData?.promotion_name,
                            name: ExsitsData?.name,
                            amount,
                            profit_amount: userProfitAmount,
                            period_type: ExsitsData?.period_type,
                            period: ExsitsData?.period,
                            expired_time: findDate,
                        }
                        // tran 
                        TransactionsMining(FindUser, storeData);
                        // tran 
                        await UserMiningModels.create(storeData);
                        res.status(201).json({
                            success: true,
                            message: "Mining successfull",
                            data: storeData,
                        });

                    }


                } else {
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


const UserMiningHistroy = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;
        const id = req.params.id;
        const data = await UserMiningModels.find({user_id:id}).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await UserMiningModels.find({user_id:id});
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

module.exports = { UserMiningView, UserMiningSingleView, UserMiningStore, UserMiningHistroy };
