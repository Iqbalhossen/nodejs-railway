const express = require('express')
const route = express.Router();

const {MenuPageCreate, AdminMenuPageView, SubMenuStore, SubMenuEdit, SubMenuUpdate, SubMenuDelete, SubMenuView, SubMenuPageCreate, AdminSubMenuPageView} = require('../../../controller/admin/Home/adminMenuPageController');
// Menu section 
route.post('/create/:id',  MenuPageCreate);
route.get('/view/:id',  AdminMenuPageView);

//sub Menu section 
route.post('/sub/create',  SubMenuStore);
route.get('/sub/edit/:id',  SubMenuEdit);
route.put('/sub/update/:id',  SubMenuUpdate);
route.delete('/sub/delete/:id',  SubMenuDelete);
route.get('/sub/view',  SubMenuView);

// Menu section 
route.post('/sub/page/create/:id',  SubMenuPageCreate);
route.get('/sub/page/view/:id',  AdminSubMenuPageView);



module.exports = route;