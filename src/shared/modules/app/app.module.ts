import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ExamModule } from 'src/modules/exam/exam.module';
import { LaboratoryModule } from 'src/modules/laboratory/laboratory.module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    LaboratoryModule,
    ExamModule,
    RouterModule.register([
      {
        path: '/api',
        children: [
          {
            path: '/laboratories',
            module: LaboratoryModule,
          },
          {
            path: '/exams',
            module: ExamModule,
          },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
