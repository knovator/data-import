const Enjoi = require('enjoi');
const { DT_TO_JOI_DT_MAPPING } = require('./constant');

/**
 * Normalize File Name
 * @param {String} fileName
 * @return {String} Normalized fileName
 */
exports.normalizeFileName = fileName => {
  console.log('fileName', fileName);
  if (typeof fileName === 'string') {
    let name = fileName.replaceAll('[^a-zA-Z0-9_-]', '_');
    name = name.toLowerCase();

    return name;
  }
  return fileName;
};

/**
 * from Columns to Json Schema
 * @param {Array} columns
 * @returns JSON schema
 */
exports.columnsToJSONSchema = columns => {
  const schemaObj = {
    type: 'object',
    properties: {},
    required: []
  };

  if (Array.isArray(columns)) {
    columns.forEach(column => {
      const columnSchema = {};
      columnSchema.type = DT_TO_JOI_DT_MAPPING[column.typ];
      schemaObj.properties[column.k] = columnSchema;
      // if column is required then push it to list of required columns
      if (column.r) schemaObj.required.push(column.k);
    });
  }
  return schemaObj;
};

/**
 * from JSON schema to Joi Schema
 * @param {Object} JSON schema
 * @return {Joi} Joi schema instance
 */
exports.jsonSchemaToJoiSchema = jsonSchema => {
  return Enjoi.schema(jsonSchema);
};

/**
 * from Columns to Joi Schema instance
 * @param {Array} columns
 * @return {Joi} joi schema
 */
exports.columnsToJoiSchema = async columns => {
  const jsonSchema = await this.columnsToJSONSchema(columns);
  const joiSchema = await this.jsonSchemaToJoiSchema(jsonSchema);
  return joiSchema;
};

/**
 * from columns to Name and Key mapping
 * @param {Array} columns
 * @returns {Object} mapping object
 */
exports.mapColNameToKey = async columns => {
  console.log('columns', columns);
  const obj = {};
  columns.forEach(column => {
    obj[column.nm] = column.k;
  });
  return obj;
};

/**
 * converting circular data to simple data
 */
exports.circularReplacer = () => {
  // Creating new WeakSet to keep
  // track of previously seen objects
  const seen = new WeakSet();

  return (key, value) => {
    // If type of value is an
    // object or value is null
    if (typeof value === 'object' && value !== null) {
      // If it has been seen before
      if (seen.has(value)) {
        return;
      }

      // Add current value to the set
      seen.add(value);
    }

    // return the value
    return value;
  };
};
