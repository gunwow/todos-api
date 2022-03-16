import { Op, WhereOptions } from 'sequelize';
import { SingleQuery, FiltersKeyValuePair, FiltersMap } from '../type';

export const transformToWhereOptions = <T = unknown>(
  filtersMap: FiltersMap<T>,
): WhereOptions<T> => {
  const objectEntries: [string | symbol, string | SingleQuery][] =
    Object.entries(filtersMap).map(([field, value]: FiltersKeyValuePair) =>
      transformToSingleWhereClause(field, value),
    );

  return <WhereOptions<T>>formWhereOptions(objectEntries);
};

export const transformToSingleWhereClause = (
  initialKey: string,
  initialValue: string | SingleQuery,
): [string | symbol, string | SingleQuery] => {
  const field: string | symbol = transformOperator(initialKey);

  let value: any;
  if (typeof initialValue !== 'object') {
    value = transformValue(initialValue);
  } else {
    value = Object.entries(initialValue || {}).map(
      ([prop, propValue]: FiltersKeyValuePair) =>
        transformToSingleWhereClause(prop, propValue),
    );
  }

  return [field, value];
};

export const transformValue = (value: string): boolean | null | string => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value === 'null') {
    return null;
  }
  return value;
};

export const transformOperator = (initialValue: string): string | symbol => {
  if (initialValue.charAt(0) !== '$') {
    return initialValue;
  }
  const operator: string = initialValue.replace('$', '');
  return <symbol>Op[operator];
};

export const formWhereOptions = <T>(
  initialEntries: [string | symbol, string | SingleQuery][],
): WhereOptions<T> => {
  const mappedEntries = initialEntries.map(([field, value]) =>
    mapEntries(field, value),
  );
  return <WhereOptions<T>>Object.fromEntries(mappedEntries);
};

export const mapEntries = (
  key: string | symbol,
  value: string | SingleQuery,
) => {
  if (Array.isArray(value)) {
    return [
      key,
      Object.fromEntries(
        value.map(([prop, propValue]) => mapEntries(prop, propValue)),
      ),
    ];
  }
  return [key, value];
};
