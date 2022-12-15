import createError from "http-errors";
import bcrypt from "bcrypt";

import {
  userLoginValidation,
  userRegisterValidation,
  userUpdateValidation,
} from "../validation/user.validation.js";
import { db } from "../models/index.js";
import { createTokens } from "../utils/JWT/index.js";

const Admin = db.adminModel;

const adminRegister = async (request, response, next) => {
  try {
    const { name, email, password, phoneNumber } =
      await userRegisterValidation.validateAsync(request.body);

    const checkIfUserExistsByPhoneNumber = await Admin.findOne({
      where: { phoneNumber },
    });

    const checkIfUserExistsByEmail = await Admin.findOne({
      where: { email },
    });

    if (checkIfUserExistsByEmail || checkIfUserExistsByPhoneNumber)
      throw createError.BadRequest("Invalid credentials!");

    bcrypt
      .hash(password, 12)
      .then(async (hash) => {
        await Admin.create({
          name,
          email,
          password: hash,
          phoneNumber,
        });
      })
      .catch((error) => {
        throw createError.BadRequest("Error during password hasing...");
      });

    createTokens(Admin, response, 201);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const adminLogin = async (request, response, next) => {
  try {
    const { password, phoneNumber } = await userLoginValidation.validateAsync(
      request.body
    );

    const checkIfAdminExists = await Admin.findOne({
      where: { phoneNumber },
    });

    const verifyPassword = bcrypt.compareSync(
      password,
      checkIfAdminExists.password
    ); // Verify the hashed password and the typed password from user

    if (!checkIfAdminExists)
      throw createError.BadRequest("Invalid credentials!");

    if (!verifyPassword) throw createError.BadRequest("Wrong Password...");

    createTokens(Admin, response, 200);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const getAllAdmins = async (request, response, next) => {
  try {
    const allRegisteredAdmins = await Admin.findAll();
    response.status(200).send({ admins: allRegisteredAdmins });
  } catch (error) {
    next(error);
  }
};

const getAdmin = async (request, response, next) => {
  try {
    const { adminId } = request.params;

    const admin = await Admin.findOne({ where: { id: adminId } });

    response.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (request, response, next) => {
  try {
    const { adminId } = request.params;
    const bodySchema = await userUpdateValidation.validateAsync(request.body);

    const admin = await Admin.update(bodySchema, { where: { id: adminId } });

    response.status(200).send({ admin });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (request, response, next) => {
  try {
    const { adminId } = request.params;

    const admin = await Admin.destroy({ where: { id: adminId } });

    response
      .status(200)
      .send({ message: "admin successfuly deleted...", admin });
  } catch (error) {
    next(error);
  }
};

export {
  adminLogin,
  adminRegister,
  deleteAdmin,
  getAllAdmins,
  updateAdmin,
  getAdmin,
};
