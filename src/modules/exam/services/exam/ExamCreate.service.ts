import { Inject, Injectable } from '@nestjs/common';
import { ExamModel } from '../../external-pkgs/typeorm/models/ExamModel.entity';
import { IExamCreateDto } from '../../interfaces/dtos/exam/IExamCreate.dto';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamCreateService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async execute(fields: IExamCreateDto): Promise<ExamModel> {
    return this.examRepo.create(fields);
  }
}
