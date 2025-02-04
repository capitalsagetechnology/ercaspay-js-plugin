import Joi from "joi";

export const checkoutSchema = Joi.object({
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
})