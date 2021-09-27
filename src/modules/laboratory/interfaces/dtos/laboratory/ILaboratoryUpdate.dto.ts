import { ApiProperty } from '@nestjs/swagger';

export class ILaboratoryUpdateDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  address: string;
}
