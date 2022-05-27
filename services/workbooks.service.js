const { Workbooks } = require('../models');
const fs = require('fs');
const path = require('path');

/**
 * Creating Workbook
 * @param {Object} payload
 * @returns
 */
exports.addWorkbook = async (payload = {}) => {
  const { workbook, ...other } = payload;

  // write JSON string to a file
  const workbookJSON = JSON.stringify(workbook);

  const date = new Date();
  const fileName = `workbook-${date.getTime()}.json`;
  const filePath = path.resolve(path.join(__dirname, '../resources/' + fileName));
  fs.writeFile(filePath, workbookJSON, err => {
    if (err) {
      throw err;
    }
    console.log('Workbook saved in JSON file at ', filePath);
  });
  const job = await Workbooks.create({
    ...other,
    wPath: filePath
  });
  return job._id;
};
