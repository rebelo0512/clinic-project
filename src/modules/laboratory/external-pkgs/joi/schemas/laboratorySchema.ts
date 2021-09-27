import * as Joi from 'joi';

export const laboratoryGetAllSchema = Joi.object({
  status: Joi.boolean().optional(),
});

export const laboratoryCreateSchema = Joi.object({
  name: Joi.string().max(250).required(),
  address: Joi.string().max(250).required(),
});

export const laboratoryUpdateSchema = {
  path: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    name: Joi.string().max(250).optional(),
    address: Joi.string().max(250).optional(),
  }),
};
