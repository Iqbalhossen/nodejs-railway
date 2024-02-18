const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});


const {AdminMiningView, AdminMiningStore, AdminMiningSingleView, AdminMiningUpdate, AdminMiningDelete} = require('../../../controller/admin/Mining/MiningController');

route.get('/view',  AdminMiningView);
route.post('/store',  upload.single('image'), AdminMiningStore);
route.get('/view/:id',   AdminMiningSingleView);
route.put('/update/:id',  upload.single('image'), AdminMiningUpdate);
route.delete('/delete/:id',   AdminMiningDelete);

module.exports = route;