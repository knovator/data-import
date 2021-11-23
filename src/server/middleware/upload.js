const multer = require('multer');
const { normalizeFileName } = require('../utils/helper');

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('csv') ||
    file.mimetype.includes('spreadsheetml')
  ) {
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
    cb(null, `${Date.now()}-${normalizeFileName(file.originalname)}`);
  }
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;
