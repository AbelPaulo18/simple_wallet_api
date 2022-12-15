import { Router } from "express";
import {
  executeTransaction,
  listAllTransactions,
} from "../../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.post("/", executeTransaction);

transactionRouter.get("/all", listAllTransactions);

export { transactionRouter };
