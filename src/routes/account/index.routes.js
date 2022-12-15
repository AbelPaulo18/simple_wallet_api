import { Router } from "express";
import { listAllAccounts } from "../../controllers/account.controller.js";

const accountRouter = Router();

accountRouter.get("/all", listAllAccounts);

export { accountRouter };
