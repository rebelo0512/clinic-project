import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExamAssociateLaboratoryRepository } from 'src/modules/exam/interfaces/repositories/IExamAssociateLaboratoryRepository';
import {
  IExamAssociateLaboratoryRepositoryFindByExamId,
  IExamAssociateLaboratoryRepositoryFindByLaboratoryId,
  IExamAssociateLaboratoryRepositoryCreate,
  IExamAssociateLaboratoryRepositoryFindByExamIdAndLaboratoryId,
} from 'src/modules/exam/interfaces/repositories/repo-interfaces/IExamAssociateLaboratoryRepositoryInterfaces';
import { Repository } from 'typeorm';
import { ExamAssociateLaboratoryModel } from '../models/ExamAssociateLaboratoryModel.entity';

@Injectable()
export class ExamAssociateLaboratoryMysqlRepository
  implements IExamAssociateLaboratoryRepository
{
  constructor(
    @InjectRepository(ExamAssociateLaboratoryModel)
    private associationRepo: Repository<ExamAssociateLaboratoryModel>,
  ) {}

  async findByExamIdAndLaboratoryId({
    examId,
    labId,
    selectFields,
  }: // eslint-disable-next-line max-len
  IExamAssociateLaboratoryRepositoryFindByExamIdAndLaboratoryId): Promise<ExamAssociateLaboratoryModel> {
    return this.associationRepo
      .createQueryBuilder('ass')
      .select(selectFields)
      .where(`examId = ${examId} AND labId = ${labId}`)
      .getRawOne();
  }

  findByExamId({
    examId,
    selectFields,
    fieldOrder = 'id',
    orderBy = 'ASC',
  }: IExamAssociateLaboratoryRepositoryFindByExamId): Promise<
    ExamAssociateLaboratoryModel[]
  > {
    return this.associationRepo
      .createQueryBuilder('ass')
      .select(selectFields)
      .where(`examId = ${examId}`)
      .orderBy(fieldOrder, orderBy)
      .getRawMany();
  }

  findByLaboratoryId({
    labId,
    selectFields,
    fieldOrder = 'id',
    orderBy = 'ASC',
  }: IExamAssociateLaboratoryRepositoryFindByLaboratoryId): Promise<
    ExamAssociateLaboratoryModel[]
  > {
    return this.associationRepo
      .createQueryBuilder('ass')
      .select(selectFields)
      .where(`labId = ${labId}`)
      .orderBy(fieldOrder, orderBy)
      .getRawMany();
  }

  async create({
    examId,
    labId,
  }: IExamAssociateLaboratoryRepositoryCreate): Promise<ExamAssociateLaboratoryModel> {
    const association = this.associationRepo.create({ examId, labId });

    await this.associationRepo.save(association);

    return association;
  }

  async delete(id: number): Promise<void> {
    await this.associationRepo.delete(id);
  }
}
