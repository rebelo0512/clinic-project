import { Inject, Injectable } from '@nestjs/common';
import { LaboratoryModel } from '../../external-pkgs/typeorm/models/LaboratoryModel.entity';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class LaboratoryGetAllService {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(status: boolean): Promise<LaboratoryModel[]> {
    return this.labRepo.findByStatus({
      status: !status ? true : status,
      selectFields: ['*'],
    });
  }
}
