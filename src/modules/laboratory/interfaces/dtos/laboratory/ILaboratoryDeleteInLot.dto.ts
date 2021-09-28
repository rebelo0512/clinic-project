export interface ILaboratoryDeleteInLotDto {
  laboratories: Array<{
    id: number;
  }>;
}

export interface ILaboratoryDeleteInLotReturnDto {
  id: number;
  status: boolean;
}
