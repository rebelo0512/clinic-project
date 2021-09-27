import { LaboratoryModel } from 'src/modules/laboratory/external-pkgs/typeorm/models/LaboratoryModel.entity';
import {
  IRepositoryDefaultFields,
  IRepositoryIdField,
} from 'src/shared/external-pkgs/typeorm/interfaces/IRepositoryDefaultFields';

export interface ILaboratoryRepositoryFindById
  extends IRepositoryDefaultFields<LaboratoryModel>,
    IRepositoryIdField {}

export interface ILaboratoryRepositoryFindByName
  extends IRepositoryDefaultFields<LaboratoryModel> {
  name: string;
}

export interface ILaboratoryRepositoryFindByStatus
  extends IRepositoryDefaultFields<LaboratoryModel> {
  status: boolean;
}

export interface ILaboratoryRepositoryCreate {
  name: string;
  address: string;
}

export interface ILaboratoryRepositoryUpdate extends IRepositoryIdField {
  name: string;
  address: string;
}

export interface ILaboratoryRepositoryUpdateStatus extends IRepositoryIdField {
  status: boolean;
}
