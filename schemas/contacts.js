const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .trim()
    .required(),
  phone: Joi.string().min(9).max(15).trim().required(),
});

module.exports = { schema };
