import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import { err, ok, Result } from '../utils';
import { FileNotFoundError } from '../utils/result/error';

const defaultConfigFilePath = path.resolve(__dirname, '.tabmarc');

export type LoadResult = ReturnType<typeof yaml.load>;

export const loadFileSync = (filePath: string | null, encoding: BufferEncoding = 'utf8'): Result<LoadResult> => {
  try {
    const targetPath = filePath ?? defaultConfigFilePath;
    if (!fs.existsSync(targetPath)) {
      if (filePath === null) {
        return ok({});
      }
      throw new FileNotFoundError();
    }

    const doc = yaml.load(fs.readFileSync(targetPath, { encoding }));

    return ok(doc);
  } catch (e) {
    return err<LoadResult>(e);
  }
};
