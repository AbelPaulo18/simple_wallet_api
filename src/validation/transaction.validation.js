import Joi from "joi";

const executeTransactionValidation = Joi.object({
  amount: Joi.number().required().min(0),
  accountRecieverID: Joi.number().required(),
  accountSenderID: Joi.number().required(),
  description: Joi.string(),
});

export { executeTransactionValidation };
