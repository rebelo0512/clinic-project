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
  laboratoryCreateInLotSchema,
  laboratoryCreateSchema,
  laboratoryDeleteInLotSchema,
  laboratoryGetAllSchema,
  laboratoryUpdateInLotSchema,
  laboratoryUpdateSchema,
} from '../external-pkgs/joi/schemas/laboratorySchema';
import {
  laboratoryCreateDocument,
  laboratoryCreateInLotDocument,
  laboratoryDeleteDocument,
  laboratoryDeleteInLotDocument,
  laboratoryGetAllDocument,
  laboratoryInactiveDocument,
  laboratoryUpdateDocument,
  laboratoryUpdateInLotDocument,
} from '../external-pkgs/swagger/laboratoryDocument';
import { LaboratoryModel } from '../external-pkgs/typeorm/models/LaboratoryModel.entity';
import { ValidLaboratoryExistGuard } from '../guards/ValidLaboratoryExist.guard';
import { ValidLaboratoryNameExistGuard } from '../guards/ValidLaboratoryNameExist.guard';
import { ILaboratoryCreateDto } from '../interfaces/dtos/laboratory/ILaboratoryCreate.dto';
import {
  ILaboratoryCreateInLotDto,
  ILaboratoryCreateInLotReturnDto,
} from '../interfaces/dtos/laboratory/ILaboratoryCreateInLot.dto';
import {
  ILaboratoryDeleteInLotDto,
  ILaboratoryDeleteInLotReturnDto,
} from '../interfaces/dtos/laboratory/ILaboratoryDeleteInLot.dto';
import { ILaboratoryUpdateDto } from '../interfaces/dtos/laboratory/ILaboratoryUpdate.dto';
import {
  ILaboratoryUpdateInLotDto,
  ILaboratoryUpdateInLotReturnDto,
} from '../interfaces/dtos/laboratory/ILaboratoryUpdateInLot.dto';
import { LaboratoryCreateService } from '../services/laboratory/LaboratoryCreate.service';
import { LaboratoryCreateInLotService } from '../services/laboratory/LaboratoryCreateInLot.service';
import { LaboratoryDeleteService } from '../services/laboratory/LaboratoryDelete.service';
import { LaboratoryDeleteInLotService } from '../services/laboratory/LaboratoryDeleteInLot.service';
import { LaboratoryGetAllService } from '../services/laboratory/LaboratoryGetAll.service';
import { LaboratoryInactiveService } from '../services/laboratory/LaboratoryInactive.service';
import { LaboratoryUpdateService } from '../services/laboratory/LaboratoryUpdate.service';
import { LaboratoryUpdateInLotService } from '../services/laboratory/LaboratoryUpdateInLot.service';

@Controller()
@ApiTags('Laboratory')
export class LaboratoryRoute {
  constructor(
    private laboratoryGetAllService: LaboratoryGetAllService,
    private laboratoryCreateService: LaboratoryCreateService,
    private laboratoryCreateInLotService: LaboratoryCreateInLotService,
    private laboratoryUpdateInLotService: LaboratoryUpdateInLotService,
    private laboratoryUpdateService: LaboratoryUpdateService,
    private laboratoryInactiveService: LaboratoryInactiveService,
    private laboratoryDeleteInLotService: LaboratoryDeleteInLotService,
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
  async create(@Body() fields: ILaboratoryCreateDto): Promise<LaboratoryModel> {
    return this.laboratoryCreateService.execute(fields);
  }

  /**
   * ? path: /api/laboratories/lot
   */
  @Post('/lot')
  @UseGuards(new JoiValidationGuard(laboratoryCreateInLotSchema, 'body'))
  @ApiOperation(laboratoryCreateInLotDocument.apiOperation)
  @ApiResponse(laboratoryCreateInLotDocument.api201Response)
  @ApiResponse(laboratoryCreateInLotDocument.api400Response)
  async createInLot(
    @Body() fields: ILaboratoryCreateInLotDto,
  ): Promise<ILaboratoryCreateInLotReturnDto[]> {
    return this.laboratoryCreateInLotService.execute(fields);
  }

  /**
   * ? path: /api/laboratories/lot
   */
  @Put('/lot')
  @UseGuards(new JoiValidationGuard(laboratoryUpdateInLotSchema, 'body'))
  @ApiOperation(laboratoryUpdateInLotDocument.apiOperation)
  @ApiResponse(laboratoryUpdateInLotDocument.api200Response)
  @ApiResponse(laboratoryUpdateInLotDocument.api400Response)
  async updateInLot(
    @Body() fields: ILaboratoryUpdateInLotDto,
  ): Promise<ILaboratoryUpdateInLotReturnDto[]> {
    return this.laboratoryUpdateInLotService.execute(fields);
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
    @Body() fields: ILaboratoryUpdateDto,
  ): Promise<LaboratoryModel> {
    return this.laboratoryUpdateService.execute(id, fields);
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
   * ? path: /api/laboratories/lot
   */
  @Delete('/lot')
  @UseGuards(new JoiValidationGuard(laboratoryDeleteInLotSchema, 'body'))
  @ApiOperation(laboratoryDeleteInLotDocument.apiOperation)
  @ApiResponse(laboratoryDeleteInLotDocument.api200Response)
  @ApiResponse(laboratoryDeleteInLotDocument.api400Response)
  deleteInLot(
    @Body() fields: ILaboratoryDeleteInLotDto,
  ): Promise<ILaboratoryDeleteInLotReturnDto[]> {
    return this.laboratoryDeleteInLotService.execute(fields);
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
