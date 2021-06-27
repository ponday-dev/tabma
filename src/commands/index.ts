import { GitError } from 'simple-git';
import * as yargs from 'yargs';

import { Configuration, loadConfig } from '../config';
import { err, Result } from '../utils';
import * as branch from './branch';

export const run = async () => {
  const args = await yargs
    .command('branch', 'create new branch', (builder) => {
      return builder
        .option('switch', {
          alias: 's',
          description: 'switch new branch after create',
          type: 'boolean',
          default: false,
        })
        .help();
    })
    .demandCommand(1)
    .option('config', { alias: 'c', description: 'configuration file path', type: 'string', default: null })
    .option('encoding', { description: 'the encoding of configuration file', type: 'string', default: 'utf-8' })
    .help().argv;

  const config = loadConfig(args.config, { encoding: args.encoding as BufferEncoding });

  if (config.err) {
    console.error(config.unwrapErr().message);
    process.exit(1);
  }

  let result: Result<string, GitError>;
  switch (args._[0]) {
    case 'branch':
      result = await branch.run(config.unwrap(), args);
      break;
    default:
      result = err(new Error(`Sub command: ${args._[0]} is not found.`));
  }

  if (result.err) {
    console.error(config.unwrapErr().message);
    process.exit(1);
  }
};
