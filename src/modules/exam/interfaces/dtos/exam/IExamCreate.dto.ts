import { ApiProperty } from '@nestjs/swagger';
import { IExamTypeEnum } from 'src/modules/exam/external-pkgs/typeorm/models/ExamModel.entity';

export class IExamCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'string', example: 'IMAGEM ou ANALISE CLINICA' })
  type: IExamTypeEnum;
}
