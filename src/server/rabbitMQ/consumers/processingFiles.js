const { QUEUES } = require('../../utils/constant');
const XLSX = require('xlsx');
const { publishToQueue } = require('../service');

/**
 *
 * @param {*} msg
 * @returns nothing
 */
module.exports = async function(msg) {
  // converting buffer data to Object
  const data = JSON.parse(msg.content) || {};
  const { filePath, ...rest } = data;

  try {
    // reading XLSX/CSV file
    /**
     * All Sheets and their data list
     * @param {Array} SheetNames => Sheets List
     * @param {Object} Sheets => data list
     *  */
    const workbook = XLSX.readFile(filePath);
    const { Sheets, SheetNames } = workbook;
    //   console.log('..ww...', workbook);
    const payload = [];
    SheetNames.forEach(Sheet => {
      // converting sheet's data into JSON
      const data = XLSX.utils.sheet_to_json(Sheets[Sheet]);
      // pushing data into payload
      payload.push({
        Sheet,
        data
      });
    });

    publishToQueue(QUEUES.convertingToJSON, { payload, ...rest });
  } catch (e) {
    return e;
  }
};
