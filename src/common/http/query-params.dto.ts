import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { WhereOptions } from 'sequelize';
import { FiltersMap, OrderOptions, SortMap, transformToWhereOptions } from '.';
import { transformToOrderOptions } from './transformer';

export class PaginationParamsDTO {
  @IsOptional()
  @IsNumber()
  @Transform((property) => +property.value ?? null)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform((property) => +property.value ?? null)
  offset?: number;
}

export class QueryParamsDTO<
  T = Partial<Record<string, any>>,
> extends PaginationParamsDTO {
  @IsOptional()
  @Transform(({ value }) => transformToWhereOptions(value))
  filter: FiltersMap<T>;

  @IsOptional()
  @Transform(({ value }) => transformToOrderOptions(value))
  sort: SortMap<T>;
}

export class QueryFiltersDTO<
  T = Record<string, any>,
> extends PaginationParamsDTO {
  where?: WhereOptions<T>;
  order?: OrderOptions<T>;
}
