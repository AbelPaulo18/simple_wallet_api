import createError from "http-errors";

import { db } from "../models/index.js";
import {
  createFeesValidation,
  updateFeesValidation,
} from "../validation/fees.validation.js";

const Fees = db.feesModel;

const createFee = async (request, response, next) => {
  try {
    const { name, value } = await createFeesValidation.validateAsync(
      request.body
    );

    const checkIfFeeExists = await Fees.findOne({ where: { name } });

    if (checkIfFeeExists) throw createError.BadRequest("Fee already Exists...");

    const fee = await Fees.create({
      name,
      value,
    });

    response.status(201).send({ message: "Fee created!", fee });
  } catch (error) {
    error.isJoi ? (error.status = 404) : null;
    next(error);
  }
};

const getSpecificFee = async (request, response, next) => {
  try {
    const { feeId } = request.params;

    const fee = await Fees.findOne({ where: { id: feeId } });

    response.status(200).send({ fee });
  } catch (error) {
    next(error);
  }
};

const listAllFees = async (request, response, next) => {
  try {
    const fees = await Fees.findAll();

    response.status(200).send({ all: fees });
  } catch (error) {
    next(error);
  }
};

const updateFee = async (request, response, next) => {
  try {
    const { feeId } = request.params;
    const bodySchema = await updateFeesValidation.validateAsync(request.body);

    const fee = await Fees.update(bodySchema, { where: { id: feeId } });

    response.status(200).send({ message: "Fee updated...", fee });
  } catch (error) {
    next(error);
  }
};

const deleteFee = async (request, response, next) => {
  try {
    const { feeId } = request.params;

    const fee = await Fees.delete({ where: { id: feeId } });

    response.status(200).send({ message: "Fee deleted...", fee });
  } catch (error) {
    next(error);
  }
};

export { createFee, listAllFees, getSpecificFee, updateFee, deleteFee };
