import joi from "joi";

export const usersSchema = joi.object({
    firstName: joi.string().min(3),
    lastName: joi.string().min(3),
    email: joi.string().email(),
    password: joi.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{8,20}/).min(8).max(20)
})