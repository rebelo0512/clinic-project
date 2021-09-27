import { Inject, Injectable } from '@nestjs/common';
import { ExamModel } from '../../external-pkgs/typeorm/models/ExamModel.entity';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamGetAllService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async execute(status: boolean): Promise<ExamModel[]> {
    return this.examRepo.findByStatus({
      status: !status ? true : status,
      selectFields: ['*'],
    });
  }
}
