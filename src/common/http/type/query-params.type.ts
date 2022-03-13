export type Operator = `$${string}`;
export type SingleQuery = { [x: Operator]: SingleQuery | string };
export type FiltersMap<T> = Partial<Record<keyof T, SingleQuery | string>>;
export type FiltersKeyValuePair = [string, SingleQuery | string];
