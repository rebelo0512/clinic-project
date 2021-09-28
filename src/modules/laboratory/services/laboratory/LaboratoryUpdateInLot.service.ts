import { Inject, Injectable } from '@nestjs/common';
import {
  ILaboratoryUpdateInLotDto,
  ILaboratoryUpdateInLotReturnDto,
} from '../../interfaces/dtos/laboratory/ILaboratoryUpdateInLot.dto';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class LaboratoryUpdateInLotService {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(
    labs: ILaboratoryUpdateInLotDto,
  ): Promise<ILaboratoryUpdateInLotReturnDto[]> {
    return Promise.all(
      labs.laboratories.map(
        async ({
          address,
          id,
          name,
        }): Promise<ILaboratoryUpdateInLotReturnDto> => {
          try {
            const lab = await this.labRepo.update({ id, address, name });

            return {
              id,
              message: `Laboratório (${lab.labName}) atualizado`,
              status: true,
            };
          } catch (err) {
            return {
              id,
              message: `Erro ao atualizar laboratório (${id})`,
              status: false,
            };
          }
        },
      ),
    );
  }
}
