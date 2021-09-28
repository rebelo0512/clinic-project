import { IExamCreateDto } from './IExamCreate.dto';

export interface IExamCreateInLotDto {
  exams: IExamCreateDto[];
}

export interface IExamCreateInLotReturnDto {
  id: number | null;
  message: string;
  status: boolean;
}
