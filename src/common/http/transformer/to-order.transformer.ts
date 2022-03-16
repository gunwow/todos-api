import { OrderDirection, OrderOptions, SortMap } from '../type';

export const transformToOrderOptions = <T = Record<string, string>>(
  sortMap: SortMap<T>,
): OrderOptions<T> => {
  return Object.entries(sortMap ?? {}).map(
    ([field, orderDirection]: [string, string]) => {
      return [<keyof T>field, <OrderDirection>orderDirection.toLowerCase()];
    },
  );
};
