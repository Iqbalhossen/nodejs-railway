const AdminModels = require('../../../models/Admin/AdminModels');
const userModels = require('../../../models/userModels');
const TradeLogModels = require('../../../models/TradeLog/TradeLogModels');
const DepositModels = require('../../../models/Deposit/DepositModels');
const WithdrawalModels = require('../../../models/Withdrawal/WithdrawalModels');
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');
const sharp = require('sharp');
const fs = require('fs');
const { adminSendForgetPasswordEmail } = require('../../../commonfile/email/UserForgetPasswordEmail');
// Home Bouns Store section 
const AdminRoleView = async (req, res) => {
    try {

        const data = await AdminModels.find();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminRoleStore = async (req, res) => {
    try {
        const data = req.body;
        const ExsitEmail = await AdminModels.findOne({ email: data.email });
        if (ExsitEmail) {
            res.status(401).json({
                success: false,
                message: "Email Already used",
            });
        } else {
            const results = await AdminModels.create(data);
            res.status(201).json({
                success: true,
                message: "Role Create successfull",
                data: results,
            });
        }



    } catch (error) {
        console.log(error);
    }
};

const AdminRoleViewById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id !== undefined) {
            const query = { _id: new ObjectId(id) };
            const data = await AdminModels.findOne(query);
            res.status(201).json({
                success: true,
                data: data,
            });
        }

    } catch (error) {
        console.log(error);
    }
};
const AdminRoleUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const results = await AdminModels.findByIdAndUpdate(filter, data, option);
        res.status(201).json({
            success: true,
            message: "Update successfull",
            data: results,
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminRoleDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const results = await AdminModels.findByIdAndDelete(query);
        res.status(201).json({
            success: true,
            message: "Delete successfull",
            data: results,
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminDashboardView = async (req, res) => {
    try {

        const TotalUser = await userModels.find();
        const ActiveUser = await userModels.find();
        const EmailUnverifyUser = await userModels.find({ is_verified: false });
        const MobileUnverifyUser = await userModels.find();


        const TotalTrade = await TradeLogModels.find();
        const WinTrade = await TradeLogModels.find({ Result: 'Win' });
        const LossTrade = await TradeLogModels.find({ Result: 'Loss' });
        const DrawTrade = await TradeLogModels.find({ Result: 'Draw' });

        const DepositBalanceArraySum = await DepositModels.aggregate([
            { $match: { Status: 1 } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }

        ]);

        const DepositBalanceSum = parseFloat(`${DepositBalanceArraySum[0] ? DepositBalanceArraySum[0].sum : 0}`);

        const PendingDeposit = await DepositModels.find({ Status: 0 });
        const RejectDeposit = await DepositModels.find({ Status: 2 });

        const WithdrawalAcceptArraySum = await WithdrawalModels.aggregate([
            { $match: { Status: 1 } },
            { $group: { _id: {}, sum: { $sum: "$AmountWithVat" } } }
        ]);

        const WithdrawalAcceptSum = parseFloat(`${WithdrawalAcceptArraySum[0] ? WithdrawalAcceptArraySum[0].sum : 0}`);

        const PendingWithdrawal = await WithdrawalModels.find({ Status: 0 });
        const RejectWithdrawal = await WithdrawalModels.find({ Status: 2 });



        const WithdrawalChart = await WithdrawalModels.aggregate([
            { $match: { Status: 1 } },
            {
              $group: {
                _id: {
                  month: { $month: '$Created_At' },
                  year: { $year: '$Created_At' }
                },
                sum: { $sum: "$AmountWithVat" }
              }
            },
            { $sort: { sum: -1, '_id.year': -1, '_id.month': -1 } },
            
          ])

        const DepositChart = await DepositModels.aggregate([
            { $match: { Status: 1 } },
            {
              $group: {
                _id: {
                  month: { $month: '$Created_At' },
                  year: { $year: '$Created_At' }
                },
                sum: { $sum: "$AmountWithVat" }
              }
            },
            { $sort: { sum: -1, '_id.year': -1, '_id.month': -1 } },
            
          ])

        res.status(201).json({
            success: true,
            TotalUser: TotalUser.length,
            ActiveUser: ActiveUser.length,
            EmailUnverifyUser: EmailUnverifyUser.length,
            MobileUnverifyUser: MobileUnverifyUser.length,
            TotalTrade: TotalTrade.length,
            WinTrade: WinTrade.length,
            LossTrade: LossTrade.length,
            DrawTrade: DrawTrade.length,
            DepositBalanceSum,
            PendingDeposit: PendingDeposit.length,
            RejectDeposit: RejectDeposit.length,
            WithdrawalAcceptSum,
            PendingWithdrawal: PendingWithdrawal.length,
            RejectWithdrawal: RejectWithdrawal.length,
            DepositChart,
            WithdrawalChart,
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminLogin = async (req, res) => {
    try {

        const data = req.body;


        if (data.email === undefined || data.email == '') {
            return res.status(400).json({
                success: false,
                message: "email field is required",
            });
        }
        if (data.password === undefined || data.password == '') {
            return res.status(400).json({
                success: false,
                message: "password field is required",
            });
        }



        const existsEmail = await AdminModels.findOne({ email: data.email });

        if (!existsEmail) {
            return res.status(400).json({
                success: false,
                message: "Email Invalid",
            });

        } else {
            const existspassword = await AdminModels.findOne({ email: data.email, password: data.password });
            if (!existspassword) {
                return res.status(400).json({
                    success: false,
                    message: "Password Invailid",
                });

            } else {
                let token = jwt.sign({
                    admin_email: existsEmail.email,
                    admin_id: existsEmail._id,
                },
                    'secret',
                    { expiresIn: '1h' }
                );

                const AdminData = { _id: existspassword._id, name: existspassword.name, }

                res.status(201).json({
                    success: true,
                    // message: "Login successful",
                    data: AdminData,
                    token: token,
                });

            }
        }



    } catch (error) {
        console.log(error);
    }
};


const AdminPasswordForGet = async (req, res) => {
    try {
        const data = req.body;

        if (data.email === undefined || data.email == '') {
            return res.status(400).json({
                success: false,
                message: "Email field is required",
            });
        }


        const existsEmail = await AdminModels.findOne({ email: data.email });

        if (!existsEmail) {
            return res.status(400).json({
                success: false,
                message: "Email not found",
            });
        } else {
            const secret = process.env.JWT_SECRET + existsEmail._id;
            const token = jwt.sign({ email: existsEmail.email, id: existsEmail._id }, secret, {
                expiresIn: "5m",
            });
            adminSendForgetPasswordEmail(existsEmail?.email, existsEmail?.name, existsEmail?._id, token)
            res.status(201).json({
                success: true,
                message: "Check your email inbox",
            });
        }



    } catch (error) {
        console.log(error);
    }


};


const AdminPasswordReset = async (req, res) => {
    try {
        const { id, token } = req.params;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };
        const existsEmail = await AdminModels.findOne(filter);
        const secret = process.env.JWT_SECRET + existsEmail._id;

        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    token_success: false,
                    message: "Token Expired",
                });
            }
        });


        if (!(data.password === data.cpassword)) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password does not match",
            });
        }
        const userData = { password: data?.password };
        const option = { upsert: true };
        await AdminModels.findByIdAndUpdate(filter, userData, option);
        res.status(201).json({
            success: true,
            message: "password change successfully",
        });

    } catch (error) {
        console.log(error);
    }


};


const AdminProfileUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };

        const existsdata = await AdminModels.findOne(filter);

        if (req.file === undefined) {   
            const storeData = { ...data }    
            const results = await AdminModels.findByIdAndUpdate(filter, storeData, option);
               res.status(201).json({
                success: true,
                message: "profile update successfull",
                data: results,
            });

        } else {


            fs.access('./public/data/uploads/', (err) => {
                if (err) {
                    fs.mkdirSync('./public/data/uploads/')
                }
            });
            const formatedName = req.file.originalname.split(' ').join('-');
            const fileName = `${Date.now()}-${formatedName}`
            await sharp(req.file.buffer).resize(400, 400, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

            if (existsdata.picture !== null) {
                fs.unlinkSync(existsdata.picture);
            }
            const storeData = { ...data, picture: `public/data/uploads/${fileName}` }
            const results = await AdminModels.findByIdAndUpdate(filter, storeData, option);
            res.status(201).json({
                success: true,
                message: "profile update successfull",
                data: results,
            });

        }
    } catch (error) {
        console.log(error);
    }


};

const AdminPasswordUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const existsdata = await AdminModels.findOne({password:data.old_password});
        if(existsdata){

            if(data.password === data.cpassword){
                const userData = { password: data?.password };
                await AdminModels.findByIdAndUpdate(filter, userData, option);
                res.status(201).json({
                    success: true,
                    message: "password change successfully",
                });
            }else{
                res.status(201).json({
                    success: false,
                    message: "password and confirm password does not match",
                });
            }

            
        }else{
            res.status(201).json({
                success: false,
                message: "Old password incorrect",
            });
        }

    } catch (error) {
        console.log(error);
    }


};


module.exports = { AdminRoleView, AdminRoleStore, AdminRoleViewById, AdminRoleUpdate, AdminRoleDelete, AdminDashboardView, AdminLogin, AdminPasswordForGet, AdminPasswordReset, AdminProfileUpdate, AdminPasswordUpdate };
