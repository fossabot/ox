import path from 'path';

const cwd = process.cwd();

export default function resolvePath(...paths) {
  return path.resolve(cwd, ...paths);
}
