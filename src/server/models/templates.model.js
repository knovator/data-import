import mongoose from 'mongoose';
import { paginate, toJSON } from '../plugins';

const { Schema, model } = mongoose;

/**
 * #ShortNames
 * projectCode > pCode
 * callbackUrl > cbUrl
 * projectId   > pId
 */
const TemplateSchema = new Schema(
  {
    nm: {
      type: String,
      required: true,
      validate: {
        validator: nm => Templates.doseNotExist({ nm }),
        message: () => 'Template name has already been taken.'
      },
      alias: 'name'
    },
    cd: {
      type: String,
      validate: {
        validator: cd => Templates.doseNotExist({ cd }),
        message: () => 'code has already been taken.'
      },
      alias: 'code'
    },

    cbUrl: {
      type: String,
      alias: 'callbackUrl'
    },
    p: {
      type: {
        cd: {
          require: true,
          type: String,
          alias: 'code'
        },
        id: { type: Schema.Types.ObjectId, required: true, ref: 'Projects' },
        nm: { type: String, required: true, alias: 'name' }
      },
      alias: 'project'
    },
    sample: {
      type: {
        fNm: { type: String, alias: 'fileName' },
        oNm: {
          type: String,
          alias: 'originalName'
        },
        enc: { type: String, alias: 'encoding' },
        mT: { type: String, alias: 'mimetype' },
        path: { type: String },
        s: { type: Number }
      }
    },
    info: Object
  },
  {
    timestamps: true
  }
);

// TemplateSchema.virtual('project', {
//   ref: 'Projects', // the collection/model name
//   localField: 'project.id',
//   foreignField: '_id',
//   justOne: true // default is false
// });

// add plugin that converts mongoose to json
TemplateSchema.plugin(toJSON);
TemplateSchema.plugin(paginate);

TemplateSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Templates = model('Templates', TemplateSchema);

export default Templates;
