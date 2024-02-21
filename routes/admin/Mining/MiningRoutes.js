const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});


const {AdminMiningView, AdminMiningStore, AdminMiningSingleView, AdminMiningUpdate, AdminMiningDelete, AdminMiningExpiredView, AdminMiningAllView, AdminUserMiningRunningView, AdminUserMiningCompleteView, AdminUserMiningAllView} = require('../../../controller/admin/Mining/MiningController');

route.get('/view',  AdminMiningView);
route.post('/store',  upload.single('image'), AdminMiningStore);
route.get('/view/:id',   AdminMiningSingleView);
route.put('/update/:id',  upload.single('image'), AdminMiningUpdate);
route.delete('/delete/:id',   AdminMiningDelete);
route.get('/expired/view',   AdminMiningExpiredView);
route.get('/all/view',   AdminMiningAllView);
route.get('/user/running/view',   AdminUserMiningRunningView);
route.get('/user/complete/view',   AdminUserMiningCompleteView);
route.get('/user/all/view',   AdminUserMiningAllView);
module.exports = route;