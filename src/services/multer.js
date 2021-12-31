const multer = require('multer');

// configuro multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, 'src/public/profile_imgs')
  },
  filename: function (req, file, callback) {
      callback(null, Date.now() + `${file.originalname}`)
  }
});

const upload = multer({ storage: storage });

 module.exports =  upload;