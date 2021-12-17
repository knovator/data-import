import mongoose from 'mongoose';

const { Schema } = mongoose;

const IPSchema = Schema({
  uIp: {
    type: String,
    alias: 'updateIP'
  },
  cIp: {
    type: String,
    alias: 'createIP'
  }
});

const ActionBySchema = Schema({
  cBy: {
    type: {
      id: Schema.Types.ObjectId,
      uNm: {
        type: String,
        alias: 'userName'
      },
      fNm: {
        type: String,
        alias: 'fullName'
      }
    },
    alias: 'createdBy'
  },
  uBy: {
    type: {
      id: Schema.Types.ObjectId,
      uNm: {
        type: String,
        alias: 'userName'
      },
      fNm: {
        type: String,
        alias: 'fullName'
      }
    },
    alias: 'updatedBy'
  },
  dBy: {
    type: String
  },
  dAt: {
    type: String
  }
});

const CommonSchemas = { IPSchema, ActionBySchema };

export default CommonSchemas;
