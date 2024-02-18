const express = require('express')
const route = express.Router();

const {MenuSingleItemView,} = require('../../controller/frontEnd/menuPageController');


route.get('/menu/single/item/view/:name/:id',  MenuSingleItemView);



module.exports = route;