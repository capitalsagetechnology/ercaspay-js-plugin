import Joi from "joi";

export const cardSchema = Joi.object({
  payload: Joi.string().required(),
  transactionReference: Joi.string().required(),
  deviceDetails: Joi.object({
    payerDeviceDto: Joi.object({
      device: Joi.object({
        browser: Joi.string().required(),
        browserDetails: Joi.object({
          "3DSecureChallengeWindowSize": Joi.string().required(),
          acceptHeaders: Joi.string().required(),
          colorDepth: Joi.number().required(),
          javaEnabled: Joi.boolean().required(),
        }),
      }),
    }),
  }),
  ipAddress: Joi.string().optional(),
});
