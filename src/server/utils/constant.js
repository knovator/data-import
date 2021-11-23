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
