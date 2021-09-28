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
import { ExamCreateInLotService } from './services/exam/ExamCreateInLot.service';
import { ExamDeleteService } from './services/exam/ExamDelete.service';
import { ExamDeleteInLotService } from './services/exam/ExamDeleteInLot.service';
import { ExamDisassociateWithLaboratoryService } from './services/exam/ExamDisassociateWithLaboratory.service';
import { ExamFindAllLaboratoriesService } from './services/exam/ExamFindAllLaboratories.service';
import { ExamGetAllService } from './services/exam/ExamGetAll.service';
import { ExamInactiveService } from './services/exam/ExamInactive.service';
import { ExamUpdateService } from './services/exam/ExamUpdate.service';
import { ExamUpdateInLotService } from './services/exam/ExamUpdateInLot.service';

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
    ExamCreateInLotService,
    ExamUpdateInLotService,
    ExamUpdateService,
    ExamAssociateWithLaboratoryService,
    ExamDisassociateWithLaboratoryService,
    ExamInactiveService,
    ExamDeleteInLotService,
    ExamDeleteService,
  ],
})
export class ExamModule {}
