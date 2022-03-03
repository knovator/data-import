const mongoose = require('mongoose');
const { paginate, toJSON, fieldsAlias } = require('./../plugins');

const { Schema, model } = mongoose;

const JobsSchema = new Schema(
  {
    rk: { type: String, alias: 'routingKey' },
    dtg: { type: String, alias: 'deliveryTag' },
    ctg: { type: String, alias: 'consumerTag' },
    exh: { type: String, alias: 'exchange' },
    uId: { type: Schema.Types.ObjectId, ref: 'Users', required: false },
    tId: { type: Schema.Types.ObjectId, ref: 'Templates', required: false },
    filePath: { type: String },
    cbUrl: String,
    status: String,
    startTime: Schema.Types.Date,
    endTime: Schema.Types.Date
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
JobsSchema.plugin(toJSON);
JobsSchema.plugin(paginate);

JobsSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Jobs = model('Jobs', JobsSchema);

module.exports = Jobs;
