import { Inject, Injectable } from '@nestjs/common';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from 'src/modules/laboratory/interfaces/repositories/ILaboratoryRepository';
import { HttpError } from 'src/shared/modules/app/errors/HttpError';
import { IExamAssociateWithLaboratoryDto } from '../../interfaces/dtos/exam/IExamAssociateWithLaboratory.dto';
import {
  ExamAssociateLaboratoryRepositoryString,
  IExamAssociateLaboratoryRepository,
} from '../../interfaces/repositories/IExamAssociateLaboratoryRepository';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamAssociateWithLaboratoryService {
  constructor(
    @Inject(ExamAssociateLaboratoryRepositoryString)
    private associationRepo: IExamAssociateLaboratoryRepository,
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(
    id: number,
    { labId }: IExamAssociateWithLaboratoryDto,
  ): Promise<boolean> {
    const exam = await this.examRepo.findById({
      id,
      selectFields: ['examStatus'],
    });

    if (!exam.examStatus) {
      throw new HttpError('Exame inativo', 400);
    }

    const lab = await this.labRepo.findById({
      id: labId,
      selectFields: ['labStatus'],
    });

    if (!lab.labStatus) {
      throw new HttpError('Laboratório inativo', 400);
    }

    const checkExamAlreadyAssociateWithLab =
      await this.associationRepo.findByExamIdAndLaboratoryId({
        examId: id,
        labId,
        selectFields: ['id'],
      });

    if (checkExamAlreadyAssociateWithLab) {
      throw new HttpError('Exame já associado com laboratório', 409);
    }

    await this.associationRepo.create({ examId: id, labId });

    return true;
  }
}
