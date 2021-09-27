import { ApiProperty } from '@nestjs/swagger';

export class ILaboratoryCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
