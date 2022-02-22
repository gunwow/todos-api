export const toBoolean = (value: any): boolean => {
  const truthyValues: string[] = ['true', '1'];

  if (typeof value === 'string') {
    return truthyValues.includes(value);
  }
  return !!value;
};
