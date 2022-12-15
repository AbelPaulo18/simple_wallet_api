import Joi from "joi";

const executeTradeValidation = Joi.object({
  accountId: Joi.string().required(),
  adminId: Joi.string().required(),
  feeId: Joi.string().required(),
  amount: Joi.number().required().min(0),
  type: Joi.string().allow("Deposit", "Cashout").required(),
});

export { executeTradeValidation };
