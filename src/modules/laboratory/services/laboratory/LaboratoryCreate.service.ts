import { Inject, Injectable } from '@nestjs/common';
import { LaboratoryModel } from '../../external-pkgs/typeorm/models/LaboratoryModel.entity';
import { ILaboratoryCreateDto } from '../../interfaces/dtos/laboratory/ILaboratoryCreate.dto';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class LaboratoryCreateService {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async execute({
    address,
    name,
  }: ILaboratoryCreateDto): Promise<LaboratoryModel> {
    return this.labRepo.create({ address, name });
  }
}
