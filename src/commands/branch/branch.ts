import inquirer from 'inquirer';
import simpleGit, { GitError } from 'simple-git';

import { Configuration } from '../../config';
import { err, isChainCase, ok, Result } from '../../utils';

type Answers = {
  category: string;
  name: string;
};

type Options = {
  switch: boolean;
};

export const run = async (config: Configuration, options: Options): Promise<Result<string, GitError>> => {
  const { switch: sw } = options;
  const git = simpleGit();

  const answers: Answers = await inquirer.prompt([
    { name: 'category', type: 'list', message: 'What is the purpose of this branch ?', choices: config.categories },
    {
      name: 'name',
      type: 'input',
      message: "What is this branch's name ?",
      validate: (input) => {
        let result = true;
        switch (config.branchNameCase) {
          case 'chain':
            result = isChainCase(input);
            break;
        }
        return result || `The name is must be a ${config.branchNameCase} case.`;
      },
    },
  ]);

  const localBranches = await git.branchLocal();

  const branchName = config.branchNameFormat
    .replace(/\{category}/g, answers.category)
    .replace(/\{name}/g, answers.name);

  let result = ok('');
  if (localBranches.all.includes(branchName)) {
    result = ok(`Branch: ${branchName} is already exists. Skipped.`);
  } else {
    await git.branch([branchName], (gitError) => {
      if (gitError) {
        result = err(gitError);
        return;
      }

      if (sw) {
        git.checkout([branchName]);
      }
    });
  }

  return result;
};
