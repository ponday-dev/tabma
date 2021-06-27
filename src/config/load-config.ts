import { Result } from '../utils';
import { Configuration } from './configuration';
import { loadFileSync } from './load';
import { parse } from './parse';
import { createPatch } from './patch';

type LoadOptions = Partial<Configuration> & {
  encoding?: BufferEncoding;
};

export const loadConfig = (path: string | null, options: LoadOptions = {}): Result<Configuration> => {
  const { encoding, ...conf } = options;

  const patch = createPatch(conf);

  const config = loadFileSync(path, encoding).map(parse).map(patch);

  return config;
};
