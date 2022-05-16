const { Joi } = require('express-validation');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  // GET /v1/projects
  listProjects: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100)
    }
  },

  // POST /v1/projects
  createProject: {
    nm: Joi.string()
      .min(3)
      .required(),
    cd: Joi.string()
      .uppercase()
      .min(3)
      .required(),
    cbUrl: Joi.string(),
    u: Joi.object({
      userId: Joi.objectId(),
      userName: Joi.string()
    })
  },

  // PUT /v1/projects/:projectId
  replaceProject: {
    body: {
      name: Joi.string()
        .min(3)
        .required(),
      code: Joi.string()
        .uppercase()
        .min(3)
        .required(),
      callbackUrl: Joi.string(),
      user: Joi.object({
        userId: Joi.objectId(),
        userName: Joi.string()
      })
    },
    params: {
      projectId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/projects/:projectId
  updateProject: {
    body: {
      name: Joi.string().min(3),
      code: Joi.string()
        .uppercase()
        .min(3),
      callbackUrl: Joi.string(),
      user: Joi.object({
        userId: Joi.objectId(),
        userName: Joi.string()
      })
    },
    params: {
      projectId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
