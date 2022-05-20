const mongoose = require('mongoose');
const { paginate, toJSON, fieldsAlias } = require('./../plugins');

const { Schema, model } = mongoose;

const FilesSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    fieldname: {
      type: String
    },
    originalname: {
      type: String
    },
    encoding: {
      type: String
    },
    mimetype: {
      type: String
    },
    destination: {
      type: String
    },
    filename: {
      type: String
    },
    path: {
      type: String
    },
    size: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
FilesSchema.plugin(toJSON);
FilesSchema.plugin(paginate);

FilesSchema.statics.doseNotExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Files = model('Files', FilesSchema);

module.exports = Files;
