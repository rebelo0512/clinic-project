import { Inject, Injectable } from '@nestjs/common';
import {
  ILaboratoryCreateInLotDto,
  ILaboratoryCreateInLotReturnDto,
} from '../../interfaces/dtos/laboratory/ILaboratoryCreateInLot.dto';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class LaboratoryCreateInLotService {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(
    labs: ILaboratoryCreateInLotDto,
  ): Promise<ILaboratoryCreateInLotReturnDto[]> {
    return Promise.all(
      labs.laboratories.map(
        async (lab): Promise<ILaboratoryCreateInLotReturnDto> => {
          try {
            const labCreated = await this.labRepo.create(lab);

            return {
              id: labCreated.labId,
              message: `Laboratório (${lab.name}) cadastrado`,
              status: true,
            };
          } catch (err) {
            return {
              id: null,
              message: `Erro ao cadastrar laboratório (${lab.name})`,
              status: false,
            };
          }
        },
      ),
    );
  }
}
