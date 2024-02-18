const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

const {UserSignup, UserSignupVerify, UserSignupPassword, UserLogin, UserLoginForm , UserLoginPassword, UserPasswordForGet, UserPasswordReset, UserProfileUpdate, UserPasswordUpdate} = require('./../../controller/user/userAuthenticationController');
const {userEmailVerifyToken } = require('../../middlewares/userEmailVerifyToken');
 
route.post('/signup/email',  UserSignup);
route.post('/signup/email/verify', userEmailVerifyToken, UserSignupVerify);
route.post('/signup', UserSignupPassword);
route.post('/login', UserLogin);
route.post('/mobile/login', UserLoginForm);
route.post('/mobile/login/password', UserLoginPassword);
route.post('/passowrd/forget', UserPasswordForGet);
route.post('/passowrd/reset/:id/:token', UserPasswordReset);
route.put('/profile/update/:id', upload.single('image'), UserProfileUpdate);
route.put('/password/update/:id',  UserPasswordUpdate);


module.exports = route;