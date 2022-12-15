import createError from "http-errors";

import { db } from "../models/index.js";
import { executeTradeValidation } from "../validation/trade.validation.js";

const Fee = db.feesModel;
const Admin = db.adminModel;
const Account = db.accountModel;
const Trade = db.tradeModel;

const executeTrade = async (request, response, next) => {
  try {
    const { accountId, adminId, amount, type, feeId } =
      await executeTradeValidation.validateAsync(request.body);

    const checkAccount = await Account.findOne({ where: { id: accountId } });
    const checkAdmin = await Admin.findOne({ where: { id: adminId } });
    const checkFee = await Fee.findOne({ where: { id: feeId } });

    if (!checkAdmin) throw createError.BadRequest("Admin does not exist!");
    if (!checkAccount) throw createError.BadRequest("Account does not exist!");
    if (!checkFee) throw createError.BadRequest("Fee does not exist!");

    const value = amount - checkFee.value;

    const accountTotalCredit = checkAccount.balance;
    const creditToReflect =
      type === "Deposit"
        ? accountTotalCredit + value
        : accountTotalCredit - value;

    const trade = await Trade.create({
      amount,
      accountId,
      adminId,
      feeId,
      value: value,
      type,
    });

    const updateAccount = await Account.update(
      {
        balance: creditToReflect,
      },
      { where: { id: accountId } }
    );

    response.status(201).send({ message: "Trade Successful...", trade });
  } catch (error) {
    error.isJoi ? (error.status = 422) : null;
    next(error);
  }
};

const listAllTrades = async (request, response, next) => {
  try {
    const all = await Trade.findAll();

    response.status(200).send({
      trades: all,
    });
  } catch (error) {
    next(error);
  }
};

export { executeTrade, listAllTrades };
