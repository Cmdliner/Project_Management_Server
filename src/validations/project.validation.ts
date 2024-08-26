import Joi from "joi";

export const projectCreateValidation = Joi.object({
    name: Joi.string().alphanum().strip().required(),
    status: Joi.allow('active', 'on hold', 'completed').required(),
    description: Joi.string().required(),
    userId: Joi.string().required(),
    dueDate: Joi.date().required()
})
