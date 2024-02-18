const menuModels = require('../../../models/frontend/menuModels');
const MenuPageModels = require('../../../models/frontend/MenuPageModels');
const SubMenuModels = require('../../../models/frontend/SubMenuModels');
const SubMenuPageModels = require('../../../models/frontend/SubMenuPageModels');

const { ObjectId } = require('mongodb');


///////// menu page create

const MenuPageCreate = async (req, res) => {

    try {
        const data = req.body;
        const menuId = req.params.id;

        const existsdata = await MenuPageModels.find({ menu_id: menuId });

        if (!existsdata) {
            for (const singleData of data) {
                const storeData = { id: singleData.id, name: singleData.name, filterId: singleData.filterId, menu_id: menuId, created_at: new Date() }
                await MenuPageModels.create(storeData);
            }

            res.status(201).json({
                success: true,
                message: "Manu Page Update",
            });


        } else {
            for (const singleData of existsdata) {
                const query = { _id: new ObjectId(singleData._id) };
                await MenuPageModels.findByIdAndDelete(query);
            }

            for (const singleData of data) {
                const storeData = { id: singleData.id, name: singleData.name, filterId: singleData.filterId, menu_id: menuId, created_at: new Date() }
                await MenuPageModels.create(storeData);

            }

            res.status(201).json({
                success: true,
                message: "Manu Page Update",
            });


        }
     

    } catch (error) {
        console.log(error);
    }
};


const AdminMenuPageView= async (req, res) => {

    try {
        const menuId = req.params.id;
    
        const data = await MenuPageModels.find({menu_id:menuId});
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });
    } catch (error) {
        console.log(error);
    }
};



///////// Sub menu  create

const SubMenuView = async (req, res) => {
    // console.log(deposit);

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const results = await SubMenuModels.find();
        // console.log()
        res.status(201).json({
            success: true,
            message: "sub menu view",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};

const SubMenuStore = async (req, res) => {

    try {
        const data = req.body;

        if (data.name === undefined) {
            return res.status(400).json({
                success: false,
                message: "sub menu name field is required",
            });
        }

        if (data.name === '') {
            return res.status(400).json({
                success: false,
                message: "sub menu name field is required",
            });
        }
        if (data.slug === '/') {
            return res.status(400).json({
                success: false,
                message: "sub menu name field is required",
            });
        }

        const slug = (data.slug).toLowerCase()

        const existsMenu = await menuModels.findOne({ slug: slug });
        const existsSubMenu = await SubMenuModels.findOne({ slug: slug });
        if (existsMenu) {
            return res.status(400).json({
                success: false,
                message: "page already create",
            });
        }
        if (existsSubMenu) {
            return res.status(400).json({
                success: false,
                message: "page already create",
            });
        }

        const storeData = { menu_id:data.menu_id, name: data.name, slug: slug, created_at: new Date() }
        await SubMenuModels.create(storeData);

        res.status(201).json({
            success: true,
            message: "sub menu create successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};


const SubMenuEdit = async (req, res) => {

    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await SubMenuModels.findOne(query);
        res.status(201).json({
            success: true,
            message: "menu edit page",
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};
const SubMenuUpdate = async (req, res) => {
    // console.log(deposit);

    try {
        const data = req.body;

       
     

        if (data.name === '') {
            return res.status(400).json({
                success: false,
                message: "name field is required",
            });
        }
        if (data.slug === '') {
            return res.status(400).json({
                success: false,
                message: "slug field is required",
            });
        }

        const old_id = req.params.id;
      
        const slug = (data.slug)?.toLowerCase()

        const existsMenu = await SubMenuModels.findOne({ slug: slug });

        if (existsMenu) {
            return res.status(400).json({
                success: false,
                message: "page already create",
            });
        }
        
        const filter = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const storeData = {menu_id:data.menu_id, name: data.name, slug: slug }
        const results = await SubMenuModels.findByIdAndUpdate(filter, storeData, option);

        res.status(201).json({
            success: true,
            message: "sub menu update successfully",
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const SubMenuDelete = async (req, res) => {
    // console.log(deposit);

    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const results = await SubMenuModels.findByIdAndDelete(query);
        // console.log()
        res.status(201).json({
            success: true,
            message: "sub menu Delete successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
    }
};

// sub Menu section End


///////// menu page create

const SubMenuPageCreate = async (req, res) => {

    try {
        const data = req.body;
        const subMenuId = req.params.id;

        const existsdata = await SubMenuPageModels.find({ submenu_id: subMenuId });

        if (!existsdata) {
            for (const singleData of data) {
                const storeData = { id: singleData.id, name: singleData.name, filterId: singleData.filterId, submenu_id: subMenuId, created_at: new Date() }
                await SubMenuPageModels.create(storeData);
            }

            res.status(201).json({
                success: true,
                message: "Manu Page Update",
            });


        } else {
            for (const singleData of existsdata) {
                const query = { _id: new ObjectId(singleData._id) };
                await SubMenuPageModels.findByIdAndDelete(query);
            }

            for (const singleData of data) {
                const storeData = { id: singleData.id, name: singleData.name, filterId: singleData.filterId, submenu_id: subMenuId, created_at: new Date() }
                await SubMenuPageModels.create(storeData);

            }

            res.status(201).json({
                success: true,
                message: "Sub Manu Page Update",
            });


        }
     

    } catch (error) {
        console.log(error);
    }
};


const AdminSubMenuPageView= async (req, res) => {

    try {
        const subMenuId = req.params.id;
        const data = await SubMenuPageModels.find({submenu_id:subMenuId});

        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });
    } catch (error) {
        console.log(error);
    }
};




module.exports = { MenuPageCreate, AdminMenuPageView, SubMenuStore, SubMenuEdit, SubMenuUpdate, SubMenuDelete, SubMenuView, SubMenuPageCreate, AdminSubMenuPageView };
