export const isSnakeCase = (value: string): boolean => {
  return /^[a-z]+(_[a-z]+)*$/.test(value);
};
