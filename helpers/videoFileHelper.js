
'use strict';
const multer = require('multer');
const path = require('path');
const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: './public/data/uploads/', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});
const videoUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000000000000 // 1000000 Bytes = 1 MB
    // fileSize: 500 * 1024,
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|mkv|MP4|AVI)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a video'))
     }
   cb(undefined, true)
}
}) 

module.exports = {videoUpload}