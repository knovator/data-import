import mongoose from 'mongoose';
import { paginate, toJSON, fieldsAlias } from '../plugins';

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
      cd: {
        require: true,
        type: String,
        alias: 'project.code'
      },
      id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Projects',
        alias: 'project.id'
        // autopopulate: true
      },
      nm: { type: String, required: true, alias: 'project.name' }
    },
    sample: {
      type: Object,
      fNm: { type: String, alias: 'sample.fileName' },
      oNm: {
        type: String,
        alias: 'sample.originalName'
      },
      enc: { type: String, alias: 'sample.encoding' },
      mT: { type: String, alias: 'sample.mimetype' },
      path: { type: String },
      s: { type: Number, alias: 'sample.size' }
    },
    info: Object
  },
  {
    timestamps: true,
    strict: false
  }
);

TemplateSchema.virtual('columns', {
  ref: 'Columns', // the collection/model name
  localField: 'id',
  foreignField: 'tId',
  justOne: false // default is false
});

// add plugin that converts mongoose to json
TemplateSchema.plugin(toJSON, { virtuals: true });
TemplateSchema.plugin(paginate, { virtuals: true });
TemplateSchema.plugin(fieldsAlias);
// TemplateSchema.plugin(require('mongoose-autopopulate'));

TemplateSchema.set('toObject', { virtuals: true });
TemplateSchema.set('toJSON', { virtuals: true });

TemplateSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Templates = model('Templates', TemplateSchema);

export default Templates;
