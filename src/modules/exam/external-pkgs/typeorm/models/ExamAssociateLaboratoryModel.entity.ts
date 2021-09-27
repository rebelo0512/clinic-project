import { BaseModel } from 'src/shared/database/BaseModel.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exams_association_laboratories')
export class ExamAssociateLaboratoryModel extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  examId: number;

  @Column()
  labId: number;
}
