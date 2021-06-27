export const isChainCase = (value: string): boolean => {
  return /^[a-z]+(-[a-z]+)*$/.test(value);
};
