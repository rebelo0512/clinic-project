import { Inject, Injectable } from '@nestjs/common';
import { ExamModel } from '../../external-pkgs/typeorm/models/ExamModel.entity';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamDeleteService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async execute(id: number): Promise<ExamModel> {
    const exam = await this.examRepo.findById({ id, selectFields: ['*'] });

    await this.examRepo.delete(id);

    return exam;
  }
}
