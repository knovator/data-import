import mongoose from 'mongoose';
import { paginate, toJSON } from '../plugins';

const { Schema, model } = mongoose;

const FilesSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      validate: {
        validator: name => Files.doseNotExist({ name }),
        message: () => 'name has already been taken.'
      }
    },
    size: String,
    mimeType: String,
    uId: Schema.Types.ObjectId,
    tId: Schema.Types.ObjectId
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
FilesSchema.plugin(toJSON);
FilesSchema.plugin(paginate);

FilesSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Files = model('Files', FilesSchema);

export default Files;
