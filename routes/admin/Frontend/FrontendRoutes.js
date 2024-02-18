const express = require('express')
const route = express.Router();
const multer = require('multer');
const {imageUpload} = require('./../../../helpers/filehelper');
const {videoUpload} = require('./../../../helpers/videoFileHelper');

const storage = multer.memoryStorage();
const upload = multer({storage});


const {MenuStore, MenuEdit, MenuUpdate, MenuDelete, VideoSectionStore, HomeBounsStore, NoticesStore, NoticesEdit, NoticesUpdate, NoticesDelete, SliderStore, SliderEdit,  SliderUpdate, SliderDelete, OurProductsStore, OurProductsEdit, OurProductsUpdate, OurProductsDelete, ThradeAppStore, CryptocurrenciesStore, NewListingStore, ChooseGFFEXStore, OurProductsTitleStore, CommunityStore, GffexAppStore, CommunityBtnStore, CommunityBtnEdit, CommunityBtnUpdate, CommunityBtnDelete, GffexAppBtnStore, SignUpToTradeBtnStore, StartThradeBtnStore } = require('../../../controller/admin/Home/adminFrontentController');
// Menu section 
route.post('/menu/store',  MenuStore);
route.get('/menu/edit/:id',  MenuEdit);
route.put('/menu/update/:id',  MenuUpdate);
route.delete('/menu/delete/:id',  MenuDelete);
// Videos section 
route.post('/video/store', videoUpload.single('video'), VideoSectionStore);
// bouns section 
route.post('/bouns/store', upload.single('event_img'),  HomeBounsStore);

// notice section 
route.post('/notice/store',  NoticesStore);
route.get('/notice/edit/:id',  NoticesEdit);
route.put('/notice/update/:id',  NoticesUpdate);
route.delete('/notice/delete/:id',  NoticesDelete);

// notice section 
route.post('/slider/store', upload.single('slider_img'), SliderStore);
route.get('/slider/edit/:id',  SliderEdit);
route.put('/slider/update/:id', upload.single('slider_img'),   SliderUpdate);
route.delete('/slider/delete/:id',  SliderDelete);

// our products section 
route.post('/our/products/store', upload.single('ourproducts_img'),   OurProductsStore);
route.get('/our/products/edit/:id',  OurProductsEdit);
route.put('/our/products/update/:id', upload.single('ourproducts_img'),    OurProductsUpdate);
route.delete('/our/products/delete/:id',  OurProductsDelete);

// Thrade App Store section 
route.post('/trade/app/store', upload.single('ThradeApp_img'),  ThradeAppStore);
// Cryptocurrencies Store section 
route.post('/cryptocurrencies/store',  CryptocurrenciesStore);
// Cryptocurrencies Store section 
route.post('/new/listing/store',  NewListingStore);
// Choose GFFEX Store section 
route.post('/choose/gffex/store', videoUpload.single('video'),  ChooseGFFEXStore);
// products title Store section 
route.post('/our/products/title/store',  OurProductsTitleStore);
// Community Store section 
route.post('/community/store', imageUpload.single('community_img'),  CommunityStore);
// Community Store section 
route.post('/gffex/app/store', upload.single('app_img'),  GffexAppStore);

 

// Community section  button
route.post('/community/button/store', upload.single('community_btn_img'),  CommunityBtnStore);
route.get('/community/button/edit/:id',  CommunityBtnEdit);
route.put('/community/button/update/:id', upload.single('community_btn_img'),  CommunityBtnUpdate);
route.delete('/community/button/delete/:id',  CommunityBtnDelete);


// Gffex App Store section 
route.post('/gffex/app/button/store',  GffexAppBtnStore);
// SignUp To Trade Btn Store section 
route.post('/signup/to/trade/button/store',  SignUpToTradeBtnStore);
// Start Thrade Btn  Store section 
route.post('/start/trade/button/store',  StartThradeBtnStore);


module.exports = route;