const cookieParser = require('cookie-parser')
const User = require('../../models/userModels');
const userEmailVerifyToken = require('../../models/userEmailVerifyToken');
const UserLoginsModels = require('../../models/UserLogins/UserLoginsModels');
const { ObjectId } = require('mongodb');
const { sendVerifyEmail } = require('../../commonfile/email/UserRegisterEmail');
const { sendForgetPasswordEmail } = require('../../commonfile/email/UserForgetPasswordEmail');
const jwt = require("jsonwebtoken");
const sharp = require('sharp');
const fs = require('fs');
const UserSignup = async (req, res) => {

    try {

        const email = req.body.email;
        const existsEmail = await User.findOne({ email: email });
        const existsTokenEmail = await userEmailVerifyToken.findOne({ email: email });

        if (email === undefined) {
            return res.status(400).json({
                success: false,
                message: "Email field is required",
            });
        }


        if (existsEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });

        }



        const codeNumber = Math.floor(10000 + Math.random() * 99999);
        console.log(codeNumber)
        sendVerifyEmail(email, codeNumber);
        const tokenData = { email: req.body.email, verifiy_code: codeNumber };
        if (existsTokenEmail) {
            const filter = { email: email };
            const option = { upsert: true };
            const tokenUpdate = { verifiy_code: codeNumber };
            const data = await userEmailVerifyToken.updateOne(filter, tokenUpdate, option);
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "600s" });
            const newData = { email: email, verifiy_code: codeNumber }
            res.status(201).json({
                success: true,
                message: "verify code send successfull",
                data: newData,
                token: token,
            });

        } else {

            const data = await userEmailVerifyToken.create(tokenData);
            const newData = { email: email, verifiy_code: codeNumber }
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "600s" });
            res.status(201).json({
                success: true,
                message: "verify code send successfull",
                data: newData,
                token: token,
            });


        }


    } catch (error) {
        console.log(error);
    }



};


const UserSignupVerify = async (req, res) => {
    try {
        const data = req.body;
        // verifiy_code: data.code
        const findCode = await userEmailVerifyToken.findOne({ 'email': data.email, 'verifiy_code': data.code });
        if (!findCode) {
            return res.status(400).json({
                success: false,
                message: "Invalid code",
            });
        }
        res.status(201).json({
            success: true,
            RegisterEmailSuccess: false,
            message: "verify successfull",
            data: findCode,
        });

    } catch (error) {
        console.log(error);
    }



};

const UserSignupPassword = async (req, res) => {

    try {
        const data = req.body;

        if (data.fname === undefined || data.fname === '') {
            return res.status(400).json({
                success: false,
                message: "First Name field is required",
            });
        }

        if (data.lname === undefined || data.lname === '') {
            return res.status(400).json({
                success: false,
                message: "Last Name field is required",
            });
        }

        if (data.password === undefined || data.password === '') {
            return res.status(400).json({
                success: false,
                message: "Password field is required",
            });
        }

        if (data.cpassword === undefined || data.cpassword === '') {
            return res.status(400).json({
                success: false,
                message: "Confirm password field is required",
            });
        }


        if (data.password !== data.cpassword) {
            return res.status(400).json({
                success: false,
                message: "Confirm password does not match",
            });
        }

        const userData = { fname: data.fname, lname: data.lname, email: data.email, password: data.password, is_verified: true, status: 0, created_at: new Date() }
        const results = await User.create(userData);

        if(results){
            const signupData = { user_name: `${results.lname} ${results.fname}`, user_id: results?._id, user_email: results?.email }
            res.status(201).json({
                success: true,
                message: "signup successfull",
                data: signupData,
            });
        }
 
       

    } catch (error) {
        console.log(error);
    }



};

const UserLogin = async (req, res) => {
    try {
        const data = req.body;
      
        if (data.password === undefined && data.email === undefined) {
            return res.status(400).json({
                success: false,
                message: "email and password field is required",
            });
        }
        if (data.email === undefined || data.email == '') {
            return res.status(400).json({
                success: false,
                message: "email field is required",
            });
        }
        if (data.password === undefined || data.password == '') {
            return res.status(400).json({
                success: false,
                message: "password field is required",
            });
        }

        const existsEmail = await User.findOne({ email: data.email });

        if (!existsEmail) {
            return res.status(400).json({
                success: false,
                message: "Email Invalid",
            });

        } else {
            const existspassword = await User.findOne({ 'email': data.email, 'password': data.password });
            if (!existspassword) {
                return res.status(400).json({
                    success: false,
                    message: "Password Invailid",
                });

            } else {
                let token = jwt.sign({
                    user_email: existsEmail.email,
                    user_id: existsEmail._id,
                },
                    'secret',
                     { expiresIn: '1h' }
                );

                const storeData = { user_name: `${existspassword.lname} ${existspassword.fname}`, user_id: existspassword?._id, user_email: existspassword?.email }
                await UserLoginsModels.create(storeData);

                res.status(201).json({
                    success: true,
                    message: "Login successful",
                    data: storeData,
                    token: token,
                });

            }
        }





    } catch (error) {
        console.log(error);
    }



};

const UserLoginForm = async (req, res) => {

    try {

        const email = req.body.email;
        const existsEmail = await User.findOne({ email: email });
        console.log(email)
        if (email === undefined) {
            return res.status(400).json({
                success: false,
                message: "Email field is required",
            });
        }
        if (email === '') {
            return res.status(400).json({
                success: false,
                message: "Email field is required",
            });
        }
        // Login section
        if (existsEmail) {
            const newData = { email: email }

            res.status(201).json({
                LoginEmailSuccess: true,
                message: "email verified successfull",
                data: newData,
            });

        } else {//Register section
            const existsTokenEmail = await userEmailVerifyToken.findOne({ email: email });
            const codeNumber = Math.floor(10000 + Math.random() * 99999);
            sendVerifyEmail(email, codeNumber);
            console.log(codeNumber)
            const tokenData = { email: req.body.email, verifiy_code: codeNumber };
            if (existsTokenEmail) {
                const filter = { email: email };
                const option = { upsert: true };
                const tokenUpdate = { verifiy_code: codeNumber };
                const data = await userEmailVerifyToken.updateOne(filter, tokenUpdate, option);
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "600s" });
                const newData = { email: email, verifiy_code: codeNumber }
                res.status(201).json({
                    RegisterEmailSuccess: true,
                    message: "verify code send successfull",
                    data: newData,
                    token: token,
                });

            } else {

                const data = await userEmailVerifyToken.create(tokenData);
                const newData = { email: email, verifiy_code: codeNumber }
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "600s" });
                res.status(201).json({
                    RegisterEmailSuccess: true,
                    message: "verify code send successfull",
                    data: newData,
                    token: token,
                });


            }


        }


    } catch (error) {
        console.log(error);
    }



};


const UserLoginPassword = async (req, res) => {
    try {
        const data = req.body;

        if (data.password === undefined) {
            return res.status(400).json({
                success: false,
                message: " password field is required",
            });
        }

        if (data.password == '') {
            return res.status(400).json({
                success: false,
                message: "password field is required",
            });
        }



        const existsEmail = await User.findOne({ email: data.email });

        const existspassword = await User.findOne({ 'email': data.email, 'password': data.password });
        if (!existspassword) {
            return res.status(400).json({
                success: false,
                message: "Password Invailid",
            });

        } else {
            let token = jwt.sign({
                user_email: existsEmail.email,
                user_id: existsEmail._id,
            },
                'secret',
                { expiresIn: '1h' }
            );

            const storeData = { user_name: `${existspassword.lname} ${existspassword.fname}`, user_id: existspassword._id }
            await UserLoginsModels.create(storeData);

            res.status(201).json({
                success: true,
                message: "Login successful",
                data: existsEmail,
                token: token,
            });

        }





    } catch (error) {
        console.log(error);
    }


};

const UserPasswordForGet = async (req, res) => {
    try {
        const data = req.body;

        if (data.email === undefined) {
            return res.status(400).json({
                success: false,
                message: "Email field is required",
            });
        }

        if (data.email == '') {
            return res.status(400).json({
                success: false,
                message: "Email field is required",
            });
        }


        const existsEmail = await User.findOne({ email: data.email });

        if (!existsEmail) {
            return res.status(400).json({
                success: false,
                message: "Email not found",
            });
        } else {
            const secret = process.env.JWT_SECRET + existsEmail._id;
            const token = jwt.sign({ email: existsEmail.email, id: existsEmail._id }, secret, {
                expiresIn: "5m",
            });
            sendForgetPasswordEmail(existsEmail?.email, `${existspassword.lname} ${existspassword.fname}`, existsEmail?._id, token)
            res.status(201).json({
                success: true,
                message: "Check your email inbox",
            });
        }



    } catch (error) {
        console.log(error);
    }


};
const UserPasswordReset = async (req, res) => {
    try {
        const { id, token } = req.params;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };
        const existsEmail = await User.findOne(filter);

        const secret = process.env.JWT_SECRET + existsEmail._id;

        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    token_success: false,
                    message: "Token Expired",
                });
            }
        });


        if (!(data.password === data.cpassword)) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password does not match",
            });
        }
        const userData = { password: data?.password };
        const option = { upsert: true };
        await User.findByIdAndUpdate(filter, userData, option);
        res.status(201).json({
            success: true,
            message: "password change successfully",
        });

    } catch (error) {
        console.log(error);
    }


};

const UserProfileUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };
        const existsUser = await User.findOne(filter);
        if (existsUser) {

            fs.access('./public/data/uploads/', (err) => {
                if (err) {
                    fs.mkdirSync('./public/data/uploads/')
                }
            });

            if (existsUser?.picture !== null) {
                fs.unlinkSync(existsUser.picture);
            }

            const formatedName = req.file.originalname.split(' ').join('-');
            const fileName = `${Date.now()}-${formatedName}`
            await sharp(req.file.buffer).resize(100, 100, { kernel: sharp.kernel.nearest }).toFile(`./public/data/uploads/${fileName}`);

            const userData = { ...data, country_code: data?.country, picture: `public/data/uploads/${fileName}` };
            const option = { upsert: true };
            const results = await User.findByIdAndUpdate(filter, userData, option);
            res.status(201).json({
                success: true,
                message: "Profile update successfully",
                data: results
            });

        }
    } catch (error) {
        console.log(error);
    }


};


const UserPasswordUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };
        const existsUser = await User.findOne(filter);
        if (existsUser) {
            const existsUserPassword = await User.findOne({ email: existsUser?.email, password: data?.password });
            if (existsUserPassword) {
                if (data.npassword !== data.cpassword) {
                    return res.status(400).json({
                        success: false,
                        message: "Confirm password does not match",
                    });
                }

                const userData = { password: data?.npassword, };
                const option = { upsert: true };
                const results = await User.findByIdAndUpdate(filter, userData, option);
                res.status(201).json({
                    success: true,
                    message: "Password update successfully",
                    data: results
                });

            }else{
                return res.status(400).json({
                    success: false,
                    message: "Invalid password ",
                });
            }


        }
    } catch (error) {
        console.log(error);
    }


};


// count user 

// var query = User.find(); 
// query.count(function (err, count) { 
//     if (err) console.log(err) 
//     else console.log("Count is", count) 
// });

module.exports = { UserSignup, UserSignupVerify, UserSignupPassword, UserLogin, UserLoginForm, UserLoginPassword, UserPasswordForGet, UserPasswordReset, UserProfileUpdate, UserPasswordUpdate };
