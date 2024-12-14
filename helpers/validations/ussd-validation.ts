import Joi from "joi";


export const initiateCodeSchema = Joi.object({
    transactionReference: Joi.string().required(),
    amount: Joi.number().required(),
    bankName: Joi.string().required()
})