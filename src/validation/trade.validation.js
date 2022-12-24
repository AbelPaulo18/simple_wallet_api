import Joi from "joi";

const executeTradeValidation = Joi.object({
  accountId: Joi.number().required(),
  adminId: Joi.number().required(),
  feeId: Joi.number().required(),
  amount: Joi.number().required().min(0),
  type: Joi.string().allow("Deposit", "Cashout").required(),
});

export { executeTradeValidation };
