const express = require('express')
const route = express.Router();



const {UserMiningView, UserMiningSingleView, UserMiningStore,  UserMiningHistroy} = require('../../../controller/user/Mining/MiningController');

route.get('/view',  UserMiningView);
route.get('/view/:id',  UserMiningSingleView);
route.post('/store/:id',   UserMiningStore);
route.get('/history/view/:id',   UserMiningHistroy);


module.exports = route;