const LoanModels = require('../../../models/Loan/LoanModels');
const userModels = require('../../../models/userModels');
const { ObjectId } = require('mongodb');
var moment = require('moment');

const UserLoanView = async (req, res) => {
    try {

        const timeObject = new Date();
        const findDate = moment(timeObject).format('MM-DD-YYYY');

        const data = await LoanModels.find
            (
                {
                    expired_time: {
                        $gte: findDate,
                        // $lte: "2021-02-15",
                    }
                }
            ).sort('-createdAt');
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const UserLoanStore = async (req, res) => {
    try {

        const data = req.body;
        const user_id = req.params.id;
        const query = { _id: new ObjectId(user_id) };      
        const UserData = await userModels.findOne(query);
        if(UserData && UserData.kv === true){          
            const results = await LoanModels.create({...data, user_id:user_id});
            res.status(201).json({
                success: true,
                message:"Loan pending successfull",
                data: results,
            });
        }else{
            res.status(400).json({
                success: true,
                message:"At First KYC verified",
            }); 
        }
        

    } catch (error) {
        console.log(error);
    }
};

const UserLoanHistory = async (req, res) => {
    try {
        const user_id = req.params.id;
        const data = await LoanModels.find({user_id:user_id}).sort('-createdAt')
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};


module.exports = { UserLoanView, UserLoanStore, UserLoanHistory };
