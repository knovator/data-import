const { default: axios } = require('axios');

/**
 *
 * @param {*} msg
 * @returns nothing
 */
module.exports = async (msg, ...otr) => {
  const data = JSON.parse(msg.content) || {};
  const { template, response, errors, ...other } = data;

  const rows = response.map(x => x.rows).flat();
  console.log('JOB Update:', `Total ${rows.length} Rows Found !!`);

  await axios.post(template.callbackUrl, {
    template,
    ...other,
    response
  });
  // const chunk = require('lodash/chunk');
  // const chunkData = chunk(rows, 1000);

  // try {
  //   await Promise.all(
  //     chunkData.map(x =>
  //       axios.post(template.callbackUrl, {
  //         template,
  //         ...other,
  //         response: {
  //           rows: x
  //         }
  //       })
  //     )
  //   ).then(res => console.log('done of definition', res));
  // } catch (e) {
  //   console.log('error--------', e);
  // }
  // fields: {
  //   consumerTag: 'amq.ctag-3y-YSrrbTm0JJ6af41DDrQ',
  //   deliveryTag: 279,
  //   redelivered: false,
  //   exchange: '',
  //   routingKey: 'SENDING_JSON'
  // },
  console.log('Last Job Running --->  will call api here', msg.fields);
};
