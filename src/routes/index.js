import { Router } from "express";
import { accountRouter } from "./account/index.routes.js";
import { adminRouter } from "./admin/admin.routes.js";
import { feeRouter } from "./fees/index.routes.js";
import { tradeRouter } from "./trade/index.routes.js";
import { transactionRouter } from "./transaction/index.routes.js";
import { userRouter } from "./user/index.routes.js";

const mainRouter = Router();

mainRouter.use("/admin", adminRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);
mainRouter.use("/fee", feeRouter);
mainRouter.use("/trade", tradeRouter);
mainRouter.use("/transaction", transactionRouter);

export { mainRouter };
