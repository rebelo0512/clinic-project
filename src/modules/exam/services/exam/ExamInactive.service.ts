import { Inject, Injectable } from '@nestjs/common';
import { ExamModel } from '../../external-pkgs/typeorm/models/ExamModel.entity';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamInactiveService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async execute(id: number): Promise<ExamModel> {
    return this.examRepo.updateStatus({ id, status: false });
  }
}
