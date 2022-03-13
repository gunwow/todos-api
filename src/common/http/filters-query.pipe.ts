import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryFiltersDTO, QueryParamsDTO } from './query-params.dto';

@Injectable()
export class QueryFiltersPipe
  implements PipeTransform<QueryParamsDTO, QueryFiltersDTO>
{
  transform({ filter: where, ...query }: QueryParamsDTO): QueryFiltersDTO {
    return {
      ...query,
      where,
    };
  }
}
