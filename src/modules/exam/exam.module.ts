import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryModule } from '../laboratory/laboratory.module';
import { ExamAssociateLaboratoryModel } from './external-pkgs/typeorm/models/ExamAssociateLaboratoryModel.entity';
import { ExamModel } from './external-pkgs/typeorm/models/ExamModel.entity';
import { ExamAssociateLaboratoryMysqlRepository } from './external-pkgs/typeorm/repositories/ExamAssociateLaboratoryMysqlRepository';
import { ExamMysqlRepository } from './external-pkgs/typeorm/repositories/ExamMysqlRepository';
import { ExamAssociateLaboratoryRepositoryString } from './interfaces/repositories/IExamAssociateLaboratoryRepository';
import { ExamRepositoryString } from './interfaces/repositories/IExamRepository';
import { ExamRoute } from './routes/exam.route';
import { ExamAssociateWithLaboratoryService } from './services/exam/ExamAssociateWithLaboratory.service';
import { ExamCreateService } from './services/exam/ExamCreate.service';
import { ExamDeleteService } from './services/exam/ExamDelete.service';
import { ExamDisassociateWithLaboratoryService } from './services/exam/ExamDisassociateWithLaboratory.service';
import { ExamFindAllLaboratoriesService } from './services/exam/ExamFindAllLaboratories.service';
import { ExamGetAllService } from './services/exam/ExamGetAll.service';
import { ExamInactiveService } from './services/exam/ExamInactive.service';
import { ExamUpdateService } from './services/exam/ExamUpdate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamModel, ExamAssociateLaboratoryModel]),
    LaboratoryModule,
  ],
  controllers: [ExamRoute],
  exports: [],
  providers: [
    // Repositories
    {
      provide: ExamRepositoryString,
      useClass: ExamMysqlRepository,
    },
    {
      provide: ExamAssociateLaboratoryRepositoryString,
      useClass: ExamAssociateLaboratoryMysqlRepository,
    },
    // Services
    ExamGetAllService,
    ExamFindAllLaboratoriesService,
    ExamCreateService,
    ExamUpdateService,
    ExamAssociateWithLaboratoryService,
    ExamDisassociateWithLaboratoryService,
    ExamInactiveService,
    ExamDeleteService,
  ],
})
export class ExamModule {}
