import { UnaryFunction } from '../utils';
import { Configuration } from './configuration';

export const createPatch = (patch: Partial<Configuration>): UnaryFunction<Configuration> => {
  return (config) => {
    return {
      ...config,
      ...patch,
    };
  };
};
