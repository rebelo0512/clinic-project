import * as Joi from 'joi';

export const idDefaultSchema = Joi.object({
  id: Joi.number().required(),
});
