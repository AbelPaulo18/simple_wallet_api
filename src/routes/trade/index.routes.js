import { Router } from "express";
import {
  executeTrade,
  listAllTrades,
} from "../../controllers/trade.controller.js";

const tradeRouter = Router();

tradeRouter.post("/", executeTrade);

tradeRouter.get("/all", listAllTrades);

export { tradeRouter };
