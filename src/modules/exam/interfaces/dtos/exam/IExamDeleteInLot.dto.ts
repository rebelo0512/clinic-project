export interface IExamDeleteInLotDto {
  exams: Array<{
    id: number;
  }>;
}

export interface IExamDeleteInLotReturnDto {
  id: number;
  status: boolean;
}
