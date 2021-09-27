import { ExamModel } from 'src/modules/exam/external-pkgs/typeorm/models/ExamModel.entity';
import { LaboratoryModel } from 'src/modules/laboratory/external-pkgs/typeorm/models/LaboratoryModel.entity';

export interface IExamFindAllLaboratoryReturnDto
  extends Omit<ExamModel, 'changeFields'> {
  laboratories: LaboratoryModel[];
}
