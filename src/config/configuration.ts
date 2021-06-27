export type BranchNameCase = 'chain' | 'snake' | 'pascal' | 'camel';

export type Configuration = {
  categories: string[];
  branchNameCase: BranchNameCase;
  branchNameFormat: string;
  allowNonAscii: boolean;
};

export const defaultConfig: Configuration = {
  categories: ['feat', 'fix', 'chore', 'spike'],
  branchNameCase: 'chain',
  branchNameFormat: '{category}/{name}',
  allowNonAscii: false,
};
