import { Inject, Injectable } from '@nestjs/common';
import {
  IExamDeleteInLotDto,
  IExamDeleteInLotReturnDto,
} from '../../interfaces/dtos/exam/IExamDeleteInLot.dto';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamDeleteInLotService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async execute(
    exams: IExamDeleteInLotDto,
  ): Promise<IExamDeleteInLotReturnDto[]> {
    return Promise.all(
      exams.exams.map(async (exam): Promise<IExamDeleteInLotReturnDto> => {
        try {
          await this.examRepo.delete(exam.id);

          return {
            id: exam.id,
            status: true,
          };
        } catch (err) {
          return {
            id: null,
            status: false,
          };
        }
      }),
    );
  }
}
