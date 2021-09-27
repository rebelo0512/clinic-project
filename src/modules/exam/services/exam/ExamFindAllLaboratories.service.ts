import { Inject, Injectable } from '@nestjs/common';
import { LaboratoryModel } from 'src/modules/laboratory/external-pkgs/typeorm/models/LaboratoryModel.entity';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from 'src/modules/laboratory/interfaces/repositories/ILaboratoryRepository';
import { HttpError } from 'src/shared/modules/app/errors/HttpError';
import { IExamFindAllLaboratoryReturnDto } from '../../interfaces/dtos/exam/IExamFindAllLaboratory.dto';
import {
  ExamAssociateLaboratoryRepositoryString,
  IExamAssociateLaboratoryRepository,
} from '../../interfaces/repositories/IExamAssociateLaboratoryRepository';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamFindAllLaboratoriesService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
    @Inject(ExamAssociateLaboratoryRepositoryString)
    private associationRepo: IExamAssociateLaboratoryRepository,
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(name: string): Promise<IExamFindAllLaboratoryReturnDto> {
    const exam = await this.examRepo.findByName({ name, selectFields: ['*'] });

    if (!exam) {
      throw new HttpError('Exame não encontrado', 404);
    }

    const labIds = await this.associationRepo.findByExamId({
      examId: exam.examId,
      selectFields: ['labId'],
    });

    const laboratories: LaboratoryModel[] = await Promise.all(
      labIds.map(({ labId }) =>
        this.labRepo.findById({ id: labId, selectFields: ['*'] }),
      ),
    );

    return { ...exam, laboratories };
  }
}
