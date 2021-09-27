import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dateDefaultColumns } from '../defaultColumns';

export class createLaboratories1632510412443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'laboratories',
        columns: [
          {
            name: 'labId',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'labName',
            type: 'varchar',
            length: '250',
            isUnique: true,
          },
          {
            name: 'labAddress',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'labStatus',
            type: 'boolean',
            default: true,
          },
          ...dateDefaultColumns,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('laboratories');
  }
}
