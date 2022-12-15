import { Router } from "express";
import {
  adminLogin,
  adminRegister,
  deleteAdmin,
  getAdmin,
  getAllAdmins,
  updateAdmin,
} from "../../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);

adminRouter.get("/all", getAllAdmins);
adminRouter.get("/:adminId", getAdmin);

adminRouter.put("/:adminId", updateAdmin);

adminRouter.delete("/:adminId", deleteAdmin);

export { adminRouter };
