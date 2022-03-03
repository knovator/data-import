const mongoose = require('mongoose');
const { paginate, toJSON, fieldsAlias } = require('../plugins');

const { Schema, model } = mongoose;

const WorkbooksSchema = new Schema(
  {
    uId: { type: Schema.Types.ObjectId, ref: 'Users', required: false },
    tId: { type: Schema.Types.ObjectId, ref: 'Templates', required: false },
    workbook: Object,
    template: Object,
    startTime: Schema.Types.Date,
    endTime: Schema.Types.Date
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
WorkbooksSchema.plugin(toJSON);
WorkbooksSchema.plugin(paginate);

WorkbooksSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Jobs = model('Workbooks', WorkbooksSchema);

module.exports = Jobs;
