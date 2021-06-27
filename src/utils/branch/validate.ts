import { BranchNameCase } from '../../config';
import { isCamelCase, isChainCase, isPascalCase, isSnakeCase } from '../string';

export const isValidBranchNameCase = (name: string, branchNameCase: BranchNameCase): boolean => {
  switch (branchNameCase) {
    case 'camel':
      return isCamelCase(name);
    case 'chain':
      return isChainCase(name);
    case 'pascal':
      return isPascalCase(name);
    case 'snake':
      return isSnakeCase(name);
  }
};
