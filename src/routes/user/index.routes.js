import { Router } from "express";

import {
  deleteUser,
  getAllUsers,
  getUser,
  searchByPhoneNumber,
  updateUser,
  userLogin,
  userRegister,
} from "../../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.get("/all", getAllUsers);
userRouter.get("/:userId", getUser);
userRouter.get("/search/:phoneNumber", searchByPhoneNumber);

userRouter.put("/:userId", updateUser);

userRouter.delete("/:userId", deleteUser);

export { userRouter };
