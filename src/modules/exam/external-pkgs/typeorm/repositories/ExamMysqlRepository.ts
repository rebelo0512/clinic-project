import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExamRepository } from 'src/modules/exam/interfaces/repositories/IExamRepository';
import {
  IExamRepositoryFindById,
  IExamRepositoryCreate,
  IExamRepositoryUpdate,
  IExamRepositoryFindByStatus,
  IExamRepositoryFindByName,
  IExamRepositoryUpdateStatus,
} from 'src/modules/exam/interfaces/repositories/repo-interfaces/IExamRepositoryInterfaces';
import { Repository } from 'typeorm';
import { ExamModel } from '../models/ExamModel.entity';

@Injectable()
export class ExamMysqlRepository implements IExamRepository {
  constructor(
    @InjectRepository(ExamModel) private examRepo: Repository<ExamModel>,
  ) {}

  findById({ id, selectFields }: IExamRepositoryFindById): Promise<ExamModel> {
    return this.examRepo
      .createQueryBuilder('exam')
      .select(selectFields)
      .where(`examId = ${id}`)
      .getRawOne();
  }

  async findByName({
    name,
    selectFields,
  }: IExamRepositoryFindByName): Promise<ExamModel> {
    return this.examRepo
      .createQueryBuilder('exam')
      .select(selectFields)
      .where(`examName = '${name}'`)
      .getRawOne();
  }

  findByStatus({
    status,
    selectFields,
    fieldOrder = 'examName',
    orderBy = 'ASC',
  }: IExamRepositoryFindByStatus): Promise<ExamModel[]> {
    return this.examRepo
      .createQueryBuilder('exam')
      .select(selectFields)
      .where(`examStatus = ${status}`)
      .orderBy(fieldOrder, orderBy)
      .getRawMany();
  }

  async create({ name, type }: IExamRepositoryCreate): Promise<ExamModel> {
    const exam = this.examRepo.create({ examName: name, examType: type });

    await this.examRepo.save(exam);

    return exam;
  }

  async update({ id, name, type }: IExamRepositoryUpdate): Promise<ExamModel> {
    const exam = await this.findById({
      id,
      selectFields: ['*'],
    });

    exam.examName = name || exam.examName;
    exam.examType = type || exam.examType;
    exam.examStatus = !!exam.examStatus;

    await this.examRepo.save(this.examRepo.create(exam));

    return this.findById({
      id,
      selectFields: ['*'],
    });
  }

  async updateStatus({
    id,
    status,
  }: IExamRepositoryUpdateStatus): Promise<ExamModel> {
    await this.examRepo.update({ examId: id }, { examStatus: status });

    return this.findById({ id, selectFields: ['*'] });
  }

  async delete(id: number): Promise<void> {
    await this.examRepo.delete(id);
  }
}
