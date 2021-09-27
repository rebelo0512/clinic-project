import { Inject, Injectable } from '@nestjs/common';
import { LaboratoryModel } from '../../external-pkgs/typeorm/models/LaboratoryModel.entity';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class LaboratoryDeleteService {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(id: number): Promise<LaboratoryModel> {
    const lab = await this.labRepo.findById({ id, selectFields: ['*'] });

    await this.labRepo.delete(id);

    return lab;
  }
}
