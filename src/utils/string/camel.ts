export const isCamelCase = (value: string): boolean => {
  return /^[a-z][\w]*$/.test(value);
};
