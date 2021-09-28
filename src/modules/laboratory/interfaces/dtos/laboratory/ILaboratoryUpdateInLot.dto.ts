export interface ILaboratoryUpdateInLotDto {
  laboratories: Array<{
    id: number;
    name: string;
    address: string;
  }>;
}

export interface ILaboratoryUpdateInLotReturnDto {
  id: number | null;
  message: string;
  status: boolean;
}
