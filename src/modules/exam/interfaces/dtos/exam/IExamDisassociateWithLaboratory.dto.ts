import { ApiProperty } from '@nestjs/swagger';

export class IExamDisassociateWithLaboratoryDto {
  @ApiProperty()
  labId: number;
}
