import { Inject, Injectable } from '@nestjs/common';
import {
  IExamCreateInLotDto,
  IExamCreateInLotReturnDto,
} from '../../interfaces/dtos/exam/IExamCreateInLot.dto';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamCreateInLotService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async execute(
    exams: IExamCreateInLotDto,
  ): Promise<IExamCreateInLotReturnDto[]> {
    return Promise.all(
      exams.exams.map(async (exam): Promise<IExamCreateInLotReturnDto> => {
        try {
          const examCreated = await this.examRepo.create(exam);

          return {
            id: examCreated.examId,
            message: `Exame (${exam.name}) cadastrado`,
            status: true,
          };
        } catch (err) {
          return {
            id: null,
            message: `Erro ao cadastrar exame (${exam.name})`,
            status: false,
          };
        }
      }),
    );
  }
}
