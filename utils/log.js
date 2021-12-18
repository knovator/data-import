var colors = require('colors/safe');

exports.doLog = (...arg) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...arg);
  }
};

exports.jobStartLog = (queue, ...arg) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(colors.bgYellow(`💁🏻‍♀️ JOB-START => ${queue} :>`), ...arg);
  }
};

exports.jobEndLog = (queue, ...arg) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(colors.bgGreen(`🙅🏻‍♀️ JOB-END => ${queue} :>`), ...arg);
  }
};

exports.jobErrorLog = (queue, ...arg) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(colors.bgRed(`🤦🏻‍♀️ JOB-ERROR => ${queue} :>`), ...arg);
  }
};
