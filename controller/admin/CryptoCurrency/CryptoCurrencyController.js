const CryptoCurrencyModels = require('../../../models/CryptoCurrency/CryptoCurrencyModels');
const sharp = require('sharp');
const fs = require('fs');
const { ObjectId } = require('mongodb');
// Home Bouns Store section 
const AdminCryptoCurrencyView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await CryptoCurrencyModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await CryptoCurrencyModels.find();
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


const AdminCryptoCurrencyAdd = async (req, res) => {
    try {
        const data = req.body;
        const name = data?.Name;
        const symbol= (data?.Symbol).toUpperCase();
        const currency= (data?.currency).toUpperCase();
        console.log(symbol)
        console.log(currency)
        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/')
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(400, 400, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

        const storeData = { Name: name, Symbol: symbol, currency: currency, image: `public/data/uploads/${fileName}`, Status: 1 }
        const results = await CryptoCurrencyModels.create(storeData);
        res.status(201).json({
            success: true,
            message: "Crypto Currency  add successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminCryptoCurrencyInableDisable = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await CryptoCurrencyModels.findOne(query);
        const option = { upsert: true };

        if (data?.Status === 0) {
            const status = { Status: 1 }
            const results = await CryptoCurrencyModels.findByIdAndUpdate(query, status, option);
            res.status(201).json({
                success: true,
                message: "Enable successfully",
                data: results,
            });
        } else {
            const status = { Status: 0 }
            const results = await CryptoCurrencyModels.findByIdAndUpdate(query, status, option);
            res.status(201).json({
                success: true,
                message: "Disabled successfully",
                data: results,
            });
        }


    } catch (error) {
        console.log(error);
    }
};
const AdminCryptoCurrencyEdit = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await CryptoCurrencyModels.findOne(query);
        res.status(201).json({
            success: true,
            message: "Manual Gateways Edit successfully",
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminCryptoCurrencyUpdate = async (req, res) => {
    try {
        const data = req.body;
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        
        if (req.file) {
            fs.access('./public/data/uploads/', (err) => {
                if (err) {
                    fs.mkdirSync('./public/data/uploads/')
                }
            });
            const formatedName = req.file.originalname.split(' ').join('-');
            const fileName = `${Date.now()}-${formatedName}`
            await sharp(req.file.buffer).resize(400, 400, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`); 
            const existsdata = await CryptoCurrencyModels.findOne(query);
            if (existsdata) {
                fs.unlinkSync(existsdata.image);
            }

            const storeData = { ...data, image: `public/data/uploads/${fileName}` }
            const results = await CryptoCurrencyModels.findByIdAndUpdate(query, storeData, option);
            res.status(201).json({
                success: true,
                message: "Crypto Currency Update successfully",
                data: results,
            });

        } else {
            const results = await CryptoCurrencyModels.findByIdAndUpdate(query, data, option);
            res.status(201).json({
                success: true,
                message: "Crypto Currency Update successfully",
                data: results,
            });
        }



    } catch (error) {
        console.log(error);
    }
};

const AdminCryptoCurrencyDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const existsdata = await CryptoCurrencyModels.findOne(query);

        if (existsdata) {
            fs.unlinkSync(existsdata.image);
        }
        const results = await CryptoCurrencyModels.findByIdAndDelete(query);
        res.status(201).json({
            success: true,
            message: "Crypto Currency Delete successfully",
            data: results
        });


    } catch (error) {
        console.log(error);
    }
};



const AdminCryptoCurrencySingleView = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id), Status: 1 };
        const data = await CryptoCurrencyModels.findOne(query);
        res.status(201).json({
            success: true,
            message: "Manual Gateways Edit successfully",
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};


module.exports = { AdminCryptoCurrencyView, AdminCryptoCurrencyAdd, AdminCryptoCurrencyInableDisable, AdminCryptoCurrencyDelete, AdminCryptoCurrencyUpdate, AdminCryptoCurrencySingleView};
