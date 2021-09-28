import { Inject, Injectable } from '@nestjs/common';
import {
  ILaboratoryDeleteInLotDto,
  ILaboratoryDeleteInLotReturnDto,
} from '../../interfaces/dtos/laboratory/ILaboratoryDeleteInLot.dto';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class LaboratoryDeleteInLotService {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(
    labs: ILaboratoryDeleteInLotDto,
  ): Promise<ILaboratoryDeleteInLotReturnDto[]> {
    return Promise.all(
      labs.laboratories.map(
        async (lab): Promise<ILaboratoryDeleteInLotReturnDto> => {
          try {
            await this.labRepo.delete(lab.id);

            return {
              id: lab.id,
              status: true,
            };
          } catch (err) {
            return {
              id: lab.id,
              status: false,
            };
          }
        },
      ),
    );
  }
}
