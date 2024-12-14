import Joi from "joi";

export const getTransactionDetailsSchema = Joi.object({
  transactionReference: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  reference: Joi.string().required(),
});

export const initiateTransactionSchema = Joi.object({
  amount: Joi.number().required(),
  paymentReference: Joi.string().required(),
  paymentMethods: Joi.string().optional(),
  customerName: Joi.string().required(),
  customerEmail: Joi.string().email().required(),
  customerPhoneNumber: Joi.string().optional(),
  currency: Joi.string().required(),
  feeBearer: Joi.string().valid("customer", "merchant").optional(),
  redirectUrl: Joi.string().optional(),
  description: Joi.string().optional(),
  metadata: Joi.object().optional(),
});
