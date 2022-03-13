import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { WhereOptions } from 'sequelize';
import { FiltersMap, transformToWhereOptions } from '.';

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
  @Transform((p) => {
    return transformToWhereOptions(p.value);
  })
  filter: FiltersMap<T>;
}

export class QueryFiltersDTO<T = unknown> extends PaginationParamsDTO {
  where?: WhereOptions<T>;
}
