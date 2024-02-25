const MenuModels = require('../../models/frontend/menuModels');
const MenuPageModels = require('../../models/frontend/MenuPageModels');
const CryptocurrenciesModels = require('../../models/frontend/CryptocurrenciesModels');
const SliderModels = require('../../models/frontend/sliderModels');
const VideosModels = require('../../models/frontend/videosModels');
const BounsModels = require('../../models/frontend/bounsModels');
const NoticesModel = require('../../models/frontend/noticesModel');
const NewListingModels = require('../../models/frontend/NewListingModels');
const ChooseGFFEXModels = require('../../models/frontend/ChooseGFFEXModels');
const OurProductsTitle = require('../../models/frontend/OurProductsTitle');
const OurProductsModels = require('../../models/frontend/OurProductsModels');
const CommunityModels = require('../../models/frontend/CommunityModels');
const CommunityBtn = require('../../models/frontend/CommunityBtn');
const GffexAppModels = require('../../models/frontend/GffexAppModels');
const GffexAppBtn = require('../../models/frontend/GffexAppBtn');
const StartThradeBtnModels = require('../../models/frontend/StartThradeBtnModels');
const SignUpToTradeBtnModel = require('../../models/frontend/SignUpToTradeBtnModel');
const { ObjectId } = require('mongodb');

const MenuSingleItemView = async (req, res) => {

    try {
        const id = req.params.id;
        const name = req.params.name;
        if (name === 'Top Bannar Section') {
            const data = await VideosModels.findOne();
            res.status(201).json({
                success: true,
                VideosData: data,
                message: 'Top Bannar Section',
            });
        }

        if (name === 'Event Section') {
            const data = await BounsModels.findOne();
            res.status(201).json({
                success: true,
                Bounsdata: data,
                message: 'Event Section',
            });
        }

        if (name === 'Slider Section') {
            const data = await SliderModels.find();
            res.status(201).json({
                success: true,
                SliderData: data,
                message: 'Slider Section',
            });
        }

        if (name === 'Notices Section') {
            const data = await NoticesModel.find();
            res.status(201).json({
                success: true,
                NoticesData: data,
                message: 'Notices Section',
            });

        }

        if (name === 'Cryptocurrencies Section') {
            const data = await CryptocurrenciesModels.findOne();
            res.status(201).json({
                success: true,
                CryptocurrenciesData: data,
                message: 'Cryptocurrencies Section',
            });
        }

        if (name === 'New Listing Section') {
            const data = await NewListingModels.findOne();
            res.status(201).json({
                success: true,
                NewListingData: data,
                message: 'New Listing Section',
            });
        }

        if (name === 'Choose GFFEX Section') {
            const data = await ChooseGFFEXModels.findOne();
            res.status(201).json({
                success: true,
                ChooseGFFEXData: data,
                message: 'Choose GFFEX Section',
            });
        }

        if (name === 'Our Products Section') {
            const data = await OurProductsTitle.findOne();
            const OurProductsData = await OurProductsModels.find();
            res.status(201).json({
                success: true,
                OurProductsTitleData: data,
                OurProductsData: OurProductsData,
                message: 'Our Products Section',
            });
        }

        if (name === 'Community Section') {
            const data = await CommunityModels.findOne();
            const CommunityBtnData = await CommunityBtn.find();
            res.status(201).json({
                success: true,
                CommunityData: data,
                CommunityBtn:CommunityBtnData,
                message: 'Community Section',
            });
        }

        if (name === 'Gffex App Section') {
            const data = await GffexAppModels.findOne();
            const GffexAppBtnData = await GffexAppBtn.findOne();
            res.status(201).json({
                success: true,
                GffexAppData: data,
                GffexAppBtn:GffexAppBtnData,
                message: 'Gffex App Section',
            });
        }

        if (name === 'Start Trade Button') {
            const data = await StartThradeBtnModels.findOne();
            console.log(data)
            res.status(201).json({
                success: true,
                StartThradeBtnData: data,
                message: 'Start Trade Button',
            });
        }
        if (name === 'SignUp To Trade Button') {
            const data = await SignUpToTradeBtnModel.findOne();
            res.status(201).json({
                success: true,
                SignUpToTradeBtnData: data,
                message: 'SignUp To Trade Button',
            });
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = { MenuSingleItemView, };
