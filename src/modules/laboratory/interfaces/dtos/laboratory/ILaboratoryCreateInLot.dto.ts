import { ILaboratoryCreateDto } from './ILaboratoryCreate.dto';

export interface ILaboratoryCreateInLotDto {
  laboratories: ILaboratoryCreateDto[];
}

export interface ILaboratoryCreateInLotReturnDto {
  id: number | null;
  message: string;
  status: boolean;
}
