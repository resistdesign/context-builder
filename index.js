import Glob from 'glob';
import Path from 'path';
import FS from 'fs';

const DEFAULT_EXT = '.json';

export default class ContextBuilder {
  static DEFAULT_EXT = DEFAULT_EXT;

  static getContextNameFromPath(basePath, path, ext) {
    if (
      typeof path === 'string' &&
      typeof basePath === 'string'
    ) {
      const relPath = Path.relative(
        basePath,
        Path.join(
          Path.dirname(path),
          Path.basename(path, ext)
        )
      );

      return relPath.split(Path.sep).join('.');
    }
  }

  static getGlobPattern(path, ext) {
    return Path.join(path, `**/*${ext}`);
  }

  static readContexts(paths, ext = DEFAULT_EXT) {
    const contexts = [];

    if (paths instanceof Array) {
      for (let i = 0; i < paths.length; i++) {
        const p = paths[i];

        if (typeof p === 'string') {
          const contextMap = {};
          const pattern = ContextBuilder.getGlobPattern(p, ext);
          const contextPaths = Glob.sync(pattern);

          contextPaths.forEach(path => {
            const contextName = ContextBuilder.getContextNameFromPath(p, path, ext);

            contextMap[contextName] = JSON.parse(FS.readFileSync(path, 'utf8'));
          });

          contexts.push(contextMap);
        }
      }
    }

    return contexts;
  }

  constructor() {
  }
}
