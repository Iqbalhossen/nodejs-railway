const HeaderModels = require('../../../models/setting/HeaderModels');
const FooterModels = require('../../../models/setting/FooterModels');
const NewsletterModels = require('../../../models/setting/NewsletterModels');
const SocialSupportModels = require('../../../models/SocialSupport/SocialSupportModels');
const sharp = require('sharp');
const fs = require('fs');
const { ObjectId } = require('mongodb');
// Home Bouns Store section 
const FooterUpdate = async (req, res) => {
    try {
        const data = req.body;
        const image = req?.file?.path;
        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/')
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(160, 55, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

        const existsdata = await FooterModels.findOne();
        if (existsdata) {
            fs.unlinkSync(existsdata?.logo);
        }
        // const storeData = { logo:`./public/data/uploads/${fileName}`, dis: data.dis, email: data.email, phone: data.phone,  address: data.address,  created_at: new Date() }

        const storeData = { logo: `public/data/uploads/${fileName}`, dis: data.dis, email: data.email, phone: data.phone, address: data.address, created_at: new Date() }

        if (!existsdata) {
            await FooterModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "footer update successfull",
                data: storeData,
            });
        } else {

            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await FooterModels.findByIdAndUpdate(filter, storeData, option);
            res.status(201).json({
                success: true,
                message: "footer update successfull",
                data: storeData,
            });

        }


    } catch (error) {
        console.log(error);
    }
};
// Home Bouns Store section 
const HeaderUpdate = async (req, res) => {
    try {
        const image = req?.file?.path;
        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/')
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(160, 55, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

        const existsdata = await HeaderModels.findOne();
        if (existsdata) {
            fs.unlinkSync(existsdata?.logo);
        }
        const storeData = { logo: `public/data/uploads/${fileName}`, fav_icon: "aa", created_at: new Date() }

        if (!existsdata) {
            await HeaderModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "footer update successfull",
                data: storeData,
            });
        } else {

            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await HeaderModels.findByIdAndUpdate(filter, storeData, option);
            res.status(201).json({
                success: true,
                message: "footer update successfull",
                data: storeData,
            });

        }


    } catch (error) {
        console.log(error);
    }
};


// Newsletter Store section 
const NewsletterUpdate = async (req, res) => {
    try {
        const data = req.body;

        const storeData = { dis: data.dis, created_at: new Date() }
        const existsdata = await HeaderModels.findOne();

        if (!existsdata) {
            await NewsletterModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "Newsletter update successfull",
                data: storeData,
            });
        } else {

            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await NewsletterModels.findByIdAndUpdate(filter, storeData, option);
            res.status(201).json({
                success: true,
                message: "Newsletter update successfull",
                data: storeData,
            });

        }


    } catch (error) {
        console.log(error);
    }
};
// Social Support Store section 
const SocialSupportView = async (req, res) => {
    try {
        const data = await SocialSupportModels.findOne();
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(error);
    }
};
const SocialSupportStore = async (req, res) => {
    try {
        const data = req.body;
        const ExsitData = await SocialSupportModels.findOne();
        if(!ExsitData){
            const results = await SocialSupportModels.create(data);
            res.status(201).json({
                success: true,
                message: "Social Support  update successfull",
                data,
            });
        }else{
            
            const filter = { _id: new ObjectId(ExsitData._id) };
            const option = { upsert: true };
            const results = await SocialSupportModels.findByIdAndUpdate(filter, data, option);
            res.status(201).json({
                success: true,
                message: "Social Support  update successfull",
                data,
            });
        }
      
    } catch (error) {
        console.log(error);
    }
};


// Home Bouns Store section End


module.exports = { FooterUpdate, HeaderUpdate, NewsletterUpdate, SocialSupportView, SocialSupportStore };
