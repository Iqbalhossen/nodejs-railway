const FixedDepositModels = require('../../../models/FixedDeposit/FixedDepositModels');

const { ObjectId } = require('mongodb');
var moment = require('moment');
const sharp = require('sharp');
const fs = require('fs');

const AdminFixedDepositView = async (req, res) => {
    try {

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
            );
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminFixedDepositStore = async (req, res) => {
    try {
        const { promotion_name, name, profit, period, min_amount, max_amount, expired_time, dis } = req.body;
        const timeObject = new Date(expired_time);

        const findDate = moment(timeObject).format('MM-DD-YYYY');


        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/');
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(184, 184, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

        const storeData = { promotion_name, name, profit, period, min_amount, max_amount, dis, expired_time: findDate, image: `public/data/uploads/${fileName}` }
        await FixedDepositModels.create(storeData);
        res.status(201).json({
            success: true,
            message: "Fixed deposit create successfull",
            data: storeData,
        });


    } catch (error) {
        console.log(error);
    }
};


const AdminFixedDepositSingleView = async (req, res) => {
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

const AdminFixedDepositUpdate = async (req, res) => {
    try {

        const file = req.file;
        const old_id = req.params.id;
        const filter = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const data = req.body;


        if (file !== undefined) {
            if (data.expired_time === undefined) {
                
                fs.access('./public/data/uploads/', (err) => {
                    if (err) {
                        fs.mkdirSync('./public/data/uploads/');
                    }
                });

                const existsData = await FixedDepositModels.findOne({ _id: new ObjectId(old_id) });
                if (existsData) {
                    fs.unlinkSync(existsData.image);
                }

                const formatedName = req.file.originalname.split(' ').join('-');
                const fileName = `${Date.now()}-${formatedName}`
                await sharp(req.file.buffer).resize(184, 184, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

                const storeData = { ...data, image: `public/data/uploads/${fileName}` }
                await FixedDepositModels.findByIdAndUpdate(filter, storeData, option);
                res.status(201).json({
                    success: true,
                    message: "Fixed deposit update successfull",
                    data: storeData,
                });

            } else {

                const timeObject = new Date(data.expired_time);
                const findDate = moment(timeObject).format('MM-DD-YYYY');

                fs.access('./public/data/uploads/', (err) => {
                    if (err) {
                        fs.mkdirSync('./public/data/uploads/');
                    }
                });

                const existsData = await FixedDepositModels.findOne({ _id: new ObjectId(old_id) });
                if (existsData) {
                    fs.unlinkSync(existsData.image);
                }

                const formatedName = req.file.originalname.split(' ').join('-');
                const fileName = `${Date.now()}-${formatedName}`
                await sharp(req.file.buffer).resize(184, 184, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

                const storeData = {expired_time:findDate, ...data, image: `public/data/uploads/${fileName}` }
                await FixedDepositModels.findByIdAndUpdate(filter, storeData, option);
                res.status(201).json({
                    success: true,
                    message: "Fixed deposit update successfull",
                    data: storeData,
                });

            }


        } else {

            if (data.expired_time === undefined) {
                const storeData = { ...data, }
                await FixedDepositModels.findByIdAndUpdate(filter, storeData, option);
                res.status(201).json({
                    success: true,
                    message: "Fixed deposit update successfull",
                    data: storeData,
                });
            }else{
                const timeObject = new Date(data.expired_time);
                const findDate = moment(timeObject).format('MM-DD-YYYY');
                
                const storeData = {expired_time:findDate, ...data }
                await FixedDepositModels.findByIdAndUpdate(filter, storeData, option);
                res.status(201).json({
                    success: true,
                    message: "Fixed deposit update successfull",
                    data: storeData,
                });

            }

        }


    } catch (error) {
        console.log(error);
    }
};


const AdminFixedDepositDelete = async (req, res) => {
    // console.log(deposit);

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const existsdata = await FixedDepositModels.findOne({ _id: new ObjectId(id) });
        if (existsdata) {
            fs.unlinkSync(existsdata.image);
        }

        const results = await FixedDepositModels.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "Fixed Deposit Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};


module.exports = { AdminFixedDepositView, AdminFixedDepositStore, AdminFixedDepositSingleView, AdminFixedDepositUpdate, AdminFixedDepositDelete };
