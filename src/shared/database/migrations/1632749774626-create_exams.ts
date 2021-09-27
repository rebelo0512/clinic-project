import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dateDefaultColumns } from '../defaultColumns';

export class createExams1632749774626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exams',
        columns: [
          {
            name: 'examId',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'examName',
            type: 'varchar',
            length: '250',
            isUnique: true,
          },
          {
            name: 'examType',
            type: 'enum',
            enum: ['ANALISE CLINICA', 'IMAGEM'],
          },
          {
            name: 'examStatus',
            type: 'boolean',
            default: true,
          },
          ...dateDefaultColumns,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exams');
  }
}
