const multer = require('multer');

const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    req.body.imageUrl = Date.now() + '-' + file.originalname;
    cb(null, Date.now() + '-' + file.originalname)
  }
});

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      req.imageFormatError = true;
      cb(null, false);
    }
  }
});

module.exports = upload;
