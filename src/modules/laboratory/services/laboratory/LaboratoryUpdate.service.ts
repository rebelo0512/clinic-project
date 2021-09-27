import { Inject, Injectable } from '@nestjs/common';
import { LaboratoryModel } from '../../external-pkgs/typeorm/models/LaboratoryModel.entity';
import { ILaboratoryUpdateDto } from '../../interfaces/dtos/laboratory/ILaboratoryUpdate.dto';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class LaboratoryUpdateService {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(
    id: number,
    { address, name }: ILaboratoryUpdateDto,
  ): Promise<LaboratoryModel> {
    return this.labRepo.update({ address, id, name });
  }
}
