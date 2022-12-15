import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createError from "http-errors";

import { db } from "../../models/index.js";

dotenv.config();
const User = db.userModel;

const createTokens = async (user, res, statusCode, message) => {
  const Token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res
    .status(statusCode)
    .send({ message: statusCode == 200 ? true : message, Token });
};

export { createTokens };
