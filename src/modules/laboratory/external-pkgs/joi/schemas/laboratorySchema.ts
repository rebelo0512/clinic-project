import * as Joi from 'joi';

export const laboratoryGetAllSchema = Joi.object({
  status: Joi.boolean().optional(),
});

export const laboratoryCreateSchema = Joi.object({
  name: Joi.string().max(250).required(),
  address: Joi.string().max(250).required(),
});

export const laboratoryCreateInLotSchema = Joi.object({
  laboratories: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
      }),
    )
    .required(),
});

export const laboratoryUpdateInLotSchema = Joi.object({
  laboratories: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      name: Joi.string().optional(),
      address: Joi.string().optional(),
    }).required(),
  ),
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

export const laboratoryDeleteInLotSchema = Joi.object({
  laboratories: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
    }).required(),
  ),
});
