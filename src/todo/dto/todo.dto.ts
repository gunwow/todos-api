import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TodoDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string | null;

  @IsOptional()
  @IsDateString()
  completedAt?: Date | null;

  @IsOptional()
  @IsDateString()
  scheduledAt?: Date | null;
}
