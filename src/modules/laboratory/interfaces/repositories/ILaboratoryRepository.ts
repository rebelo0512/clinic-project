import { LaboratoryModel } from '../../external-pkgs/typeorm/models/LaboratoryModel.entity';
import {
  ILaboratoryRepositoryCreate,
  ILaboratoryRepositoryFindById,
  ILaboratoryRepositoryFindByName,
  ILaboratoryRepositoryFindByStatus,
  ILaboratoryRepositoryUpdate,
  ILaboratoryRepositoryUpdateStatus,
} from './repo-interfaces/ILaboratoryRepositoryInterfaces';

export const LaboratoryRepositoryString = 'LaboratoryRepository';

export interface ILaboratoryRepository {
  findById(fields: ILaboratoryRepositoryFindById): Promise<LaboratoryModel>;
  findByName(fields: ILaboratoryRepositoryFindByName): Promise<LaboratoryModel>;
  findByStatus(
    fields: ILaboratoryRepositoryFindByStatus,
  ): Promise<LaboratoryModel[]>;
  create(fields: ILaboratoryRepositoryCreate): Promise<LaboratoryModel>;
  update(fields: ILaboratoryRepositoryUpdate): Promise<LaboratoryModel>;
  updateStatus(
    fields: ILaboratoryRepositoryUpdateStatus,
  ): Promise<LaboratoryModel>;
  delete(id: number): Promise<void>;
}
