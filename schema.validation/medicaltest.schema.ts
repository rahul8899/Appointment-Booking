import joi from "joi";

export const medicalTestSchema = joi.object({
    testName: joi.string().min(3).required(),
    disease: joi.string().min(3).required(),
    amount: joi.number().precision(2).strict().positive().required(),
    testSample: joi.string().min(3).required()

})