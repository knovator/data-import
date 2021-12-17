const fetchUrl = require('@knovator/api').default;
const { setAPIConfig } = require('@knovator/api');

/**
 *
 * @param {*} msg
 * @returns nothing
 */
module.exports = async (msg, ...otr) => {
  const data = JSON.parse(msg.content) || {};
  const { template, response, errors, ...other } = data;
  // const rows = response.map(x => x.rows).flat();
  setAPIConfig({
    baseUrl: template.callbackUrl,
    handleCache: false
  });

  await fetchUrl({
    url: '',
    data: {
      template,
      ...other,
      response
    }
  }).then(r => console.log('-----------------------done'));
  console.log('Last Job Running --->  will call api here', msg.fields);
};
