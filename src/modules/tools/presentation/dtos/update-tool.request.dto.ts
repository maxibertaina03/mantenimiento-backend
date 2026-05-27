import { IsOptional, IsString } from 'class-validator';

export class UpdateToolRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string | null;
}
