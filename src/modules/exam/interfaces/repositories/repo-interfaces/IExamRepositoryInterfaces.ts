import {
  ExamModel,
  IExamTypeEnum,
} from 'src/modules/exam/external-pkgs/typeorm/models/ExamModel.entity';
import {
  IRepositoryDefaultFields,
  IRepositoryIdField,
} from 'src/shared/external-pkgs/typeorm/interfaces/IRepositoryDefaultFields';

export interface IExamRepositoryFindById
  extends IRepositoryDefaultFields<ExamModel>,
    IRepositoryIdField {}

export interface IExamRepositoryFindByName
  extends IRepositoryDefaultFields<ExamModel> {
  name: string;
}

export interface IExamRepositoryFindByStatus
  extends IRepositoryDefaultFields<ExamModel> {
  status: boolean;
}

export interface IExamRepositoryCreate {
  name: string;
  type: IExamTypeEnum;
}

export interface IExamRepositoryUpdate extends IRepositoryIdField {
  name: string;
  type: IExamTypeEnum;
}

export interface IExamRepositoryUpdateStatus extends IRepositoryIdField {
  status: boolean;
}
