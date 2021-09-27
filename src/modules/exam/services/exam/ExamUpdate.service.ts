import { Inject, Injectable } from '@nestjs/common';
import { ExamModel } from '../../external-pkgs/typeorm/models/ExamModel.entity';
import { IExamUpdateDto } from '../../interfaces/dtos/exam/IExamUpdate.dto';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamUpdateService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async execute(
    id: number,
    { name, type }: IExamUpdateDto,
  ): Promise<ExamModel> {
    return this.examRepo.update({ id, name, type });
  }
}
