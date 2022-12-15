import { Router } from "express";
import {
  createFee,
  deleteFee,
  getSpecificFee,
  listAllFees,
  updateFee,
} from "../../controllers/fee.controller.js";

const feeRouter = Router();

feeRouter.post("/", createFee);

feeRouter.get("/all", listAllFees);
feeRouter.get("/:feeId", getSpecificFee);

feeRouter.put("/:feeId", updateFee);

feeRouter.delete("/:feeId", deleteFee);

export { feeRouter };
