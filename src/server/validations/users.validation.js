const Joi = require('joi');

module.exports = {
  // GET /v1/users
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100)
    }
  },

  // POST /v1/users
  createUser: {
    body: {
      firstName: Joi.string()
        .max(56)
        .required(),
      lastName: Joi.string()
        .max(56)
        .required(),
      userName: Joi.string()
        .min(3)
        .max(24)
        .required(),
      emails: Joi.array().items(
        Joi.object({
          email: Joi.string()
            .email()
            .required(),
          verified: Joi.boolean()
        })
      ),
      tels: Joi.array().items(
        Joi.object({
          phn: Joi.string()
            .min(7)
            .required(),
          verified: Joi.boolean(),
          countryCode: Joi.any() // TODO: should be perfect
        })
      ),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      picture: Joi.string(),
      lL: Joi.string(),
      settings: Joi.object(),
      verified: Joi.boolean(),
      active: Joi.boolean(),
      timeZone: Joi.string().required(),
      lastLogin: Joi.string(),
      roles: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          code: Joi.string()
        })
      )
    }
  },

  // PUT /v1/users/:userId
  replaceUser: {
    body: {
      firstName: Joi.string()
        .max(56)
        .required(),
      lastName: Joi.string()
        .max(56)
        .required(),
      userName: Joi.string()
        .min(3)
        .max(24)
        .required(),
      emails: Joi.array().items(
        Joi.object({
          email: Joi.string()
            .email()
            .required(),
          verified: Joi.boolean()
        })
      ),
      tels: Joi.array().items(
        Joi.object({
          phn: Joi.string()
            .min(7)
            .required(),
          verified: Joi.boolean(),
          countryCode: Joi.any() // TODO: should be perfect
        })
      ),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      picture: Joi.string(),
      lL: Joi.string(),
      settings: Joi.object(),
      verified: Joi.boolean(),
      active: Joi.boolean(),
      timeZone: Joi.string().required(),
      lastLogin: Joi.string(),
      roles: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          code: Joi.string().uppercase()
        })
      )
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/users/:userId
  updateUser: {
    body: {
      firstName: Joi.string()
        .max(56)
        .required(),
      lastName: Joi.string()
        .max(56)
        .required(),
      userName: Joi.string()
        .min(3)
        .max(24)
        .required(),
      emails: Joi.array().items(
        Joi.object({
          email: Joi.string()
            .email()
            .required(),
          verified: Joi.boolean()
        })
      ),
      tels: Joi.array().items(
        Joi.object({
          phn: Joi.string()
            .min(7)
            .required(),
          verified: Joi.boolean(),
          countryCode: Joi.any() // TODO: should be perfect
        })
      ),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      picture: Joi.string(),
      lL: Joi.string(),
      settings: Joi.object(),
      verified: Joi.boolean(),
      active: Joi.boolean(),
      timeZone: Joi.string().required(),
      lastLogin: Joi.string(),
      roles: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          code: Joi.string().uppercase()
        })
      )
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
