import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string | null;
}