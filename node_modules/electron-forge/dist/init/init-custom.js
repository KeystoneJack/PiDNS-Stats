'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _resolvePackage = require('resolve-package');

var _resolvePackage2 = _interopRequireDefault(_resolvePackage);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _initStarterFiles = require('./init-starter-files');

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _installDependencies = require('../util/install-dependencies');

var _installDependencies2 = _interopRequireDefault(_installDependencies);

var _ora = require('../util/ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:init:custom');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir, template, lintStyle) {
    let templateModulePath;
    yield (0, _oraHandler2.default)(`Locating custom template: "${template}"`, (0, _bluebird.coroutine)(function* () {
      try {
        templateModulePath = yield (0, _resolvePackage2.default)(`electron-forge-template-${template}`);
        d('using global template');
      } catch (err) {
        try {
          templateModulePath = require.resolve(`electron-forge-template-${template}`);
          d('using local template');
        } catch (err2) {
          throw `Failed to locate custom template: "${template}"\n\nTry \`npm install -g electron-forge-template-${template}\``;
        }
      }
    }));

    let templateModule = require(templateModulePath);

    templateModule = templateModule.default || templateModule;

    yield (0, _oraHandler2.default)('Installing Template Dependencies', (0, _bluebird.coroutine)(function* () {
      d('installing dependencies');
      yield (0, _installDependencies2.default)(dir, templateModule.dependencies || []);
      d('installing devDependencies');
      yield (0, _installDependencies2.default)(dir, templateModule.devDependencies || [], true);
    }));

    yield (0, _oraHandler2.default)('Copying Template Files', (0, _bluebird.coroutine)(function* () {
      const templateDirectory = templateModule.templateDirectory;
      if (templateDirectory) {
        const tmplPath = templateDirectory;
        if (!_path2.default.isAbsolute(templateDirectory)) {
          throw `Custom template path needs to be absolute, this is an issue with "electron-forge-template-${template}"`;
        }

        const files = _glob2.default.sync(_path2.default.resolve(tmplPath, '**/*'));

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(files), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            const file = _step.value;

            if ((yield _fsExtra2.default.stat(file)).isFile()) {
              yield (0, _initStarterFiles.copy)(file, _path2.default.resolve(dir, _path2.default.relative(tmplPath, file).replace(/^_/, '.')));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }));

    if (typeof templateModule.postCopy === 'function') {
      yield _promise2.default.resolve(templateModule.postCopy(dir, _ora2.default, lintStyle));
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQvaW5pdC1jdXN0b20uanMiXSwibmFtZXMiOlsiZCIsImRpciIsInRlbXBsYXRlIiwibGludFN0eWxlIiwidGVtcGxhdGVNb2R1bGVQYXRoIiwiZXJyIiwicmVxdWlyZSIsInJlc29sdmUiLCJlcnIyIiwidGVtcGxhdGVNb2R1bGUiLCJkZWZhdWx0IiwiZGVwZW5kZW5jaWVzIiwiZGV2RGVwZW5kZW5jaWVzIiwidGVtcGxhdGVEaXJlY3RvcnkiLCJ0bXBsUGF0aCIsInBhdGgiLCJpc0Fic29sdXRlIiwiZmlsZXMiLCJnbG9iIiwic3luYyIsImZpbGUiLCJmcyIsInN0YXQiLCJpc0ZpbGUiLCJyZWxhdGl2ZSIsInJlcGxhY2UiLCJwb3N0Q29weSIsIm9yYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLElBQUkscUJBQU0sNEJBQU4sQ0FBVjs7O3NDQUVlLFdBQU9DLEdBQVAsRUFBWUMsUUFBWixFQUFzQkMsU0FBdEIsRUFBb0M7QUFDakQsUUFBSUMsa0JBQUo7QUFDQSxVQUFNLDBCQUFVLDhCQUE2QkYsUUFBUyxHQUFoRCwyQkFBb0QsYUFBWTtBQUNwRSxVQUFJO0FBQ0ZFLDZCQUFxQixNQUFNLDhCQUFnQiwyQkFBMEJGLFFBQVMsRUFBbkQsQ0FBM0I7QUFDQUYsVUFBRSx1QkFBRjtBQUNELE9BSEQsQ0FHRSxPQUFPSyxHQUFQLEVBQVk7QUFDWixZQUFJO0FBQ0ZELCtCQUFxQkUsUUFBUUMsT0FBUixDQUFpQiwyQkFBMEJMLFFBQVMsRUFBcEQsQ0FBckI7QUFDQUYsWUFBRSxzQkFBRjtBQUNELFNBSEQsQ0FHRSxPQUFPUSxJQUFQLEVBQWE7QUFDYixnQkFBTyxzQ0FBcUNOLFFBQVMscURBQW9EQSxRQUFTLElBQWxIO0FBQ0Q7QUFDRjtBQUNGLEtBWkssRUFBTjs7QUFjQSxRQUFJTyxpQkFBaUJILFFBQVFGLGtCQUFSLENBQXJCOztBQUVBSyxxQkFBaUJBLGVBQWVDLE9BQWYsSUFBMEJELGNBQTNDOztBQUVBLFVBQU0sMEJBQVMsa0NBQVQsMkJBQTZDLGFBQVk7QUFDN0RULFFBQUUseUJBQUY7QUFDQSxZQUFNLG1DQUFlQyxHQUFmLEVBQW9CUSxlQUFlRSxZQUFmLElBQStCLEVBQW5ELENBQU47QUFDQVgsUUFBRSw0QkFBRjtBQUNBLFlBQU0sbUNBQWVDLEdBQWYsRUFBb0JRLGVBQWVHLGVBQWYsSUFBa0MsRUFBdEQsRUFBMEQsSUFBMUQsQ0FBTjtBQUNELEtBTEssRUFBTjs7QUFPQSxVQUFNLDBCQUFTLHdCQUFULDJCQUFtQyxhQUFZO0FBQ25ELFlBQU1DLG9CQUFvQkosZUFBZUksaUJBQXpDO0FBQ0EsVUFBSUEsaUJBQUosRUFBdUI7QUFDckIsY0FBTUMsV0FBV0QsaUJBQWpCO0FBQ0EsWUFBSSxDQUFDRSxlQUFLQyxVQUFMLENBQWdCSCxpQkFBaEIsQ0FBTCxFQUF5QztBQUN2QyxnQkFBTyw2RkFBNEZYLFFBQVMsR0FBNUc7QUFDRDs7QUFFRCxjQUFNZSxRQUFRQyxlQUFLQyxJQUFMLENBQVVKLGVBQUtSLE9BQUwsQ0FBYU8sUUFBYixFQUF1QixNQUF2QixDQUFWLENBQWQ7O0FBTnFCO0FBQUE7QUFBQTs7QUFBQTtBQVFyQiwwREFBbUJHLEtBQW5CLDRHQUEwQjtBQUFBLGtCQUFmRyxJQUFlOztBQUN4QixnQkFBSSxDQUFDLE1BQU1DLGtCQUFHQyxJQUFILENBQVFGLElBQVIsQ0FBUCxFQUFzQkcsTUFBdEIsRUFBSixFQUFvQztBQUNsQyxvQkFBTSw0QkFBS0gsSUFBTCxFQUFXTCxlQUFLUixPQUFMLENBQWFOLEdBQWIsRUFBa0JjLGVBQUtTLFFBQUwsQ0FBY1YsUUFBZCxFQUF3Qk0sSUFBeEIsRUFBOEJLLE9BQTlCLENBQXNDLElBQXRDLEVBQTRDLEdBQTVDLENBQWxCLENBQVgsQ0FBTjtBQUNEO0FBQ0Y7QUFab0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWF0QjtBQUNGLEtBaEJLLEVBQU47O0FBa0JBLFFBQUksT0FBT2hCLGVBQWVpQixRQUF0QixLQUFtQyxVQUF2QyxFQUFtRDtBQUNqRCxZQUFNLGtCQUFRbkIsT0FBUixDQUFnQkUsZUFBZWlCLFFBQWYsQ0FBd0J6QixHQUF4QixFQUE2QjBCLGFBQTdCLEVBQWtDeEIsU0FBbEMsQ0FBaEIsQ0FBTjtBQUNEO0FBQ0YsRyIsImZpbGUiOiJpbml0L2luaXQtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCByZXNvbHZlUGFja2FnZSBmcm9tICdyZXNvbHZlLXBhY2thZ2UnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IGNvcHkgfSBmcm9tICcuL2luaXQtc3RhcnRlci1maWxlcyc7XG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5pbXBvcnQgaW5zdGFsbERlcExpc3QgZnJvbSAnLi4vdXRpbC9pbnN0YWxsLWRlcGVuZGVuY2llcyc7XG5pbXBvcnQgb3JhIGZyb20gJy4uL3V0aWwvb3JhJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTppbml0OmN1c3RvbScpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyLCB0ZW1wbGF0ZSwgbGludFN0eWxlKSA9PiB7XG4gIGxldCB0ZW1wbGF0ZU1vZHVsZVBhdGg7XG4gIGF3YWl0IGFzeW5jT3JhKGBMb2NhdGluZyBjdXN0b20gdGVtcGxhdGU6IFwiJHt0ZW1wbGF0ZX1cImAsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGVtcGxhdGVNb2R1bGVQYXRoID0gYXdhaXQgcmVzb2x2ZVBhY2thZ2UoYGVsZWN0cm9uLWZvcmdlLXRlbXBsYXRlLSR7dGVtcGxhdGV9YCk7XG4gICAgICBkKCd1c2luZyBnbG9iYWwgdGVtcGxhdGUnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRlbXBsYXRlTW9kdWxlUGF0aCA9IHJlcXVpcmUucmVzb2x2ZShgZWxlY3Ryb24tZm9yZ2UtdGVtcGxhdGUtJHt0ZW1wbGF0ZX1gKTtcbiAgICAgICAgZCgndXNpbmcgbG9jYWwgdGVtcGxhdGUnKTtcbiAgICAgIH0gY2F0Y2ggKGVycjIpIHtcbiAgICAgICAgdGhyb3cgYEZhaWxlZCB0byBsb2NhdGUgY3VzdG9tIHRlbXBsYXRlOiBcIiR7dGVtcGxhdGV9XCJcXG5cXG5UcnkgXFxgbnBtIGluc3RhbGwgLWcgZWxlY3Ryb24tZm9yZ2UtdGVtcGxhdGUtJHt0ZW1wbGF0ZX1cXGBgO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHRlbXBsYXRlTW9kdWxlID0gcmVxdWlyZSh0ZW1wbGF0ZU1vZHVsZVBhdGgpO1xuXG4gIHRlbXBsYXRlTW9kdWxlID0gdGVtcGxhdGVNb2R1bGUuZGVmYXVsdCB8fCB0ZW1wbGF0ZU1vZHVsZTtcblxuICBhd2FpdCBhc3luY09yYSgnSW5zdGFsbGluZyBUZW1wbGF0ZSBEZXBlbmRlbmNpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgZCgnaW5zdGFsbGluZyBkZXBlbmRlbmNpZXMnKTtcbiAgICBhd2FpdCBpbnN0YWxsRGVwTGlzdChkaXIsIHRlbXBsYXRlTW9kdWxlLmRlcGVuZGVuY2llcyB8fCBbXSk7XG4gICAgZCgnaW5zdGFsbGluZyBkZXZEZXBlbmRlbmNpZXMnKTtcbiAgICBhd2FpdCBpbnN0YWxsRGVwTGlzdChkaXIsIHRlbXBsYXRlTW9kdWxlLmRldkRlcGVuZGVuY2llcyB8fCBbXSwgdHJ1ZSk7XG4gIH0pO1xuXG4gIGF3YWl0IGFzeW5jT3JhKCdDb3B5aW5nIFRlbXBsYXRlIEZpbGVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlRGlyZWN0b3J5ID0gdGVtcGxhdGVNb2R1bGUudGVtcGxhdGVEaXJlY3Rvcnk7XG4gICAgaWYgKHRlbXBsYXRlRGlyZWN0b3J5KSB7XG4gICAgICBjb25zdCB0bXBsUGF0aCA9IHRlbXBsYXRlRGlyZWN0b3J5O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUodGVtcGxhdGVEaXJlY3RvcnkpKSB7XG4gICAgICAgIHRocm93IGBDdXN0b20gdGVtcGxhdGUgcGF0aCBuZWVkcyB0byBiZSBhYnNvbHV0ZSwgdGhpcyBpcyBhbiBpc3N1ZSB3aXRoIFwiZWxlY3Ryb24tZm9yZ2UtdGVtcGxhdGUtJHt0ZW1wbGF0ZX1cImA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVzID0gZ2xvYi5zeW5jKHBhdGgucmVzb2x2ZSh0bXBsUGF0aCwgJyoqLyonKSk7XG5cbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICBpZiAoKGF3YWl0IGZzLnN0YXQoZmlsZSkpLmlzRmlsZSgpKSB7XG4gICAgICAgICAgYXdhaXQgY29weShmaWxlLCBwYXRoLnJlc29sdmUoZGlyLCBwYXRoLnJlbGF0aXZlKHRtcGxQYXRoLCBmaWxlKS5yZXBsYWNlKC9eXy8sICcuJykpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiB0ZW1wbGF0ZU1vZHVsZS5wb3N0Q29weSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0ZW1wbGF0ZU1vZHVsZS5wb3N0Q29weShkaXIsIG9yYSwgbGludFN0eWxlKSk7XG4gIH1cbn07XG4iXX0=