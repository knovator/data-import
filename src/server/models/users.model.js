import { compare, hash } from 'bcryptjs';
import mongoose from 'mongoose';
import CommonSchema from './common.model';
import { RolesSchema } from './roles.model';

const { Schema, model } = mongoose;

/**
 * @shorthands
 * fNm:firstName
 * lNm:lastName
 */
const UserSchema = new Schema(
  {
    fNm: {
      type: String,
      require: true,
      alias: 'firstName'
    },
    lNm: {
      type: String,
      require: true,
      alias: 'lastName'
    },
    uNm: {
      type: String,
      validate: {
        validator: uNm => User.doseNotExist({ uNm }),
        message: () => 'Username has already been taken.'
      },
      alias: 'userName'
    },
    emails: [
      {
        email: {
          type: String,
          validate: {
            validator: email => User.doseNotExist({ 'emails.email': email }),
            message: () => 'Email has already been taken.'
          }
        },
        v: {
          type: Boolean,
          default: false,
          alias: 'verified'
        }
      }
    ],
    tels: [
      {
        phn: {
          type: String,
          validate: {
            validator: phn => User.doseNotExist({ 'tels.phn': phn }),
            message: () => 'phone has already been taken.'
          },
          alias: 'phone'
        },
        v: {
          type: Boolean,
          default: false,
          alias: 'verified'
        },
        cc: {
          type: String,
          alias: 'countryCode'
        }
      }
    ],
    pwd: {
      type: String,
      alias: 'password'
    },
    img: {
      type: String,
      alias: 'picture'
    },
    tz: {
      type: String,
      default: 'Asia/Calcutta|Asia/Kolkata',
      alias: 'timeZone'
    },
    lL: {
      type: Date,
      allowNull: true,
      alias: 'lastLogin'
    },
    stg: {
      type: Schema.Types.Mixed, /// not sure !!
      allowNull: true,
      alias: 'settings'
    },
    v: {
      type: Boolean,
      default: false,
      alias: 'verified'
    },
    a: {
      type: Boolean,
      default: true,
      alias: 'active'
    },
    r: {
      type: [RolesSchema],
      alias: 'roles'
    }
  },
  {
    timestamps: true
  }
);

UserSchema.add(CommonSchema.IPSchema);
UserSchema.add(CommonSchema.ActionBySchema);

UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
});

UserSchema.pre('update', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
});

UserSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

UserSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

const User = model('User', UserSchema);

export default User;
