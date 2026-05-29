import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMachineRequestDto {
  @ApiProperty({ description: 'Nombre de la máquina', required: false, example: 'Torno CNC' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Ubicación de la máquina', required: false, example: 'Taller A' })
  @IsOptional()
  @IsString()
  location?: string | null;
}
