import { ExamAssociateLaboratoryModel } from 'src/modules/exam/external-pkgs/typeorm/models/ExamAssociateLaboratoryModel.entity';
import { IRepositoryDefaultFields } from 'src/shared/external-pkgs/typeorm/interfaces/IRepositoryDefaultFields';

export interface IExamAssociateLaboratoryRepositoryFindByExamIdAndLaboratoryId
  extends IRepositoryDefaultFields<ExamAssociateLaboratoryModel> {
  examId: number;
  labId: number;
}

export interface IExamAssociateLaboratoryRepositoryFindByExamId
  extends IRepositoryDefaultFields<ExamAssociateLaboratoryModel> {
  examId: number;
}

export interface IExamAssociateLaboratoryRepositoryFindByLaboratoryId
  extends IRepositoryDefaultFields<ExamAssociateLaboratoryModel> {
  labId: number;
}

export interface IExamAssociateLaboratoryRepositoryCreate {
  examId: number;
  labId: number;
}
