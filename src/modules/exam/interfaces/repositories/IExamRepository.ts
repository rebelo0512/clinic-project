import { ExamModel } from '../../external-pkgs/typeorm/models/ExamModel.entity';
import {
  IExamRepositoryCreate,
  IExamRepositoryFindById,
  IExamRepositoryFindByName,
  IExamRepositoryFindByStatus,
  IExamRepositoryUpdate,
  IExamRepositoryUpdateStatus,
} from './repo-interfaces/IExamRepositoryInterfaces';

export const ExamRepositoryString = 'ExamRepository';

export interface IExamRepository {
  findById(fields: IExamRepositoryFindById): Promise<ExamModel>;
  findByName(fields: IExamRepositoryFindByName): Promise<ExamModel>;
  findByStatus(fields: IExamRepositoryFindByStatus): Promise<ExamModel[]>;
  create(fields: IExamRepositoryCreate): Promise<ExamModel>;
  update(fields: IExamRepositoryUpdate): Promise<ExamModel>;
  updateStatus(fields: IExamRepositoryUpdateStatus): Promise<ExamModel>;
  delete(id: number): Promise<void>;
}
