const Joi = require("joi");

const signupValidation = (request, response, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(request.body);
  if (error) {
    return response.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (request, response, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(request.body);
  if (error) {
    return response.status(400).json({ message: "Bad request", error });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
