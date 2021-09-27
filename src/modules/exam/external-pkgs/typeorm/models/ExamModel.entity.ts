/* eslint-disable no-shadow */
import { BaseModel } from 'src/shared/database/BaseModel.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum IExamTypeEnum {
  'ANALISE CLINICA' = 'ANALISE CLINICA',
  'IMAGEM' = 'IMAGEM',
}

@Entity('exams')
export class ExamModel extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  examId: number;

  @Column({ length: 250, unique: true })
  examName: string;

  @Column({ enum: IExamTypeEnum })
  examType: IExamTypeEnum;

  @Column({ default: true })
  examStatus: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  changeFields(): void {
    this.examName = this.examName.toUpperCase();
  }
}
