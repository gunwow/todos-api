import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryParamsDTO {
  @IsOptional()
  @IsNumber()
  @Transform((property) => +property.value ?? null)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform((property) => +property.value ?? null)
  offset?: number;
}

export enum SortEnum {
  DESC = 'desc',
  ASC = 'asc',
}