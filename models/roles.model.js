const mongoose = require('mongoose');
const { paginate, toJSON, fieldsAlias } = require('./../plugins');

const { Schema, model } = mongoose;

/**
 * @shorthands
 * @param nm:name => name of role
 * @param cd:code => code of role
 * @param w:weight => weight of role to define hierarchy
 * @param a:active => manage role via active
 */
const RolesSchema = new Schema(
  {
    nm: {
      type: String,
      required: true,
      validate: {
        validator: name => Settings.doseNotExist({ name }),
        message: () => 'Setting name has already been taken.'
      },
      alias: 'name'
    },
    cd: {
      type: String,
      validate: {
        validator: code => Settings.doseNotExist({ code }),
        message: () => 'code has already been taken.'
      },
      alias: 'code'
    },
    w: {
      type: String,
      alias: 'weight'
    },
    a: {
      type: Boolean,
      default: true,
      alias: 'active'
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
RolesSchema.plugin(toJSON);

RolesSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Settings = model('Roles', RolesSchema);

Settings.RolesSchema = RolesSchema;

module.exports = Settings;
