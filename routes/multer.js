const multer = require('multer');
const {v4: uuidv4}= require("uuid");
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads') //path to save the files in 
    },
    filename: function (req, file, cb) {
      const uniquename = uuidv4();
      cb(null, uniquename+path.extname(file.originalname)); //renameing image with unique name and keeping extension same as of
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;