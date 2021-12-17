/**
 * Mapping of DataTypes Used in Columns with actual DataTypes in mongoose/Joi
 */

exports.DT_TO_JOI_DT_MAPPING = {
  STRING: 'string',
  NUMBER: 'number',
  DATE: 'string',
  EMAIL: 'string',
  PHONE: 'any',
  GST: 'any',
  ANY: 'any',
  REGEX: 'any'
};

exports.QUEUES = {
  processingFile: 'PROCESSING_FILE',
  convertingToJSON: 'CONVERTING_TO_JSON',
  sendingJSON: 'SENDING_JSON'
};
