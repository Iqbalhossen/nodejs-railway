const ManualGatewaysModels = require('../../../models/PaymentGateways/ManualGateways');
const DepositModelsModels = require('../../../models/Deposit/DepositModels');
const UserModels = require('../../../models/userModels');
const sharp = require('sharp');
const fs = require('fs');
const { ObjectId } = require('mongodb');
// Home Bouns Store section 
const UserManualGatewaysView = async (req, res) => {
    try {

        const data = await ManualGatewaysModels.find({ Status: 1 });
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const UserManualGatewaysViewById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const data = await ManualGatewaysModels.findOne(query);
        res.status(201).json({
            success: true,
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};

const UserManualGatewaysDeposit = async (req, res) => {
    try {
        const data = req.body;
        const userAmount = (parseFloat(data.GatewayData.amount) * parseFloat(data?.GatewayData?.Rate))
        const FixedCharge = parseFloat(data.GatewayData.FixedCharge);
        const PercentCharge = parseFloat(data.GatewayData.PercentCharge);

        const query = { _id: new ObjectId(data?.user_id) };
        const FindUser = await UserModels.findOne(query);

        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/')
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(600, 600, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

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


        // //// Fixed Charge deposit area   /////////////////
        if (FixedCharge > 0 && PercentCharge <= 0) {

            const storeData = {
                user_name: FindUser.name,
                user_id: data.user_id,
                GatewayName: data.GatewayData.GatewayName,
                Transaction: RandomTransaction(15),
                Amount: userAmount - FixedCharge,
                AmountWithVat: userAmount,
                Conversion: data?.GatewayData?.Rate,
                screenshot: `./public/data/uploads/${fileName}`,
                NetworkType: 'ERC20',
                Status: 0,
            }

            await DepositModelsModels.create(storeData);
            res.status(201).json({
                success: true,
                message: `Deposit Pending`,
                data: storeData,
            });


            ///// Percent Charge deposit area     ////////////////
        } else if (FixedCharge <= 0 && PercentCharge > 0) {

            const ChargeAmount = ((PercentCharge * userAmount ) / 100)

            const storeData = {
                user_name: FindUser.name,
                user_id: data.user_id,
                GatewayName: data.GatewayData.GatewayName,
                Transaction: RandomTransaction(15),
                Amount: userAmount - ChargeAmount,
                AmountWithVat: userAmount,
                Conversion: data?.GatewayData?.Rate,
                screenshot: `./public/data/uploads/${fileName}`,
                NetworkType: 'ERC20',
                Status: 0,
            }
            await DepositModelsModels.create(storeData);
            res.status(201).json({
                success: true,
                message: `Deposit Pending`,
                data: storeData,
            });


        } else {  ///// without charge area   ////////

            const storeData = {
                user_name: FindUser.name,
                user_id: data.user_id,
                GatewayName: data.GatewayData.GatewayName,
                Transaction: RandomTransaction(15),
                Amount: userAmount,
                AmountWithVat: userAmount,
                Conversion: data?.GatewayData?.Rate,
                screenshot: `./public/data/uploads/${fileName}`,
                NetworkType: 'ERC20',
                Status: 0,
            }

            await DepositModelsModels.create(storeData);
            res.status(201).json({
                success: true,
                message: `Deposit Pending`,
                data: storeData,
            });

        }


    } catch (error) {
        console.log(error);
    }
};
const UserManualGatewaysDepositView = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await DepositModelsModels.find({ user_id: id });
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};



module.exports = { UserManualGatewaysView, UserManualGatewaysViewById, UserManualGatewaysDeposit, UserManualGatewaysDepositView };
