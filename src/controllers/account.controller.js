import createError from "http-errors";

import { db } from "../models/index.js";

const Account = db.accountModel;

const listAllAccounts = async (request, response, next) => {
  try {
    const all = await Account.findAll();
    response.status(200).send({ accounts: all });
  } catch (error) {
    next(error);
  }
};

export { listAllAccounts };
