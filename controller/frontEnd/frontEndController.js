const CryptoCurrencyModels = require('../../models/CryptoCurrency/CryptoCurrencyModels');
const MenuModels = require('../../models/frontend/menuModels');
const VideosModels = require('../../models/frontend/videosModels');
const BounsModels = require('../../models/frontend/bounsModels');
const NoticesModel = require('../../models/frontend/noticesModel');
const SliderModels = require('../../models/frontend/sliderModels');
const OurProductsModels = require('../../models/frontend/OurProductsModels');
const TradeAppModels = require('../../models/frontend/tradeAppModels');
const CryptocurrenciesModels = require('../../models/frontend/CryptocurrenciesModels');
const NewListingModels = require('../../models/frontend/NewListingModels');
const ChooseGFFEXModels = require('../../models/frontend/ChooseGFFEXModels');
const OurProductsTitle = require('../../models/frontend/OurProductsTitle');
const CommunityModels = require('../../models/frontend/CommunityModels');
const GffexAppModels = require('../../models/frontend/GffexAppModels');
const CommunityBtn = require('../../models/frontend/CommunityBtn');
const StartThradeBtnModels = require('../../models/frontend/StartThradeBtnModels');
const SignUpToTradeBtnModel = require('../../models/frontend/SignUpToTradeBtnModel');
const GffexAppBtn = require('../../models/frontend/GffexAppBtn');
const MenuPageModels = require('../../models/frontend/MenuPageModels');
const FooterModels = require('../../models/setting/FooterModels');
const HeaderModels = require('../../models/setting/HeaderModels');
const NewsletterModels = require('../../models/setting/NewsletterModels');
const SubMenuModels = require('../../models/frontend/SubMenuModels');
const SocialSupportModels = require('../../models/SocialSupport/SocialSupportModels');
const TestimonialModels = require('../../models/Testimonial/TestimonialModels');
const TestimonialTitleModels = require('../../models/Testimonial/TestimonialTitleModels');
const { ObjectId } = require('mongodb');


// videos View section 
const SocialSupportView = async (req, res) => {
    try {
        const data = await SocialSupportModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};

// videos View section 
const CryptoView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await CryptoCurrencyModels.find({Status:1});
        const dataLength = await CryptoCurrencyModels.find({Status:1});
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

// videos View section 
const videosView = async (req, res) => {
    try {
        const data = await VideosModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};
// bouns View section 
const bounsView = async (req, res) => {
    try {
        const data = await BounsModels.find();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};
// Notices View section 
const NoticesView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await NoticesModel.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await NoticesModel.find();
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
// Slider View section 
const SliderView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await SliderModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await SliderModels.find();
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
// Our Products View section 
const OurProductsView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await OurProductsModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await OurProductsModels.find();
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
// Trade AppM View section 
const TradeAppMView = async (req, res) => {
    try {
        const data = await TradeAppModels.find();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};
//CryptocurrenciesView View section 
const CryptocurrenciesView = async (req, res) => {
    try {
        const data = await CryptocurrenciesModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};
//NewListingView View section 
const NewListingView = async (req, res) => {
    try {
        const data = await NewListingModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};
//Choose GFFEX  View section 
const ChooseGFFEXView = async (req, res) => {
    try {
        const data = await ChooseGFFEXModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};
//Our Products Title  View section 
const OurProductsTitleView = async (req, res) => {
    try {
        const data = await OurProductsTitle.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};
//Community  View section 
const CommunityView = async (req, res) => {
    try {
        const data = await CommunityModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};


//Community  View section 
const GffexAppView = async (req, res) => {
    try {
        const data = await GffexAppModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data?.length
        });

    } catch (error) {
        console.log(error);
    }
};
//Community  View section 
const CommunityBtnView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;


        const data = await CommunityBtn.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await CommunityBtn.find();
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
//Community  View section 
const StartThradeBtnView = async (req, res) => {
    try {
        const data = await StartThradeBtnModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data?.length
        });

    } catch (error) {
        console.log(error);
    }
};
//Sign Up To Trade Btn  View section 
const SignUpToTradeBtnView = async (req, res) => {
    try {
        const data = await SignUpToTradeBtnModel.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data?.length
        });

    } catch (error) {
        console.log(error);
    }
};
//Gffex App  Btn w  View section 
const GffexAppBtnView = async (req, res) => {
    try {
        const data = await GffexAppBtn.findOne();
        res.status(201).json({
            success: true,
            data: data,
            length: data?.length
        });

    } catch (error) {
        console.log(error);
    }
};

// Menu section 
const MenuView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await MenuModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await MenuModels.find();
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

const MenuViewBySlug = async (req, res) => {

    try {
       const slug = req.params.slug;
        const findMenu = await MenuModels.findOne({slug:slug});
        const data = await MenuPageModels.find({menu_id: findMenu._id});
        res.status(201).json({
            success: true,
            data: data,
            length: data?.length
        });

    } catch (error) {
        console.log(error);
    }
};

const FooterView = async (req, res) => {
    try {
        const data = await FooterModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};
const HeaderView = async (req, res) => {
    try {
        const data = await HeaderModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};
const NewsletterView = async (req, res) => {
    try {
        const data = await NewsletterModels.findOne();
        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
    }
};

/// home section view

const HomeSectionView = async (req, res) => {

    try {
        const findMenu = await MenuModels.findOne({slug:'/'});
        const data = await MenuPageModels.find({menu_id: findMenu._id});
        res.status(201).json({
            success: true,
            data: data,
            length: data?.length
        });

    } catch (error) {
        console.log(error);
    }
};


/// sub menu 

// Menu section 
const SubMenuViewByMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await SubMenuModels.find({menu_id:id});
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};

// Testimonial  section 
const TestimonialView = async (req, res) => {
    try {
        const data = await TestimonialModels.find().sort("-createdAt");
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });

    } catch (error) {
        console.log(error);
    }
};
const TestimonialTitleViewView = async (req, res) => {
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


module.exports = {SocialSupportView, CryptoView,  MenuView, videosView, bounsView, NoticesView, SliderView, OurProductsView, TradeAppMView, CryptocurrenciesView, NewListingView, ChooseGFFEXView, OurProductsTitleView, CommunityView, GffexAppView, CommunityBtnView, StartThradeBtnView, SignUpToTradeBtnView, GffexAppBtnView, MenuViewBySlug, FooterView, HeaderView, NewsletterView, HomeSectionView, SubMenuViewByMenu, TestimonialView,  TestimonialTitleViewView};
