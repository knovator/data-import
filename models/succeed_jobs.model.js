const mongoose = require('mongoose');
const { paginate, toJSON, fieldsAlias } = require('./../plugins');

const { Schema, model } = mongoose;

const SucceedJobsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: name => SucceedJobs.doseNotExist({ name }),
        message: () => 'Project name has already been taken.'
      }
    },
    code: {
      type: String,
      validate: {
        validator: code => SucceedJobs.doseNotExist({ code }),
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
SucceedJobsSchema.plugin(toJSON);
SucceedJobsSchema.plugin(paginate);

SucceedJobsSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const SucceedJobs = model('SucceedJobs', SucceedJobsSchema);

module.exports = SucceedJobs;
