import mongoose from 'mongoose';
import { paginate, toJSON } from '../plugins';

const { Schema, model } = mongoose;

const SettingsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: name => Settings.doseNotExist({ name }),
        message: () => 'Setting name has already been taken.'
      }
    },
    code: {
      type: String,
      validate: {
        validator: code => Settings.doseNotExist({ code }),
        message: () => 'code has already been taken.'
      }
    },
    type: String, // enum
    val: Schema.Types.Mixed,
    dVal: Schema.Types.Mixed,
    active: {
      type: Boolean,
      default: true
    },
    webShow: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
SettingsSchema.plugin(toJSON);
SettingsSchema.plugin(paginate);

SettingsSchema.statics.doseNotExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Settings = model('Settings', SettingsSchema);

export default Settings;
