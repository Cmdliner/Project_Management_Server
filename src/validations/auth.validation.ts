import Joi from "joi";

export const UserValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});