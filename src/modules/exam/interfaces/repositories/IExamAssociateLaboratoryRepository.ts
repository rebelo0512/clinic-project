import { ExamAssociateLaboratoryModel } from '../../external-pkgs/typeorm/models/ExamAssociateLaboratoryModel.entity';
import {
  IExamAssociateLaboratoryRepositoryCreate,
  IExamAssociateLaboratoryRepositoryFindByExamId,
  IExamAssociateLaboratoryRepositoryFindByExamIdAndLaboratoryId,
  IExamAssociateLaboratoryRepositoryFindByLaboratoryId,
} from './repo-interfaces/IExamAssociateLaboratoryRepositoryInterfaces';

export const ExamAssociateLaboratoryRepositoryString =
  'ExamAssociateLaboratoryRepository';

export interface IExamAssociateLaboratoryRepository {
  findByExamIdAndLaboratoryId(
    fields: IExamAssociateLaboratoryRepositoryFindByExamIdAndLaboratoryId,
  ): Promise<ExamAssociateLaboratoryModel>;
  findByExamId(
    fields: IExamAssociateLaboratoryRepositoryFindByExamId,
  ): Promise<ExamAssociateLaboratoryModel[]>;
  findByLaboratoryId(
    fields: IExamAssociateLaboratoryRepositoryFindByLaboratoryId,
  ): Promise<ExamAssociateLaboratoryModel[]>;
  create(
    fields: IExamAssociateLaboratoryRepositoryCreate,
  ): Promise<ExamAssociateLaboratoryModel>;
  delete(id: number): Promise<void>;
}
