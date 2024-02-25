const MiningModels = require('../../../models/Mining/MiningModels');
const UserMiningModels = require('../../../models/UserMining/UserMiningModels');

const { ObjectId } = require('mongodb');
var moment = require('moment');
const sharp = require('sharp');
const fs = require('fs');

const AdminMiningView = async (req, res) => {
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
                        // $lte: "2021-02-15",
                    }
                }
            ).sort('-createdAt').skip(skip).limit(limit);
            const dataLength = await MiningModels.find({
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

const AdminMiningStore = async (req, res) => {
    try {
        const { promotion_name, name, profit, period, period_type, min_amount, max_amount, expired_time, dis } = req.body;

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

        const storeData = { promotion_name, name, profit, period, period_type, min_amount, max_amount, dis, expired_time: findDate, image: `public/data/uploads/${fileName}` }
        await MiningModels.create(storeData);
        res.status(201).json({
            success: true,
            message: "Mining create successfull",
            data: storeData,
        });


    } catch (error) {
        console.log(error);
    }
};


const AdminMiningSingleView = async (req, res) => {
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

const AdminMiningUpdate = async (req, res) => {
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

                const existsData = await MiningModels.findOne({ _id: new ObjectId(old_id) });
                if (existsData) {
                    fs.unlinkSync(existsData.image);
                }

                const formatedName = req.file.originalname.split(' ').join('-');
                const fileName = `${Date.now()}-${formatedName}`
                await sharp(req.file.buffer).resize(184, 184, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

                const storeData = { ...data, image: `public/data/uploads/${fileName}` }
                await MiningModels.findByIdAndUpdate(filter, storeData, option);
                res.status(201).json({
                    success: true,
                    message: "Mining update successfull",
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

                const existsData = await MiningModels.findOne({ _id: new ObjectId(old_id) });
                if (existsData) {
                    fs.unlinkSync(existsData.image);
                }

                const formatedName = req.file.originalname.split(' ').join('-');
                const fileName = `${Date.now()}-${formatedName}`
                await sharp(req.file.buffer).resize(184, 184, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

                const storeData = { expired_time: findDate, ...data, image: `public/data/uploads/${fileName}` }
                await MiningModels.findByIdAndUpdate(filter, storeData, option);
                res.status(201).json({
                    success: true,
                    message: "Mining update successfull",
                    data: storeData,
                });

            }


        } else {

            if (data.expired_time === undefined) {
                const storeData = { ...data, }
                await MiningModels.findByIdAndUpdate(filter, storeData, option);
                res.status(201).json({
                    success: true,
                    message: "Mining update successfull",
                    data: storeData,
                });
            } else {
                const timeObject = new Date(data.expired_time);
                const findDate = moment(timeObject).format('MM-DD-YYYY');

                const storeData = { expired_time: findDate, ...data }
                await MiningModels.findByIdAndUpdate(filter, storeData, option);
                res.status(201).json({
                    success: true,
                    message: "Mining update successfull",
                    data: storeData,
                });

            }

        }


    } catch (error) {
        console.log(error);
    }
};


const AdminMiningDelete = async (req, res) => {
    // console.log(deposit);

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const existsdata = await MiningModels.findOne({ _id: new ObjectId(id) });
        if (existsdata) {
            fs.unlinkSync(existsdata.image);
        }

        const results = await MiningModels.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "Mining Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};




const AdminMiningExpiredView = async (req, res) => {
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
                        $lte: findDate,
                    }
                }
            ).sort('-createdAt').skip(skip).limit(limit);
            const dataLength = await MiningModels.find( {
                expired_time: {
                    $lte: findDate,
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


const AdminMiningAllView = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;


        const data = await MiningModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await MiningModels.find();
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


const AdminUserMiningRunningView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const timeObject = new Date();
        const findDate = moment(timeObject).format('MM-DD-YYYY, h:mm:ss a');

        const data = await UserMiningModels.find
            (
                {
                    expired_time: {
                        $gte: findDate,
                        // $lte: "2021-02-15",
                    }
                }
            ).sort('-createdAt').skip(skip).limit(limit);
            const dataLength = await UserMiningModels.find(
                {
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


const AdminUserMiningCompleteView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const timeObject = new Date();
        const findDate = moment(timeObject).format('MM-DD-YYYY, h:mm:ss a');

        const data = await UserMiningModels.find
            (
                {
                    expired_time: {
                        $lte: findDate,
                    }
                }
            ).sort('-createdAt').skip(skip).limit(limit);
            const dataLength = await UserMiningModels.find({
                expired_time: {
                    $lte: findDate,
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

const AdminUserMiningAllView = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await UserMiningModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await UserMiningModels.find();
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

module.exports = { AdminMiningView, AdminMiningStore, AdminMiningSingleView, AdminMiningUpdate, AdminMiningDelete, AdminMiningExpiredView, AdminMiningAllView, AdminUserMiningRunningView, AdminUserMiningCompleteView, AdminUserMiningAllView };
