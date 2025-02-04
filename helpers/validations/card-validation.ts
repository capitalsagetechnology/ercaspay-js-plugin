import Joi from "joi";

export const cardSchema = Joi.object({
  payload: Joi.string().required(),
  transactionReference: Joi.string().required(),
  deviceDetails: Joi.object({
    payerDeviceDto: Joi.object({
      device: Joi.object({
        browser: Joi.string().optional(),
        browserDetails: Joi.object({
          "3DSecureChallengeWindowSize": Joi.string().required(),
          acceptHeaders: Joi.string().required(),
          colorDepth: Joi.number().required(),
          javaEnabled: Joi.boolean().required(),
          language: Joi.string().required(),
          screenHeight: Joi.number().required(),
          screenWidth: Joi.number().required(),
          timeZone: Joi.required(),
        }).required(),
        ipAddress: Joi.string().optional(),
      }).required(),
    }).required(),
  }).required(),
});

export const submitOTPSchema = Joi.object({
  otp: Joi.string().required(),
  gatewayReference: Joi.string().required(),
  transactionReference: Joi.string().required(),
});

export const resendOTPSchema = submitOTPSchema
  .fork(["otp"], (schema) => schema.forbidden())
  .unknown(false);
