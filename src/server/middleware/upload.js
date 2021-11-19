const multer = require('multer');

const excelFilter = (req, file, cb) => {
  if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
    cb(null, true);
  } else {
    const newLocal = 'Please upload only excel file.';
    cb(newLocal, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './resources/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;
