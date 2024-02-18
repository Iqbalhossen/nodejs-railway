const MenuModels = require('../../../models/frontend/menuModels');
const videosModels = require('../../../models/frontend/videosModels');
const bounsModels = require('../../../models/frontend/bounsModels');
const NoticesModel = require('../../../models/frontend/noticesModel');
const SliderModels = require('../../../models/frontend/sliderModels');
const OurProductsModels = require('../../../models/frontend/OurProductsModels');
const TradeAppModels = require('../../../models/frontend/tradeAppModels');
const CryptocurrenciesModels = require('../../../models/frontend/CryptocurrenciesModels');
const NewListingModels = require('../../../models/frontend/NewListingModels');
const ChooseGFFEXModels = require('../../../models/frontend/ChooseGFFEXModels');
const OurProductsTitle = require('../../../models/frontend/OurProductsTitle');
const CommunityModels = require('../../../models/frontend/CommunityModels');
const GffexAppModels = require('../../../models/frontend/GffexAppModels');
const CommunityBtn = require('../../../models/frontend/CommunityBtn');
const GffexAppBtn = require('../../../models/frontend/GffexAppBtn');
const SignUpToTradeBtnModel = require('../../../models/frontend/SignUpToTradeBtnModel');
const StartThradeBtnModels = require('../../../models/frontend/StartThradeBtnModels');
const { ObjectId } = require('mongodb');
const sharp = require('sharp');
const fs = require('fs');
// Menu section 
const MenuStore = async (req, res) => {

    try {
        const data = req.body;

        if (data.name === undefined) {
            return res.status(400).json({
                success: false,
                message: "menu name field is required",
            });
        }

        if (data.name === '') {
            return res.status(400).json({
                success: false,
                message: "menu name field is required",
            });
        }

        const slug = (data.slug).toLowerCase()

        const existsMenu = await MenuModels.findOne({ slug: slug });
        if (existsMenu) {
            return res.status(400).json({
                success: false,
                message: "page already create",
            });
        }

        const storeData = { name: data.name, slug: slug, created_at: new Date() }
        await MenuModels.create(storeData);

        res.status(201).json({
            success: true,
            message: "menu create successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};


const MenuEdit = async (req, res) => {

    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await MenuModels.findOne(query);
        res.status(201).json({
            success: true,
            message: "menu edit page",
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};
const MenuUpdate = async (req, res) => {
    // console.log(deposit);

    try {
        const data = req.body;




        if (data.name === '') {
            return res.status(400).json({
                success: false,
                message: "name field is required",
            });
        }
        if (data.slug === '') {
            return res.status(400).json({
                success: false,
                message: "slug field is required",
            });
        }

        const old_id = req.params.id;


        const slug = (data.slug)?.toLowerCase()

        const existsMenu = await MenuModels.findOne({ slug: slug });

        if (existsMenu) {
            return res.status(400).json({
                success: false,
                message: "page already create",
            });
        }

        const filter = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const storeData = { name: data.name, slug: slug }
        const results = await MenuModels.findByIdAndUpdate(filter, storeData, option);

        res.status(201).json({
            success: true,
            message: "menu update successfully",
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const MenuDelete = async (req, res) => {
    // console.log(deposit);

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const results = await MenuModels.findByIdAndDelete(query);
        // console.log()
        res.status(201).json({
            success: true,
            message: "menu Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};

// Menu section End




// Home Bouns Store section 
const HomeBounsStore = async (req, res) => {
    const data = req.body;
    try {
        const data = req.body;
        const existsdata = await bounsModels.findOne();

        if (req.file === undefined) {
            const storeData = { title: data.title, title_one: data.title_one, title_two: data.title_two, title_three: data.title_three, title_two_reward: data.title_two_reward, dis_one: data.dis_one, dis_two: data.dis_two, dis_three: data.dis_three, dis_one_btn: data.dis_one_btn, dis_one_btn_url: data.dis_one_btn_url, created_at: new Date() }

            if (!existsdata) {
                await bounsModels.create(storeData);
                res.status(201).json({
                    success: true,
                    message: "event create successfull",
                    data: storeData,
                });
            } else {

                const filter = { _id: new ObjectId(existsdata._id) };
                const option = { upsert: true };
                const results = await bounsModels.findByIdAndUpdate(filter, storeData, option);

                res.status(201).json({
                    success: true,
                    message: "event update successfull",
                    data: results,
                });

            }
        } else {


            fs.access('./public/data/uploads/', (err) => {
                if (err) {
                    fs.mkdirSync('./public/data/uploads/')
                }
            });
            const formatedName = req.file.originalname.split(' ').join('-');
            const fileName = `${Date.now()}-${formatedName}`
            await sharp(req.file.buffer).resize(130, 130, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

            if (existsdata) {
                fs.unlinkSync(existsdata.image_url);
            }
            const storeData = { title: data.title, image_url: `public/data/uploads/${fileName}`, title_one: data.title_one, title_two: data.title_two, title_three: data.title_three, title_two_reward: data.title_two_reward, dis_one: data.dis_one, dis_two: data.dis_two, dis_three: data.dis_three, dis_one_btn: data.dis_one_btn, dis_one_btn_url: data.dis_one_btn_url, created_at: new Date() }


            if (!existsdata) {
                await bounsModels.create(storeData);
                res.status(201).json({
                    success: true,
                    message: "event create successfull",
                    data: storeData,
                });
                console.log('create')
            } else {

                const filter = { _id: new ObjectId(existsdata._id) };
                const option = { upsert: true };
                const results = await bounsModels.findByIdAndUpdate(filter, storeData, option);

                res.status(201).json({
                    success: true,
                    message: "event update successfull",
                    data: results,
                });
                console.log('update')

            }

        }



    } catch (error) {
        console.log(error);
    }
};


// Home Bouns Store section End




// video section 
const VideoSectionStore = async (req, res) => {

    try {
        const data = req.body;
        const video = req?.file?.path;
        const storeData = { title_one: data.title_one, title_two: data.title_two, dis_one: data.dis_one, dis_two: data.dis_two, btn_name: data.btn_name, btn_url: data.btn_url, icon_one: data.icon_one, icon_two: data.icon_two, icon_three: data.icon_three, icon_one_url: data.icon_one_url, icon_two_url: data.icon_two_url, icon_three_url: data.icon_three_url, video_url: video, created_at: new Date() }

        const existsdata = await videosModels.findOne();
        if (!existsdata) {
            await videosModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "videos create successfull",
                data: storeData,
            });
            console.log('create')
        } else {

            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };

            const results = await videosModels.findByIdAndUpdate(filter, storeData, option);
            res.status(201).json({
                success: true,
                message: "videos update successfull",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};


// video section End





// Notices section 
const NoticesStore = async (req, res) => {

    try {
        const data = req.body;

        if (data.name === undefined) {
            return res.status(400).json({
                success: false,
                message: "name field is required",
            });
        }

        if (data.name === '') {
            return res.status(400).json({
                success: false,
                message: "name field is required",
            });
        }



        const storeData = { name: data.name, created_at: new Date() }
        await NoticesModel.create(storeData);

        res.status(201).json({
            success: true,
            message: "notice create successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};


const NoticesEdit = async (req, res) => {

    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await NoticesModel.find(query);

        res.status(201).json({
            success: true,
            message: "notice edit page",
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};
const NoticesUpdate = async (req, res) => {
    // console.log(deposit);

    try {
        const old_id = req.params.id;
        const data = req.body;
        const filter = { _id: new ObjectId(old_id) };
        const option = { upsert: true };

        const results = await NoticesModel.findByIdAndUpdate(filter, data, option);

        res.status(201).json({
            success: true,
            message: "notice update successfully",
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const NoticesDelete = async (req, res) => {
    // console.log(deposit);

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const results = await NoticesModel.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "notice Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};

// Notices section End


// Slider section 
const SliderStore = async (req, res) => {
    try {
        const image = req?.file?.path;
        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/');
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(250, 120, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);
        const storeData = { image_url: `public/data/uploads/${fileName}`, created_at: new Date() }
        await SliderModels.create(storeData);
        res.status(201).json({
            success: true,
            message: "slider create successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};


const SliderEdit = async (req, res) => {

    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await SliderModels.find(query);

        res.status(201).json({
            success: true,
            message: "slider edit page",
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};
const SliderUpdate = async (req, res) => {
    // console.log(req.file);

    try {
        const old_id = req.params.id;
        const image = req?.file?.path;
        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/')
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(250, 120, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);
        const existsImage = await SliderModels.findOne({ _id: new ObjectId(old_id) });
        fs.unlinkSync(existsImage.image_url);


        const filter = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const storeData = { image_url: `public/data/uploads/${fileName}`, created_at: new Date() }


        const results = await SliderModels.findByIdAndUpdate(filter, storeData, option);

        res.status(201).json({
            success: true,
            message: "slider update successfully",
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const SliderDelete = async (req, res) => {
    // console.log(deposit);

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const existsdata = await SliderModels.findOne({ _id: new ObjectId(id) });
        if (existsdata) {
            fs.unlinkSync(existsdata.image_url);
        }

        const results = await SliderModels.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "slider Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};

// Slider section End
// OurProductsModels

// Our Products  section 
const OurProductsStore = async (req, res) => {

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
        await sharp(req.file.buffer).resize(130, 130, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);
        const storeData = { title: data.title, short_dis: data.short_dis, long_dis: data.long_dis, image_url: `public/data/uploads/${fileName}`, created_at: new Date() }

        await OurProductsModels.create(storeData);

        res.status(201).json({
            success: true,
            message: "Our Products create successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};


const OurProductsEdit = async (req, res) => {

    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await OurProductsModels.findOne(query);

        res.status(201).json({
            success: true,
            message: "Our Products  edit page",
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};
const OurProductsUpdate = async (req, res) => {
    // console.log(deposit);

    try {
        const old_id = req.params.id;
        const data = req.body;
        const filter = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const image = req?.file?.path;
        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/')
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(130, 130, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

        const existsdata = await OurProductsModels.findOne(filter);
        if (existsdata) {
            fs.unlinkSync(existsdata.image_url);
        }

        const storeData = { title: data.title, short_dis: data.short_dis, long_dis: data.long_dis, image_url: `public/data/uploads/${fileName}`, created_at: new Date() }
        const results = await OurProductsModels.findByIdAndUpdate(filter, storeData, option);

        res.status(201).json({
            success: true,
            message: "Our Products update successfully",
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const OurProductsDelete = async (req, res) => {
    // console.log(deposit);

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const existsdata = await OurProductsModels.findOne(query);
        if (existsdata) {
            fs.unlinkSync(existsdata.image_url);
        }
        const results = await OurProductsModels.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "Our Products Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};

// Our Products section End


// Thrade App section 
const ThradeAppStore = async (req, res) => {

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
        await sharp(req.file.buffer).resize(130, 130, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

        const existsdata = await TradeAppModels.findOne();
        if (existsdata) {
            fs.unlinkSync(existsdata.image_url);
        }

        const storeData = { image_url: `public/data/uploads/${fileName}`, title_img_url_one: data.title_img_url_one, title_one: data.title_one, dis_one: data.dis_one, title_img_url_two: data.title_img_url_two, title_two: data.title_two, dis_two: data.dis_two, app_url: data.app_url, wondow_url: data.wondow_url, iphone_url: data.iphone_url, created_at: new Date() }


        if (!existsdata) {
            await TradeAppModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "Trade App create successfull",
                data: storeData,
            });
            console.log('create')
        } else {

            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await TradeAppModels.findByIdAndUpdate(filter, storeData, option);

            res.status(201).json({
                success: true,
                message: "Trade App update successfull",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};

// Cryptocurrencies section 
const CryptocurrenciesStore = async (req, res) => {

    try {
        const data = req.body;

        const storeData = { name: data.name, created_at: new Date() }

        const existsdata = await CryptocurrenciesModels.findOne();

        if (!existsdata) {
            await CryptocurrenciesModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "Cryptocurrencies title changed",
                data: storeData,
            });
            console.log('create')
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await CryptocurrenciesModels.findByIdAndUpdate(filter, data, option);

            res.status(201).json({
                success: true,
                message: "Cryptocurrencies title changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};
// New Listing Store section 
const NewListingStore = async (req, res) => {

    try {
        const data = req.body;

        const storeData = { title: data.title, created_at: new Date() }

        const existsdata = await NewListingModels.findOne();

        if (!existsdata) {
            await NewListingModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "New Listing  title changed",
                data: storeData,
            });
            console.log('create')
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await NewListingModels.findByIdAndUpdate(filter, data, option);

            res.status(201).json({
                success: true,
                message: "New Listing  title changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};
//  Choose GFFEX Store section 
const ChooseGFFEXStore = async (req, res) => {

    try {
        const data = req.body;
        const video = req?.file?.path;
        const storeData = { title: data.title, videos: video, icon_one: data.icon_one, icon_one_dis: data.icon_one_dis, icon_two: data.icon_two, icon_two_dis: data.icon_two_dis, icon_three: data.icon_three, icon_three_dis: data.icon_three_dis, created_at: new Date() }

        const existsdata = await ChooseGFFEXModels.findOne();

        if (!existsdata) {
            await ChooseGFFEXModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "Choose GFFEX changed",
                data: storeData,
            });
            console.log('create')
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await ChooseGFFEXModels.findByIdAndUpdate(filter, storeData, option);

            res.status(201).json({
                success: true,
                message: "Choose GFFEX changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};


// Our Products Title Store section 
const OurProductsTitleStore = async (req, res) => {

    try {
        const data = req.body;
        const storeData = { title: data.title, created_at: new Date() }
        const existsdata = await OurProductsTitle.findOne();

        if (!existsdata) {
            await OurProductsTitle.create(storeData);
            res.status(201).json({
                success: true,
                message: "Our Products Title changed",
                data: storeData,
            });
            console.log('create')
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await OurProductsTitle.findByIdAndUpdate(filter, data, option);

            res.status(201).json({
                success: true,
                message: "Our Products Title changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};



// // Our Products Title Store section 
// const OurProductsTitleView = async (req, res) => {

//     try {
//         const data = req.body;
//         const storeData = { title: data.title,  created_at: new Date() }
//         const existsdata = await OurProductsTitle.findOne();

//         if (!existsdata) {
//             await OurProductsTitle.create(storeData);
//             res.status(201).json({
//                 success: true,
//                 message: "Our Products Title changed",
//                 data: storeData,
//             });
//             console.log('create')
//         } else {
//             const filter = { _id: new ObjectId(existsdata._id) };
//             const option = { upsert: true };
//             const results = await OurProductsTitle.findByIdAndUpdate(filter, data, option);

//             res.status(201).json({
//                 success: true,
//                 message: "Our Products Title changed",
//                 data: results,
//             });
//             console.log('update')

//         }


//     } catch (error) {
//         console.log(error);
//     }
// };


// Our Products Title Store section 
const CommunityStore = async (req, res) => {

    try {
        const data = req.body;
        const image = req?.file?.path;

        const storeData = { title: data.title, image: image, dis: data.dis, Btn_one_name: data.Btn_one_name, Btn_one_icon: data.Btn_one_icon, Btn_one_url: data.Btn_one_url, Btn_two_name: data.Btn_two_name, Btn_two_icon: data.Btn_two_icon, Btn_two_url: data.Btn_two_url, created_at: new Date() }
        const existsdata = await CommunityModels.findOne();

        if (!existsdata) {
            await CommunityModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "Community changed",
                data: storeData,
            });
            console.log('create')
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await CommunityModels.findByIdAndUpdate(filter, storeData, option);

            res.status(201).json({
                success: true,
                message: "Community changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};

const GffexAppStore = async (req, res) => {

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
        await sharp(req.file.buffer).resize(450, 330, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);
        const existsdata = await GffexAppModels.findOne();
        fs.unlinkSync(existsdata.image);
        const storeData = { title: data.title, dis: data.dis, image: `public/data/uploads/${fileName}`, sub_title_one: data.sub_title_one, sub_title_one_dis: data.sub_title_one_dis, sub_title_two: data.sub_title_two, sub_title_two_dis: data.sub_title_two_dis, created_at: new Date() }


        if (!existsdata) {
            await GffexAppModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "Community changed",
                data: storeData,
            });
            console.log('create')
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await GffexAppModels.findByIdAndUpdate(filter, storeData, option);

            res.status(201).json({
                success: true,
                message: "Community changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};



// Community  section 
const CommunityBtnStore = async (req, res) => {

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
        await sharp(req.file.buffer).resize(80, 80, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

        const storeData = { btn_image: `public/data/uploads/${fileName}`, btn_url: data.btn_url, created_at: new Date() }
        await CommunityBtn.create(storeData);

        res.status(201).json({
            success: true,
            message: "Community Button create successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};


const CommunityBtnEdit = async (req, res) => {

    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await CommunityBtn.findOne(query);

        res.status(201).json({
            success: true,
            message: "Community Button  edit page",
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};
const CommunityBtnUpdate = async (req, res) => {
    // console.log(deposit);

    try {
        const old_id = req.params.id;
        const data = req.body;

        const filter = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const image = req?.file?.path;
        fs.access('./public/data/uploads/', (err) => {
            if (err) {
                fs.mkdirSync('./public/data/uploads/')
            }
        });
        const formatedName = req.file.originalname.split(' ').join('-');
        const fileName = `${Date.now()}-${formatedName}`
        await sharp(req.file.buffer).resize(80, 80, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);
        const existsImage = await CommunityBtn.findOne(filter);
        fs.unlinkSync(existsImage.btn_image);

        const storeData = { btn_image: `public/data/uploads/${fileName}`, btn_url: data.btn_url, created_at: new Date() }


        const results = await CommunityBtn.findByIdAndUpdate(filter, storeData, option);

        res.status(201).json({
            success: true,
            message: "Community Button update successfully",
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const CommunityBtnDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const existsImage = await CommunityBtn.findOne(query);

        fs.unlinkSync(existsImage.btn_image);
        const results = await CommunityBtn.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "Community Button Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};


//     Gffex App Btn

const GffexAppBtnStore = async (req, res) => {

    try {
        const data = req.body;

        const storeData = { btn_one_name: data.btn_one_name, btn_one_icon: data.btn_one_icon, btn_one_url: data.btn_one_url, btn_two_name: data.btn_two_name, btn_two_icon: data.btn_two_icon, btn_two_url: data.btn_two_url, btn_three_name: data.btn_three_name, btn_three_icon: data.btn_three_icon, btn_three_url: data.btn_three_url, created_at: new Date() }


        const existsdata = await GffexAppBtn.findOne();

        if (!existsdata) {
            await GffexAppBtn.create(storeData);
            res.status(201).json({
                success: true,
                message: "Gffex App Button changed",
                data: storeData,
            });
            console.log('create')
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await GffexAppBtn.findByIdAndUpdate(filter, data, option);

            res.status(201).json({
                success: true,
                message: "Gffex App BUtton changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};


//     Gffex App Btn

const SignUpToTradeBtnStore = async (req, res) => {

    try {
        const data = req.body;
        const storeData = { name: data.name, url: data.url, created_at: new Date() }

        const existsdata = await SignUpToTradeBtnModel.findOne();

        if (!existsdata) {
            await SignUpToTradeBtnModel.create(storeData);
            res.status(201).json({
                success: true,
                message: "SignUp To Trade Button changed",
                data: storeData,
            });
            console.log('create')
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await SignUpToTradeBtnModel.findByIdAndUpdate(filter, data, option);

            res.status(201).json({
                success: true,
                message: "SignUp To Trade Button changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};


//     Gffex App Btn

const StartThradeBtnStore = async (req, res) => {

    try {
        const data = req.body;
        const storeData = { name: data.name, url: data.url, created_at: new Date() }
        const existsdata = await StartThradeBtnModels.findOne();

        if (!existsdata) {
            await StartThradeBtnModels.create(storeData);
            res.status(201).json({
                success: true,
                message: "Start Thrade Button changed",
                data: storeData,
            });
            
        } else {
            const filter = { _id: new ObjectId(existsdata._id) };
            const option = { upsert: true };
            const results = await StartThradeBtnModels.findByIdAndUpdate(filter, data, option);

            res.status(201).json({
                success: true,
                message: "Start Thrade Button changed",
                data: results,
            });
            console.log('update')

        }


    } catch (error) {
        console.log(error);
    }
};


module.exports = { MenuStore, MenuEdit, MenuUpdate, MenuDelete, VideoSectionStore, HomeBounsStore, NoticesStore, NoticesEdit, NoticesUpdate, NoticesDelete, SliderStore, SliderEdit, SliderUpdate, SliderDelete, OurProductsStore, OurProductsEdit, OurProductsUpdate, OurProductsDelete, ThradeAppStore, CryptocurrenciesStore, NewListingStore, ChooseGFFEXStore, OurProductsTitleStore, CommunityStore, GffexAppStore, CommunityBtnStore, CommunityBtnEdit, CommunityBtnUpdate, CommunityBtnDelete, GffexAppBtnStore, SignUpToTradeBtnStore, StartThradeBtnStore };
