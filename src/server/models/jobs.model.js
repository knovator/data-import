import mongoose from 'mongoose';
import { paginate, toJSON } from '../plugins';

const { Schema, model } = mongoose;

const JobsSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    jType: String,
    uId: Schema.Types.ObjectId,
    tId: Schema.Types.ObjectId,
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

export default Jobs;
