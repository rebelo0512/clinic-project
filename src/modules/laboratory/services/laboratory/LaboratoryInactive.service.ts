import { Inject, Injectable } from '@nestjs/common';
import { LaboratoryModel } from '../../external-pkgs/typeorm/models/LaboratoryModel.entity';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class LaboratoryInactiveService {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute(id: number): Promise<LaboratoryModel> {
    return this.labRepo.updateStatus({ id, status: false });
  }
}
