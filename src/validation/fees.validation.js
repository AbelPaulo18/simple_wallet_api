import Joi from "joi";

const createFeesValidation = Joi.object({
  name: Joi.string().required().min(3),
  value: Joi.number().required().min(0),
});

const updateFeesValidation = Joi.object({
  name: Joi.string().min(3),
  value: Joi.number().min(0),
});

export { createFeesValidation, updateFeesValidation };
