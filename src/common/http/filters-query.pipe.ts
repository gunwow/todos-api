import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryFiltersDTO, QueryParamsDTO } from './query-params.dto';
import { OrderDirection, OrderOptions, SortMap } from './type';

@Injectable()
export class QueryFiltersPipe
  implements PipeTransform<QueryParamsDTO, QueryFiltersDTO>
{
  transform({
    filter: where,
    sort,
    ...query
  }: QueryParamsDTO): QueryFiltersDTO {
    const order: OrderOptions<Record<string, OrderDirection>> = <
      OrderOptions<unknown>
    >(<SortMap<unknown>>sort);

    return <QueryFiltersDTO>{
      ...query,
      order,
      where,
    };
  }
}
