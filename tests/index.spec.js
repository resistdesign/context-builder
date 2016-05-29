import { assert } from 'chai';
import MochaHelper from '../mocha-helper';
import ContextBuilder from '../index';

const DEFAULT_EXT = '.json';
const TEST_PATH_ROOT = 'tests/fixtures';
const TEST_PATH_ROOT2 = 'tests/fixtures2';
const TEST_CONTEXT_FILE_NAME = `something/else${DEFAULT_EXT}`;
const TEST_CONTEXT_PATH = `${TEST_PATH_ROOT}/${TEST_CONTEXT_FILE_NAME}`;

MochaHelper({
  ContextBuilder: {
    'should be a class': () => {
      assert.instanceOf(ContextBuilder, Function);
    },
    DEFAULT_EXT: {
      'should be .json': () => {
        assert.equal(ContextBuilder.DEFAULT_EXT, DEFAULT_EXT);
      }
    },
    getContextNameFromPath: {
      'should be a function': () => {
        assert.instanceOf(ContextBuilder.getContextNameFromPath, Function);
      },
      'should return a dot notation name from a path': () => {
        assert.equal(ContextBuilder.getContextNameFromPath(
          TEST_PATH_ROOT, TEST_CONTEXT_PATH, DEFAULT_EXT
        ), 'something.else');
      }
    },
    getGlobPattern: {
      'should be a function': () => {
        assert.instanceOf(ContextBuilder.getGlobPattern, Function);
      },
      'should return a glob pattern for all target files in all subdirectories': () => {
        assert.match(ContextBuilder.getGlobPattern(TEST_PATH_ROOT), /\*\*/);
      }
    },
    readContexts: {
      'should be a function': () => {
        assert.instanceOf(ContextBuilder.readContexts, Function);
      },
      'should return an array of objects': () => {
        const contextRoots = ContextBuilder.readContexts([
          TEST_PATH_ROOT,
          TEST_PATH_ROOT2
        ]);
        const item = contextRoots[0];
        const item2 = contextRoots[1];

        assert.instanceOf(item, Object);
        assert.instanceOf(item2, Object);
        assert.property(item2, 'demo3');
        assert.property(item2.demo3, 'junk');
        assert.propertyVal(item2.demo3, 'junk', 'and other refuse');
      }
    }
  }
});
