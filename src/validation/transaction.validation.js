import Joi from "joi";

const executeTransactionValidation = Joi.object({
  amount: Joi.number().required().min(0),
  accountRecieverID: Joi.string().required(),
  accountSenderID: Joi.string().required(),
  description: Joi.string(),
});

export { executeTransactionValidation };
