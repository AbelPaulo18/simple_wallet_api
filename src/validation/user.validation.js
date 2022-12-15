import Joi from "joi";

const userRegisterValidation = Joi.object({
  name: Joi.string().required().min(3),
  phoneNumber: Joi.string().required().min(9).max(13),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required().min(4).alphanum(),
});

const userUpdateValidation = Joi.object({
  name: Joi.string().min(3),
  phoneNumber: Joi.string().min(9).max(13),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(4).alphanum(),
});

const userLoginValidation = Joi.object({
  phoneNumber: Joi.string().required().min(9).max(13),
  password: Joi.string().required().min(4).alphanum(),
});

export { userRegisterValidation, userLoginValidation, userUpdateValidation };
