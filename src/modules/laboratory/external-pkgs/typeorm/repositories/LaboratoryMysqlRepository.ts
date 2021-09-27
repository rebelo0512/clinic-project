import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILaboratoryRepository } from 'src/modules/laboratory/interfaces/repositories/ILaboratoryRepository';
import {
  ILaboratoryRepositoryCreate,
  ILaboratoryRepositoryFindById,
  ILaboratoryRepositoryFindByName,
  ILaboratoryRepositoryFindByStatus,
  ILaboratoryRepositoryUpdate,
  ILaboratoryRepositoryUpdateStatus,
} from 'src/modules/laboratory/interfaces/repositories/repo-interfaces/ILaboratoryRepositoryInterfaces';
import { Repository } from 'typeorm';
import { LaboratoryModel } from '../models/LaboratoryModel.entity';

@Injectable()
export class LaboratoryMysqlRepository implements ILaboratoryRepository {
  constructor(
    @InjectRepository(LaboratoryModel)
    private labRepo: Repository<LaboratoryModel>,
  ) {}

  async findById({
    id,
    selectFields,
  }: ILaboratoryRepositoryFindById): Promise<LaboratoryModel> {
    return this.labRepo
      .createQueryBuilder('lab')
      .select(selectFields)
      .where(`labId = ${id}`)
      .getRawOne();
  }

  async findByName({
    name,
    selectFields,
  }: ILaboratoryRepositoryFindByName): Promise<LaboratoryModel> {
    return this.labRepo
      .createQueryBuilder('lab')
      .select(selectFields)
      .where(`labName = '${name}'`)
      .getRawOne();
  }

  async findByStatus({
    status,
    selectFields,
    fieldOrder = 'labName',
    orderBy = 'ASC',
  }: ILaboratoryRepositoryFindByStatus): Promise<LaboratoryModel[]> {
    return this.labRepo
      .createQueryBuilder('lab')
      .select(selectFields)
      .where(`labStatus = ${status}`)
      .orderBy(fieldOrder, orderBy)
      .getRawMany();
  }

  async create({
    address,
    name,
  }: ILaboratoryRepositoryCreate): Promise<LaboratoryModel> {
    const lab = this.labRepo.create({ labName: name, labAddress: address });

    await this.labRepo.save(lab);

    return lab;
  }

  async update({
    id,
    name,
    address,
  }: ILaboratoryRepositoryUpdate): Promise<LaboratoryModel> {
    const lab = await this.findById({
      id,
      selectFields: ['*'],
    });

    lab.labName = name || lab.labName;
    lab.labAddress = address || lab.labAddress;
    lab.labStatus = !!lab.labStatus;

    await this.labRepo.save(this.labRepo.create(lab));

    return this.findById({
      id,
      selectFields: ['*'],
    });
  }

  async updateStatus({
    id,
    status,
  }: ILaboratoryRepositoryUpdateStatus): Promise<LaboratoryModel> {
    await this.labRepo.update({ labId: id }, { labStatus: status });

    return this.findById({ id, selectFields: ['*'] });
  }

  async delete(id: number): Promise<void> {
    await this.labRepo.delete(id);
  }
}
