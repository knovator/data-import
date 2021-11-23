import mongoose from 'mongoose';
import { paginate, toJSON, fieldsAlias } from '../plugins';
import CommonSchemas from './common.model';

const { Schema, model } = mongoose;

/**
 * @shorthands
 * nm:name
 * cd:code
 * u:user
 * uId:userId
 * uNm:userName
 */
const ProjectsSchema = new Schema(
  {
    nm: {
      type: String,
      required: true,
      validate: {
        validator: nm => Projects.doseNotExist({ nm }),
        message: () => 'Project name has already been taken.'
      },
      alias: 'name'
    },
    cd: {
      type: String,
      validate: {
        validator: cd => Projects.doseNotExist({ cd }),
        message: () => 'code has already been taken.'
      },
      alias: 'code'
    },
    cbUrl: {
      type: String,
      alias: 'callbackUrl'
    },

    // we may not need this because of uBy and cBy
    u: {
      type: {
        uId: {
          type: Schema.Types.ObjectId,
          alias: 'userId',
          ref: 'Users'
        },
        uNm: {
          type: String,
          alias: 'userName'
        }
      },
      alias: 'user'
    }
  },
  {
    timestamps: true
  }
);

// adding virtual to load templates of projects
ProjectsSchema.virtual('templates', {
  ref: 'Templates', // the collection/model name
  localField: '_id',
  foreignField: 'p.id',
  justOne: false // default is false
});

ProjectsSchema.add(CommonSchemas.IPSchema);
ProjectsSchema.add(CommonSchemas.ActionBySchema);

// add plugin that converts mongoose to json
ProjectsSchema.plugin(toJSON);
ProjectsSchema.plugin(paginate);
ProjectsSchema.plugin(fieldsAlias);

ProjectsSchema.set('toObject', { virtuals: true });
ProjectsSchema.set('toJSON', { virtuals: true });
// ProjectsSchema.pre('save', async function() {
//   // Todo: add user details from token
// });

ProjectsSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Projects = model('Projects', ProjectsSchema);

export default Projects;
