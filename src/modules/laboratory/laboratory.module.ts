import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryModel } from './external-pkgs/typeorm/models/LaboratoryModel.entity';
import { LaboratoryMysqlRepository } from './external-pkgs/typeorm/repositories/LaboratoryMysqlRepository';
import { LaboratoryRepositoryString } from './interfaces/repositories/ILaboratoryRepository';
import { LaboratoryRoute } from './routes/laboratory.route';
import { LaboratoryCreateService } from './services/laboratory/LaboratoryCreate.service';
import { LaboratoryCreateInLotService } from './services/laboratory/LaboratoryCreateInLot.service';
import { LaboratoryDeleteService } from './services/laboratory/LaboratoryDelete.service';
import { LaboratoryDeleteInLotService } from './services/laboratory/LaboratoryDeleteInLot.service';
import { LaboratoryGetAllService } from './services/laboratory/LaboratoryGetAll.service';
import { LaboratoryInactiveService } from './services/laboratory/LaboratoryInactive.service';
import { LaboratoryUpdateService } from './services/laboratory/LaboratoryUpdate.service';
import { LaboratoryUpdateInLotService } from './services/laboratory/LaboratoryUpdateInLot.service';

@Module({
  imports: [TypeOrmModule.forFeature([LaboratoryModel])],
  controllers: [LaboratoryRoute],
  exports: [LaboratoryRepositoryString],
  providers: [
    // Repositories
    {
      provide: LaboratoryRepositoryString,
      useClass: LaboratoryMysqlRepository,
    },
    // Services
    LaboratoryGetAllService,
    LaboratoryCreateService,
    LaboratoryCreateInLotService,
    LaboratoryUpdateInLotService,
    LaboratoryUpdateService,
    LaboratoryInactiveService,
    LaboratoryDeleteService,
    LaboratoryDeleteInLotService,
  ],
})
export class LaboratoryModule {}
