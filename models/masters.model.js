import mongoose from 'mongoose';
import { paginate, toJSON } from '../plugins';
import CommonSchema from './common.model';

const { Schema, model } = mongoose;

const MastersSchema = new Schema(
  {
    nm: {
      type: String,
      required: true,
      alias: 'name'
    },
    cd: {
      type: String,
      required: true,
      validate: {
        validator: code => Masters.doseNotExist({ code }),
        message: () => 'code has already been taken.'
      },
      alias: 'code'
    },
    img: {
      type: String,
      alias: 'image'
    },
    grp: {
      type: String,
      allowNull: true,
      alias: 'group'
    },
    pCd: {
      type: String,
      alias: 'parentCode'
    },
    wd: {
      type: String,
      alias: 'webDisplay'
    },
    a: {
      type: Boolean,
      default: true,
      alias: 'active'
    },
    // likeKeyWords: String,
    wV: {
      type: Boolean,
      default: true,
      alias: 'webVisible'
    }
  },
  {
    timestamps: true
  }
);

MastersSchema.add(CommonSchema.IPSchema);
MastersSchema.add(CommonSchema.ActionBySchema);

// add plugin that converts mongoose to json
MastersSchema.plugin(toJSON);
MastersSchema.plugin(paginate);

MastersSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Masters = model('Masters', MastersSchema);

export default Masters;
