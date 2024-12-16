import Joi from "joi";


export const initiateCodeSchema = Joi.object({
    transactionReference: Joi.string().required(),
    bankName: Joi.string().required()
})