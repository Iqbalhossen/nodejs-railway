const TestimonialTitleModels = require('../../../models/Testimonial/TestimonialTitleModels');
const TestimonialModels = require('../../../models/Testimonial/TestimonialModels');

const { ObjectId } = require('mongodb');
const sharp = require('sharp');
const fs = require('fs');

// Testimonia lTitle section 
const AdminTestimonialTitleView = async (req, res) => {
    try {
        const data = await TestimonialTitleModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminTestimonialTitleStore = async (req, res) => {
    try {
        const { title } = req.body;
        const existsData = await TestimonialTitleModels.findOne();
        if (existsData) {
            const filter = { _id: new ObjectId(existsData?._id) };
            const option = { upsert: true };

            const results = await TestimonialTitleModels.findByIdAndUpdate(filter, { title: title }, option);
            res.status(201).json({
                success: true,
                message: "Testimonial update successfull",
                data: results,
            });
        } else {
            const results = await TestimonialTitleModels.create({ title: title });
            res.status(201).json({
                success: true,
                message: "Testimonial update successfull",
                data: results,
            });

        }

    } catch (error) {
        console.log(error);
    }
};



// // Testimonial section 
const AdminTestimonialView = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await TestimonialModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await TestimonialModels.find();
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


const AdminTestimonialStore = async (req, res) => {
    try {
        const { name, company, position, rating, dis } = req.body;
        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/');
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(500, 350, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

        const storeData = { name, company, position, rating, dis, image: `public/data/uploads/${fileName}`, created_at: new Date() }
        await TestimonialModels.create(storeData);
        res.status(201).json({
            success: true,
            message: "Testimonial create successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};



const AdminTestimonialViewById = async (req, res) => {

    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await TestimonialModels.find(query);

        res.status(201).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};
const AdminTestimonialUpdate = async (req, res) => {

    try {
        const data = req.body;
        const old_id = req.params.id;

        if(req.file.buffer){
            fs.access('./public/data/uploads/', (err) => {
                if (err) {
                    fs.mkdirSync('./public/data/uploads/')
                }
            });
    
            const formatedName = req.file.originalname.split(' ').join('-');
            const fileName = `${Date.now()}-${formatedName}`
            await sharp(req.file.buffer).resize(500, 350, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);
            const existsImage = await TestimonialModels.findOne({ _id: new ObjectId(old_id) });
            if(existsImage){
                fs.unlinkSync(existsImage.image);
    
            }
    
            const filter = { _id: new ObjectId(old_id) };
            const option = { upsert: true };
            const storeData = {...data, image: `public/data/uploads/${fileName}` }
    
    
            const results = await TestimonialModels.findByIdAndUpdate(filter, storeData, option);
    
            res.status(201).json({
                success: true,
                message: "Testimonial update successfully",
                data: results,
            });
        }else{
    
            const results = await TestimonialModels.findByIdAndUpdate(filter, data, option);
    
            res.status(201).json({
                success: true,
                message: "Testimonial update successfully",
                data: results,
            });
        }

        
    } catch (error) {
        console.log(error);
    }
};

const AdminTestimonialDelete = async (req, res) => {

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const existsdata = await TestimonialModels.findOne({ _id: new ObjectId(id) });
        if (existsdata) {
            fs.unlinkSync(existsdata.image);
        }

        const results = await TestimonialModels.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "Testimonial Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};


module.exports = { AdminTestimonialTitleView, AdminTestimonialTitleStore, AdminTestimonialView, AdminTestimonialStore, AdminTestimonialViewById, AdminTestimonialUpdate, AdminTestimonialDelete };
