/**
 *
 * @param {*} msg
 * @returns nothing
 */
module.exports = async msg => {
  const data = JSON.parse(msg.content) || {};
  console.log('Last Job Running --->  will call api here', data);
};
