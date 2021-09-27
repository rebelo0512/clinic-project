import { Inject, Injectable } from '@nestjs/common';
import { HttpError } from 'src/shared/modules/app/errors/HttpError';
import { IExamDisassociateWithLaboratoryDto } from '../../interfaces/dtos/exam/IExamDisassociateWithLaboratory.dto';
import {
  ExamAssociateLaboratoryRepositoryString,
  IExamAssociateLaboratoryRepository,
} from '../../interfaces/repositories/IExamAssociateLaboratoryRepository';

@Injectable()
export class ExamDisassociateWithLaboratoryService {
  constructor(
    @Inject(ExamAssociateLaboratoryRepositoryString)
    private associationRepo: IExamAssociateLaboratoryRepository,
  ) {}

  async execute(
    id: number,
    { labId }: IExamDisassociateWithLaboratoryDto,
  ): Promise<boolean> {
    const checkExamIsAssociateWithLab =
      await this.associationRepo.findByExamIdAndLaboratoryId({
        examId: id,
        labId,
        selectFields: ['id'],
      });

    if (!checkExamIsAssociateWithLab) {
      throw new HttpError('Exame não associado ao laboratório informado', 400);
    }

    await this.associationRepo.delete(checkExamIsAssociateWithLab.id);

    return true;
  }
}
