import * as Joi from 'joi';
import { IExamTypeEnum } from '../../typeorm/models/ExamModel.entity';

const examType = Joi.string()
  .uppercase()
  .valid(...Object.values(IExamTypeEnum));

export const examGetAllSchema = Joi.object({
  status: Joi.boolean().optional(),
});

export const examFindAllLaboratoriesSchema = Joi.object({
  name: Joi.string().required(),
});

export const examCreateSchema = Joi.object({
  name: Joi.string().max(250).required(),
  type: examType.required(),
});

export const examCreateInLotSchema = Joi.object({
  exams: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().max(250).required(),
        type: examType.required(),
      }),
    )
    .required(),
});

export const examUpdateInLotSchema = Joi.object({
  exams: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        name: Joi.string().max(250).optional(),
        type: examType.optional(),
      }),
    )
    .required(),
});

export const examUpdateSchema = {
  path: Joi.object({ id: Joi.number().required() }),
  body: Joi.object({
    name: Joi.string().max(250).optional(),
    type: examType.optional(),
  }),
};

export const examDeleteInLotSchema = Joi.object({
  exams: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
      }),
    )
    .required(),
});
