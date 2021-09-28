import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationGuard } from 'src/shared/external-pkgs/joi/guards/JoiValidation.guard';
import { idDefaultSchema } from 'src/shared/external-pkgs/joi/joiDefaultFields';
import {
  examCreateInLotSchema,
  examCreateSchema,
  examDeleteInLotSchema,
  examFindAllLaboratoriesSchema,
  examGetAllSchema,
  examUpdateInLotSchema,
  examUpdateSchema,
} from '../external-pkgs/joi/schemas/examSchema';
import {
  examAssociateWithLaboratoryDocument,
  examCreateDocument,
  examCreateInLotDocument,
  examDeleteDocument,
  examDeleteInLotDocument,
  examDisassociateWithLaboratoryDocument,
  examFindAllLaboratoriesDocument,
  examGetAllDocument,
  examInactiveDocument,
  examUpdateDocument,
  examUpdateInLotDocument,
} from '../external-pkgs/swagger/examDocument';
import { ExamModel } from '../external-pkgs/typeorm/models/ExamModel.entity';
import { ValidExamExistGuard } from '../guards/ValidExamExist.guard';
import { ValidExamNameExistGuard } from '../guards/ValidExamNameExist.guard';
import { ValidLaboratoryExistByIdGuard } from '../guards/ValidLaboratoryExistById.guard';
import { IExamAssociateWithLaboratoryDto } from '../interfaces/dtos/exam/IExamAssociateWithLaboratory.dto';
import { IExamCreateDto } from '../interfaces/dtos/exam/IExamCreate.dto';
import {
  IExamCreateInLotDto,
  IExamCreateInLotReturnDto,
} from '../interfaces/dtos/exam/IExamCreateInLot.dto';
import {
  IExamDeleteInLotDto,
  IExamDeleteInLotReturnDto,
} from '../interfaces/dtos/exam/IExamDeleteInLot.dto';
import { IExamFindAllLaboratoryReturnDto } from '../interfaces/dtos/exam/IExamFindAllLaboratory.dto';
import { IExamUpdateDto } from '../interfaces/dtos/exam/IExamUpdate.dto';
import {
  IExamUpdateInLotDto,
  IExamUpdateInLotReturnDto,
} from '../interfaces/dtos/exam/IExamUpdateInLot.dto';
import { ExamAssociateWithLaboratoryService } from '../services/exam/ExamAssociateWithLaboratory.service';
import { ExamCreateService } from '../services/exam/ExamCreate.service';
import { ExamCreateInLotService } from '../services/exam/ExamCreateInLot.service';
import { ExamDeleteService } from '../services/exam/ExamDelete.service';
import { ExamDeleteInLotService } from '../services/exam/ExamDeleteInLot.service';
import { ExamDisassociateWithLaboratoryService } from '../services/exam/ExamDisassociateWithLaboratory.service';
import { ExamFindAllLaboratoriesService } from '../services/exam/ExamFindAllLaboratories.service';
import { ExamGetAllService } from '../services/exam/ExamGetAll.service';
import { ExamInactiveService } from '../services/exam/ExamInactive.service';
import { ExamUpdateService } from '../services/exam/ExamUpdate.service';
import { ExamUpdateInLotService } from '../services/exam/ExamUpdateInLot.service';

@Controller()
@ApiTags('Exam')
export class ExamRoute {
  constructor(
    private examGetAllService: ExamGetAllService,
    private examFindAllLaboratoriesService: ExamFindAllLaboratoriesService,
    private examCreateService: ExamCreateService,
    private examCreateInLotService: ExamCreateInLotService,
    private examUpdateInLotService: ExamUpdateInLotService,
    private examUpdateService: ExamUpdateService,
    private examAssociateWithLaboratoryService: ExamAssociateWithLaboratoryService,
    private examDisassociateWithLaboratoryService: ExamDisassociateWithLaboratoryService,
    private examInactiveService: ExamInactiveService,
    private examDeleteInLotService: ExamDeleteInLotService,
    private examDeleteService: ExamDeleteService,
  ) {}

  /**
   * ? path: /api/exams
   */
  @Get()
  @ApiOperation(examGetAllDocument.apiOperation)
  @ApiResponse(examGetAllDocument.api200Response)
  @ApiResponse(examGetAllDocument.api400Response)
  @UseGuards(new JoiValidationGuard(examGetAllSchema, 'query'))
  getAll(@Query('status') status: boolean): Promise<ExamModel[]> {
    return this.examGetAllService.execute(status);
  }

  /**
   * ? path: /api/exams/laboratory
   */
  @Get('/laboratories')
  @ApiOperation(examFindAllLaboratoriesDocument.apiOperation)
  @ApiResponse(examFindAllLaboratoriesDocument.api200Response)
  @ApiResponse(examFindAllLaboratoriesDocument.api400Response)
  @ApiResponse(examFindAllLaboratoriesDocument.api404Response)
  @UseGuards(new JoiValidationGuard(examFindAllLaboratoriesSchema, 'query'))
  findAllLaboratories(
    @Query('name') name: string,
  ): Promise<IExamFindAllLaboratoryReturnDto> {
    return this.examFindAllLaboratoriesService.execute(name);
  }

  /**
   * ? path: /api/exams
   */
  @Post()
  @ApiOperation(examCreateDocument.apiOperation)
  @ApiResponse(examCreateDocument.api201Response)
  @ApiResponse(examCreateDocument.api400Response)
  @UseGuards(
    new JoiValidationGuard(examCreateSchema, 'body'),
    ValidExamNameExistGuard,
  )
  create(@Body() fields: IExamCreateDto): Promise<ExamModel> {
    return this.examCreateService.execute(fields);
  }

  /**
   * ? path: /api/exams/lot
   */
  @Post('/lot')
  @ApiOperation(examCreateInLotDocument.apiOperation)
  @ApiResponse(examCreateInLotDocument.api201Response)
  @ApiResponse(examCreateInLotDocument.api400Response)
  @UseGuards(new JoiValidationGuard(examCreateInLotSchema, 'body'))
  createInLot(
    @Body() fields: IExamCreateInLotDto,
  ): Promise<IExamCreateInLotReturnDto[]> {
    return this.examCreateInLotService.execute(fields);
  }

  /**
   * ? path: /api/exams/lot
   */
  @Put('/lot')
  @ApiOperation(examUpdateInLotDocument.apiOperation)
  @ApiResponse(examUpdateInLotDocument.api200Response)
  @ApiResponse(examUpdateInLotDocument.api400Response)
  @UseGuards(new JoiValidationGuard(examUpdateInLotSchema, 'body'))
  updateInLot(
    @Body() fields: IExamUpdateInLotDto,
  ): Promise<IExamUpdateInLotReturnDto[]> {
    return this.examUpdateInLotService.execute(fields);
  }

  /**
   * ? path: /api/exams/:id
   */
  @Put('/:id')
  @ApiOperation(examUpdateDocument.apiOperation)
  @ApiResponse(examUpdateDocument.api200Response)
  @ApiResponse(examUpdateDocument.api400Response)
  @ApiResponse(examUpdateDocument.api404Response)
  @UseGuards(
    new JoiValidationGuard(examUpdateSchema.path, 'params'),
    new JoiValidationGuard(examUpdateSchema.body, 'body'),
    ValidExamExistGuard,
  )
  update(
    @Param('id') id: number,
    @Body() fields: IExamUpdateDto,
  ): Promise<ExamModel> {
    return this.examUpdateService.execute(id, fields);
  }

  /**
   * ? path: /api/exams/:id/laboratory/associate
   */
  @Patch('/:id/laboratories/associate')
  @ApiOperation(examAssociateWithLaboratoryDocument.apiOperation)
  @ApiResponse(examAssociateWithLaboratoryDocument.api200Response)
  @ApiResponse(examAssociateWithLaboratoryDocument.api400Response)
  @ApiResponse(examAssociateWithLaboratoryDocument.api404Response)
  @UseGuards(ValidExamExistGuard, ValidLaboratoryExistByIdGuard)
  async associateWithLaboratory(
    @Param('id') id: number,
    @Body() fields: IExamAssociateWithLaboratoryDto,
  ): Promise<{ message: string; success: boolean }> {
    const status = await this.examAssociateWithLaboratoryService.execute(
      id,
      fields,
    );

    return {
      success: status,
      message: 'Exame associado com sucesso ao laboratório',
    };
  }

  /**
   * ? path: /api/exams/:id/laboratory/disassociate
   */
  @Patch('/:id/laboratories/disassociate')
  @ApiOperation(examDisassociateWithLaboratoryDocument.apiOperation)
  @ApiResponse(examDisassociateWithLaboratoryDocument.api200Response)
  @ApiResponse(examDisassociateWithLaboratoryDocument.api400Response)
  @ApiResponse(examDisassociateWithLaboratoryDocument.api404Response)
  @UseGuards(ValidExamExistGuard, ValidLaboratoryExistByIdGuard)
  async disassociateWithLaboratory(
    @Param('id') id: number,
    @Body() fields: IExamAssociateWithLaboratoryDto,
  ): Promise<{ message: string; success: boolean }> {
    const status = await this.examDisassociateWithLaboratoryService.execute(
      id,
      fields,
    );

    return {
      success: status,
      message: 'Exame desassociado com sucesso ao laboratório',
    };
  }

  /**
   * ? path: /api/exams/:id/inactivate
   */
  @Patch('/:id/inactivate')
  @ApiOperation(examInactiveDocument.apiOperation)
  @ApiResponse(examInactiveDocument.api200Response)
  @ApiResponse(examInactiveDocument.api400Response)
  @ApiResponse(examInactiveDocument.api404Response)
  @UseGuards(
    new JoiValidationGuard(idDefaultSchema, 'params'),
    ValidExamExistGuard,
  )
  async inactive(@Param('id') id: number): Promise<ExamModel> {
    return this.examInactiveService.execute(id);
  }

  /**
   * ? path: /api/exams/lot
   */
  @Delete('/lot')
  @ApiOperation(examDeleteInLotDocument.apiOperation)
  @ApiResponse(examDeleteInLotDocument.api200Response)
  @ApiResponse(examDeleteInLotDocument.api400Response)
  @UseGuards(new JoiValidationGuard(examDeleteInLotSchema, 'body'))
  deleteInLot(
    @Body() fields: IExamDeleteInLotDto,
  ): Promise<IExamDeleteInLotReturnDto[]> {
    return this.examDeleteInLotService.execute(fields);
  }

  /**
   * ? path: /api/exams/:id
   */
  @Delete('/:id')
  @ApiOperation(examDeleteDocument.apiOperation)
  @ApiResponse(examDeleteDocument.api200Response)
  @ApiResponse(examDeleteDocument.api400Response)
  @ApiResponse(examDeleteDocument.api404Response)
  @UseGuards(
    new JoiValidationGuard(idDefaultSchema, 'params'),
    ValidExamExistGuard,
  )
  delete(@Param('id') id: number): Promise<ExamModel> {
    return this.examDeleteService.execute(id);
  }
}
