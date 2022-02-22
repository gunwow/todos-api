import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsHexColor()
  color?: string;
}
