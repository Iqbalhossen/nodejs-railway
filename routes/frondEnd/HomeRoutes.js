const express = require('express')
const route = express.Router();

const {CryptoView, MenuView, videosView, bounsView, NoticesView, SliderView, OurProductsView, TradeAppMView, CryptocurrenciesView, NewListingView, ChooseGFFEXView, OurProductsTitleView, CommunityView, GffexAppView, CommunityBtnView, StartThradeBtnView, SignUpToTradeBtnView, GffexAppBtnView, MenuViewBySlug, FooterView, HeaderView, NewsletterView, HomeSectionView, SubMenuViewByMenu, SocialSupportView } = require('../../controller/frontEnd/frontEndController');
 

route.get('/crypto/currency/view',  CryptoView);
route.get('/videos/view',  videosView);
route.get('/bouns/view',  bounsView);
route.get('/notices/view',  NoticesView);
route.get('/slider/view',  SliderView);
route.get('/our/products/view',  OurProductsView);
route.get('/trade/app/view',  TradeAppMView);
route.get('/cryptocurrencies/view',  CryptocurrenciesView);
route.get('/new/listing/view',  NewListingView);
route.get('/choose/gffex/view',  ChooseGFFEXView);
route.get('/our/products/title/view',  OurProductsTitleView);
route.get('/community/view',  CommunityView);
route.get('/gffex/app/view',  GffexAppView);
route.get('/community/btn/view',  CommunityBtnView);
route.get('/start/trade/button/view',  StartThradeBtnView);
route.get('/signup/to/trade/button/view',  SignUpToTradeBtnView);
route.get('/gffex/app/btn/view',  GffexAppBtnView);
route.get('/gffex/app/btn/view',  GffexAppBtnView);
route.get('/social/support/view',  SocialSupportView);

////  dynamic menu

route.get('/menu/view',  MenuView);
route.get('/sub/menu/view/:id',  SubMenuViewByMenu);
route.get('/menu/:slug',  MenuViewBySlug);
route.get('/home/section',  HomeSectionView);


//// setting
route.get('/footer/setting/view',  FooterView);
route.get('/header/setting/view',  HeaderView);
route.get('/newsletter/setting/view',  NewsletterView);

module.exports = route;