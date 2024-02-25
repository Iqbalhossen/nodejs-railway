const express = require('express')
const route = express.Router();
const multer = require('multer');
const {imageUpload} = require('./../../../helpers/filehelper');

const storage = multer.memoryStorage();
const upload = multer({storage});


const {AdminTestimonialTitleView, AdminTestimonialTitleStore,AdminTestimonialView,    AdminTestimonialStore, AdminTestimonialViewById, AdminTestimonialUpdate, AdminTestimonialDelete} = require('../../../controller/admin/Testimonial/TestimonialController');



// our Testimonia title section 
route.get('/title/view',   AdminTestimonialTitleView);
route.post('/title/store',   AdminTestimonialTitleStore);



// our Testimonia section 
route.get('/view',   AdminTestimonialView);
route.post('/store', upload.single('image'),   AdminTestimonialStore);
route.get('/view/:id',  AdminTestimonialViewById);
route.put('/update/:id', upload.single('image'),    AdminTestimonialUpdate);
route.delete('/delete/:id',  AdminTestimonialDelete);


module.exports = route;