import { IsOptional, IsString } from 'class-validator';

export class UpdateMaterialRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string | null;
}
