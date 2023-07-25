import joi from "joi";

export const appointmentSchema = joi.object({
    date: joi.date().min('now').required(),
    slot: joi.string().valid('Morning', 'Afternoon').required(),
    userId: joi.number().required(),
    testId: joi.number().required()

})