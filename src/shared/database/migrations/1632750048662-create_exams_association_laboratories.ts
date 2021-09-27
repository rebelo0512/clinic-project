/* eslint-disable indent */
/* eslint-disable brace-style */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dateDefaultColumns } from '../defaultColumns';

export class createExamsAssociationLaboratories1632750048662
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exams_association_laboratories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'examId',
            type: 'int',
          },
          {
            name: 'labId',
            type: 'int',
          },
          ...dateDefaultColumns,
        ],
        foreignKeys: [
          {
            referencedTableName: 'exams',
            referencedColumnNames: ['examId'],
            columnNames: ['examId'],
            onDelete: 'CASCADE',
          },
          {
            referencedTableName: 'laboratories',
            referencedColumnNames: ['labId'],
            columnNames: ['labId'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exams_association_laboratories');
  }
}
