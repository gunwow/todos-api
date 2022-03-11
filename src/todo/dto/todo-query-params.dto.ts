import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { QueryParamsDTO, SortEnum } from 'src/common/http';

export class TodoSortMap {
  @IsOptional()
  @IsEnum(SortEnum)
  createdAt?: SortEnum;

  @IsOptional()
  @IsEnum(SortEnum)
  completedAt?: SortEnum;
}

export class TodoFiltersMap {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

export class TodoQueryParamsDTO extends QueryParamsDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => TodoFiltersMap)
  filter: TodoFiltersMap;

  @IsOptional()
  @ValidateNested()
  @Type(() => TodoSortMap)
  sort: TodoSortMap;
}
