export const isPascalCase = (value: string): boolean => {
  return /^[A-Z][\w]*$/.test(value);
};
