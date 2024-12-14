import Joi from "joi";

export const getTransactionDetailsSchema = Joi.object({
  transactionReference: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  reference: Joi.string().required(),
});
