import createError from "http-errors";
import { Op } from "sequelize";

import { db } from "../models/index.js";
import { executeTradeValidation } from "../validation/trade.validation.js";
import { executeTransactionValidation } from "../validation/transaction.validation.js";

const Transaction = db.transactionModel;
const User = db.userModel;
const Account = db.accountModel;

const executeTransaction = async (request, response, next) => {
  try {
    const { amount, accountRecieverID, accountSenderID, description } =
      await executeTransactionValidation.validateAsync(request.body);

    const checkIfSenderAccountExists = await Account.findOne({
      where: { id: accountSenderID },
    });

    if (!checkIfSenderAccountExists)
      throw createError("Sender accound does not exists...");

    if (!checkIfSenderAccountExists.balance >= amount)
      throw createError.BadRequest("Insuficient funds...");

    const userAccount = await Account.findOne({
      where: { id: accountRecieverID },
    });

    if (!userAccount) throw createError.BadRequest("Account does not exist");

    const transaction = await Transaction.create({
      amount,
      accountRecieverID,
      accountSenderID,
      description,
    });

    const senderTotalBalance = checkIfSenderAccountExists.balance - amount;
    const recieverTotalBalance = userAccount.balance + amount;

    if (senderTotalBalance <= 0)
      return response.status(400).send({
        message: "Insuficient founds",
        availableAmount: checkIfSenderAccountExists.balance,
      });

    const addCredit = {
      balance: recieverTotalBalance,
    };

    const removeCredit = {
      balance: senderTotalBalance,
    };

    const handleRemoveCredit = await Account.update(removeCredit, {
      where: { id: accountSenderID },
    });
    const handleAddCredit = await Account.update(addCredit, {
      where: { id: userAccount.id },
    });

    const transactionDone = await Transaction.update(
      { status: "Done" },
      { where: { id: transaction.id } }
    );

    response.status(200).send({ transaction: transactionDone });
  } catch (error) {
    next(error);
  }
};

const listAllTransactions = async (request, response, next) => {
  try {
    const all = await Transaction.findAll();

    response.send({ all });
  } catch (error) {
    next(error);
  }
};

const listAllUserTransactions = async (request, response, next) => {
  try {
    const { accountId } = request.params;

    const verifyAccount = await Account.findOne({ where: { id: accountId } });

    if (!verifyAccount) throw createError.BadRequest("Account does not exist!");

    const allUserAccountTransactions = await Transaction.findAndCountAll({
      where: {
        [Op.or]: [
          { accountSenderID: accountId },
          { accountRecieverID: accountId },
        ],
      },
    });

    response.status(200).send({
      accountTransactions: allUserAccountTransactions,
    });
  } catch (error) {
    next(error);
  }
};

export { executeTransaction, listAllTransactions, listAllUserTransactions };
