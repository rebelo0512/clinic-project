import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationGuard } from 'src/shared/external-pkgs/joi/guards/JoiValidation.guard';
import { idDefaultSchema } from 'src/shared/external-pkgs/joi/joiDefaultFields';
import {
  laboratoryCreateSchema,
  laboratoryGetAllSchema,
  laboratoryUpdateSchema,
} from '../external-pkgs/joi/schemas/laboratorySchema';
import {
  laboratoryCreateDocument,
  laboratoryDeleteDocument,
  laboratoryGetAllDocument,
  laboratoryInactiveDocument,
  laboratoryUpdateDocument,
} from '../external-pkgs/swagger/laboratoryDocument';
import { LaboratoryModel } from '../external-pkgs/typeorm/models/LaboratoryModel.entity';
import { ValidLaboratoryExistGuard } from '../guards/ValidLaboratoryExist.guard';
import { ValidLaboratoryNameExistGuard } from '../guards/ValidLaboratoryNameExist.guard';
import { ILaboratoryCreateDto } from '../interfaces/dtos/laboratory/ILaboratoryCreate.dto';
import { ILaboratoryUpdateDto } from '../interfaces/dtos/laboratory/ILaboratoryUpdate.dto';
import { LaboratoryCreateService } from '../services/laboratory/LaboratoryCreate.service';
import { LaboratoryDeleteService } from '../services/laboratory/LaboratoryDelete.service';
import { LaboratoryGetAllService } from '../services/laboratory/LaboratoryGetAll.service';
import { LaboratoryInactiveService } from '../services/laboratory/LaboratoryInactive.service';
import { LaboratoryUpdateService } from '../services/laboratory/LaboratoryUpdate.service';

@Controller()
@ApiTags('Laboratory')
export class LaboratoryRoute {
  constructor(
    private laboratoryGetAllService: LaboratoryGetAllService,
    private laboratoryCreateService: LaboratoryCreateService,
    private laboratoryUpdateService: LaboratoryUpdateService,
    private laboratoryInactiveService: LaboratoryInactiveService,
    private laboratoryDeleteService: LaboratoryDeleteService,
  ) {}

  /**
   * ? path: /api/laboratories
   */
  @Get()
  @ApiOperation(laboratoryGetAllDocument.apiOperation)
  @ApiResponse(laboratoryGetAllDocument.api200Response)
  @ApiResponse(laboratoryGetAllDocument.api400Response)
  @UseGuards(new JoiValidationGuard(laboratoryGetAllSchema, 'query'))
  async getAll(@Query('status') status: boolean): Promise<LaboratoryModel[]> {
    return this.laboratoryGetAllService.execute(status);
  }

  /**
   * ? path: /api/laboratories
   */
  @Post()
  @ApiOperation(laboratoryCreateDocument.apiOperation)
  @ApiResponse(laboratoryCreateDocument.api201Response)
  @ApiResponse(laboratoryCreateDocument.api400Response)
  @ApiResponse(laboratoryCreateDocument.api409Response)
  @UseGuards(
    new JoiValidationGuard(laboratoryCreateSchema, 'body'),
    ValidLaboratoryNameExistGuard,
  )
  async create(@Body() data: ILaboratoryCreateDto): Promise<LaboratoryModel> {
    return this.laboratoryCreateService.execute(data);
  }

  /**
   * ? path: /api/laboratories/:id
   */
  @Put('/:id')
  @ApiOperation(laboratoryUpdateDocument.apiOperation)
  @ApiResponse(laboratoryUpdateDocument.api200Response)
  @ApiResponse(laboratoryUpdateDocument.api400Response)
  @ApiResponse(laboratoryUpdateDocument.api404Response)
  @ApiResponse(laboratoryUpdateDocument.api409Response)
  @UseGuards(
    new JoiValidationGuard(laboratoryUpdateSchema.path, 'params'),
    new JoiValidationGuard(laboratoryUpdateSchema.body, 'body'),
    ValidLaboratoryExistGuard,
    ValidLaboratoryNameExistGuard,
  )
  async update(
    @Param('id') id: number,
    @Body() data: ILaboratoryUpdateDto,
  ): Promise<LaboratoryModel> {
    return this.laboratoryUpdateService.execute(id, data);
  }

  /**
   * ? path: /api/laboratories/:id/inactivate
   */
  @Patch('/:id/inactivate')
  @ApiOperation(laboratoryInactiveDocument.apiOperation)
  @ApiResponse(laboratoryInactiveDocument.api200Response)
  @ApiResponse(laboratoryInactiveDocument.api400Response)
  @ApiResponse(laboratoryInactiveDocument.api404Response)
  @UseGuards(
    new JoiValidationGuard(idDefaultSchema, 'params'),
    ValidLaboratoryExistGuard,
  )
  inactive(@Param('id') id: number): Promise<LaboratoryModel> {
    return this.laboratoryInactiveService.execute(id);
  }

  /**
   * ? path: /api/laboratories/:id
   */
  @Delete('/:id')
  @ApiOperation(laboratoryDeleteDocument.apiOperation)
  @ApiResponse(laboratoryDeleteDocument.api200Response)
  @ApiResponse(laboratoryDeleteDocument.api400Response)
  @ApiResponse(laboratoryDeleteDocument.api404Response)
  @UseGuards(
    new JoiValidationGuard(idDefaultSchema, 'params'),
    ValidLaboratoryExistGuard,
  )
  delete(@Param('id') id: number): Promise<LaboratoryModel> {
    return this.laboratoryDeleteService.execute(id);
  }
}
