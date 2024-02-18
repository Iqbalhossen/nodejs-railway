const mongoose = require('mongoose'); // Erase if already required

var AdminRolePermissionSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true,
         
    },
    name:{
        type:String,
        required:true,
    },    
    permission :{
        type:String,
        required:false,
    },    
    created_at:{
        type:String,
    },
 
});


//Export the model
module.exports = mongoose.model('AdminRolePermission', AdminRolePermissionSchema);