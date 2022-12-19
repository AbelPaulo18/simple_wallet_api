import createError from "http-errors";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import {
  userLoginValidation,
  userRegisterValidation,
  userUpdateValidation,
} from "../validation/user.validation.js";
import { db } from "../models/index.js";
import { createTokens } from "../utils/JWT/index.js";
import { Op } from "sequelize";

const User = db.userModel;
const Account = db.accountModel;

const userRegister = async (request, response, next) => {
  try {
    const { name, email, password, phoneNumber } =
      await userRegisterValidation.validateAsync(request.body);

    const checkIfUserExistsByPhoneNumber = await User.findOne({
      where: { phoneNumber },
    });

    const checkIfUserExistsByEmail = await User.findOne({
      where: { email },
    });

    if (checkIfUserExistsByEmail || checkIfUserExistsByPhoneNumber)
      throw createError.BadRequest("Invalid credentials!");

    bcrypt
      .hash(password, 12)
      .then(async (hash) => {
        await User.create({
          name,
          email,
          password: hash,
          phoneNumber,
        });
      })
      .catch((error) => {
        throw createError.BadRequest("Error during password hasing...");
      })
      .then(async () => {
        try {
          const createdUser = await User.findOne({
            where: { phoneNumber },
          });
          await Account.create({
            ref: uuidv4(),
            userId: createdUser.id,
          });
        } catch (error) {
          next(error);
        }
      });

    createTokens(User, response, 201);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const userLogin = async (request, response, next) => {
  try {
    const { password, phoneNumber } = await userLoginValidation.validateAsync(
      request.body
    );

    const checkIfUserExistsByPhoneNumber = await User.findOne({
      where: { phoneNumber },
    });

    const verifyPassword = bcrypt.compareSync(
      password,
      checkIfUserExistsByPhoneNumber.password
    ); // Verify the hashed password and the typed password from user

    if (!checkIfUserExistsByPhoneNumber)
      throw createError.BadRequest("Invalid credentials!");

    if (!verifyPassword) throw createError.BadRequest("Wrong Password...");

    createTokens(User, response, 200);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const getAllUsers = async (request, response, next) => {
  try {
    const allRegisteredUsers = await User.findAll();
    response.status(200).send({ users: allRegisteredUsers });
  } catch (error) {
    next(error);
  }
};

const getUser = async (request, response, next) => {
  try {
    const { userId } = request.params;

    const user = await User.findOne({ where: { id: userId } });

    response.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

const searchByPhoneNumber = async (request, response, next) => {
  try {
    const { phoneNumber } = request.params;

    const users = await User.findAll({
      where: { phoneNumber: { [Op.like]: `%${phoneNumber}%` } },
    });

    response.status(200).send({ result: users });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response, next) => {
  try {
    const { userId } = request.params;
    const bodySchema = await userUpdateValidation.validateAsync(request.body);

    const user = await User.update(bodySchema, { where: { id: userId } });

    response.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (request, response, next) => {
  try {
    const { userId } = request.params;

    const user = await User.destroy({ where: { id: userId } });

    response.status(200).send({ message: "user successfuly deleted..." });
  } catch (error) {
    next(error);
  }
};

export {
  userRegister,
  userLogin,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  searchByPhoneNumber,
};
