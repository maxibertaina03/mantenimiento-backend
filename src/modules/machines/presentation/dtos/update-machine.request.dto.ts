import { IsOptional, IsString } from 'class-validator';

export class UpdateMachineRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string | null;
}
