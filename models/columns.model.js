import mongoose from 'mongoose';
import { paginate, toJSON, fieldsAlias } from './../plugins';

const { Schema, model } = mongoose;

const { Types } = Schema;

const ColumnSchema = new Schema(
  {
    tId: {
      type: Types.ObjectId,
      ref: 'Templates',
      required: true
    },
    nm: {
      type: String,
      required: true,
      validate: {
        validator: nm => Columns.doseNotExist({ nm }),
        message: () => 'Column name has already been taken.'
      },
      alias: 'name'
    },
    k: {
      type: String,
      required: true,
      validate: {
        validator: k => Columns.doseNotExist({ k }),
        message: () => 'key has already been taken.'
      },
      alias: 'key'
    },
    aK: {
      type: String,
      validate: {
        validator: aK => Columns.doseNotExist({ aK }),
        message: () => 'alternate key has already been taken.'
      },
      alias: 'altKey'
    },
    r: {
      type: Boolean,
      default: false,
      required: true,
      alias: 'required'
    },
    u: {
      type: Boolean,
      default: false,
      required: true,
      alias: 'unique'
    },
    typ: {
      type: String,
      required: true,
      enum: ['STRING', 'NUMBER', 'DATE', 'EMAIL', 'PHONE', 'GST', 'ANY', 'REGEX'],
      alias: 'type'
    },
    rgx: { type: String, alias: 'regex' },
    s: {
      type: String,
      enum: ['ACE', 'DCE', 'ANY'],
      default: 'NONE',
      alias: 'sort'
    },
    t: {
      type: String,
      enum: ['UPPER', 'LOWER', 'ANY'],
      default: 'ANY'
    },
    dcm: {
      type: Number,
      alias: 'decimal'
    },
    seq: {
      type: Number,
      required: true,
      alias: 'sequence'
    }
  },
  {
    timestamps: true
    // strict: false
  }
);

// add plugin that converts mongoose to json
ColumnSchema.plugin(toJSON);
ColumnSchema.plugin(paginate);
ColumnSchema.plugin(fieldsAlias);

ColumnSchema.set('toObject', { virtuals: true });
ColumnSchema.set('toJSON', { virtuals: true });

ColumnSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Columns = model('Columns', ColumnSchema);

export default Columns;
