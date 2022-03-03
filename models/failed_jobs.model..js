const mongoose = require('mongoose');
const { paginate, toJSON, fieldsAlias } = require('./../plugins');

const { Schema, model } = mongoose;

const FailedJobsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: name => FailedJobs.doseNotExist({ name }),
        message: () => 'FailedJob name has already been taken.'
      }
    },
    code: {
      type: String,
      validate: {
        validator: code => FailedJobs.doseNotExist({ code }),
        message: () => 'code has already been taken.'
      }
    },
    callback_url: String,
    user_id: Schema.Types.ObjectId
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
FailedJobsSchema.plugin(toJSON);
FailedJobsSchema.plugin(paginate);

FailedJobsSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const FailedJobs = model('FailedJobs', FailedJobsSchema);

module.exports = FailedJobs;
