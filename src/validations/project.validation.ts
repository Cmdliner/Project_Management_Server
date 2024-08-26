import Joi from "joi";

export const projectCreateValidation = Joi.object({
    name: Joi.string().strip().required(),
    status: Joi.valid('active', 'on hold', 'completed').required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required()
})
