import { Router } from "express";
import {
  executeTransaction,
  listAllTransactions,
  listAllUserTransactions,
} from "../../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.post("/", executeTransaction);

transactionRouter.get("/all", listAllTransactions);
transactionRouter.get("/account/:accountId", listAllUserTransactions);

export { transactionRouter };
