import { IExamTypeEnum } from 'src/modules/exam/external-pkgs/typeorm/models/ExamModel.entity';

export interface IExamUpdateInLotDto {
  exams: Array<{
    id: number;
    name: string;
    type: IExamTypeEnum;
  }>;
}

export interface IExamUpdateInLotReturnDto {
  id: number | null;
  message: string;
  status: boolean;
}
