const { Joi } = require('express-validation');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  // GET /v1/templates
  listTemplate: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100)
    }
  },

  // POST /v1/templates
  createTemplate: {
    body: {
      name: Joi.string()
        .min(3)
        .required(),
      code: Joi.string()
        .uppercase()
        .min(3)
        .required(),
      callbackUrl: Joi.string(),
      project: Joi.object({
        code: Joi.string(),
        id: Joi.string(),
        name: Joi.string()
      }),
      user: Joi.object({
        userId: Joi.objectId(),
        userName: Joi.string()
      })
    }
  },

  // PUT /v1/templates/:templateId
  replaceTemplate: {
    body: {
      name: Joi.string()
        .min(3)
        .required(),
      code: Joi.string()
        .uppercase()
        .min(3)
        .required(),
      callbackUrl: Joi.string(),
      project: Joi.object({
        code: Joi.string(),
        id: Joi.string(),
        name: Joi.string()
      }),
      user: Joi.object({
        userId: Joi.objectId(),
        userName: Joi.string()
      })
    },
    params: {
      templateId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/templates/:templateId
  updateTemplate: {
    body: {
      name: Joi.string()
        .min(3)
        .required(),
      code: Joi.string()
        .uppercase()
        .min(3)
        .required(),
      callbackUrl: Joi.string(),
      project: Joi.object({
        code: Joi.string(),
        id: Joi.string(),
        name: Joi.string()
      }),
      user: Joi.object({
        userId: Joi.objectId(),
        userName: Joi.string()
      })
    },
    params: {
      templateId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
