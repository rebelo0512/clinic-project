import { ApiProperty } from '@nestjs/swagger';

export class IExamAssociateWithLaboratoryDto {
  @ApiProperty()
  labId: number;
}
