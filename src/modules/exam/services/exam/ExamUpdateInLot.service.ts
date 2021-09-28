import { Inject, Injectable } from '@nestjs/common';
import {
  IExamUpdateInLotDto,
  IExamUpdateInLotReturnDto,
} from '../../interfaces/dtos/exam/IExamUpdateInLot.dto';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../../interfaces/repositories/IExamRepository';

@Injectable()
export class ExamUpdateInLotService {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async execute(
    exams: IExamUpdateInLotDto,
  ): Promise<IExamUpdateInLotReturnDto[]> {
    return Promise.all(
      exams.exams.map(
        async ({ type, id, name }): Promise<IExamUpdateInLotReturnDto> => {
          try {
            const exam = await this.examRepo.update({ id, type, name });

            return {
              id,
              message: `Exame (${exam.examName}) atualizado`,
              status: true,
            };
          } catch (err) {
            return {
              id,
              message: `Erro ao atualizar exame (${id})`,
              status: false,
            };
          }
        },
      ),
    );
  }
}
