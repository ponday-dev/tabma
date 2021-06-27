import { InvalidFileFormatError } from '../utils/result/error';
import { Configuration, defaultConfig } from './configuration';
import { LoadResult } from './load';

export const parse = (value: LoadResult): Configuration => {
  if (!value || typeof value !== 'object') {
    throw new InvalidFileFormatError();
  }

  return {
    ...defaultConfig,
    ...value,
  };
};
