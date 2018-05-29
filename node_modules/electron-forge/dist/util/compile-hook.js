'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('./ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _readPackageJson = require('./read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (originalDir, buildPath, electronVersion, pPlatform, pArch, done) {
    yield (0, _oraHandler2.default)('Compiling Application', (0, _bluebird.coroutine)(function* () {
      let compileAndShim = (() => {
        var _ref3 = (0, _bluebird.coroutine)(function* (appDir) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)((yield _fsExtra2.default.readdir(appDir))), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              const entry = _step.value;

              if (!entry.match(/^(node_modules|bower_components)$/)) {
                const fullPath = _path2.default.join(appDir, entry);

                if ((yield _fsExtra2.default.stat(fullPath)).isDirectory()) {
                  const log = console.log;
                  console.log = function () {};
                  yield compileCLI.main(appDir, [fullPath]);
                  console.log = log;
                }
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

          const packageJSON = yield (0, _readPackageJson2.default)(appDir);

          const index = packageJSON.main || 'index.js';
          packageJSON.originalMain = index;
          packageJSON.main = 'es6-shim.js';

          yield _fsExtra2.default.writeFile(_path2.default.join(appDir, 'es6-shim.js'), (yield _fsExtra2.default.readFile(_path2.default.join(_path2.default.resolve(originalDir, 'node_modules/electron-compile/lib/es6-shim.js')), 'utf8')));

          yield _fsExtra2.default.writeJson(_path2.default.join(appDir, 'package.json'), packageJSON, { spaces: 2 });
        });

        return function compileAndShim(_x7) {
          return _ref3.apply(this, arguments);
        };
      })();

      const compileCLI = require(_path2.default.resolve(originalDir, 'node_modules/electron-compile/lib/cli.js'));

      yield compileAndShim(buildPath);
    }));
    done();
  });

  return function (_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvY29tcGlsZS1ob29rLmpzIl0sIm5hbWVzIjpbIm9yaWdpbmFsRGlyIiwiYnVpbGRQYXRoIiwiZWxlY3Ryb25WZXJzaW9uIiwicFBsYXRmb3JtIiwicEFyY2giLCJkb25lIiwiYXBwRGlyIiwiZnMiLCJyZWFkZGlyIiwiZW50cnkiLCJtYXRjaCIsImZ1bGxQYXRoIiwicGF0aCIsImpvaW4iLCJzdGF0IiwiaXNEaXJlY3RvcnkiLCJsb2ciLCJjb25zb2xlIiwiY29tcGlsZUNMSSIsIm1haW4iLCJwYWNrYWdlSlNPTiIsImluZGV4Iiwib3JpZ2luYWxNYWluIiwid3JpdGVGaWxlIiwicmVhZEZpbGUiLCJyZXNvbHZlIiwid3JpdGVKc29uIiwic3BhY2VzIiwiY29tcGlsZUFuZFNoaW0iLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7OztzQ0FFZSxXQUFNQSxXQUFOLEVBQW1CQyxTQUFuQixFQUE4QkMsZUFBOUIsRUFBK0NDLFNBQS9DLEVBQTBEQyxLQUExRCxFQUFpRUMsSUFBakUsRUFBMEU7QUFDdkYsVUFBTSwwQkFBUyx1QkFBVCwyQkFBa0MsYUFBWTtBQUFBO0FBQUEsNkNBR2xELFdBQThCQyxNQUE5QixFQUFzQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNwQyw2REFBb0IsTUFBTUMsa0JBQUdDLE9BQUgsQ0FBV0YsTUFBWCxDQUExQiw2R0FBOEM7QUFBQSxvQkFBbkNHLEtBQW1DOztBQUM1QyxrQkFBSSxDQUFDQSxNQUFNQyxLQUFOLENBQVksbUNBQVosQ0FBTCxFQUF1RDtBQUNyRCxzQkFBTUMsV0FBV0MsZUFBS0MsSUFBTCxDQUFVUCxNQUFWLEVBQWtCRyxLQUFsQixDQUFqQjs7QUFFQSxvQkFBSSxDQUFDLE1BQU1GLGtCQUFHTyxJQUFILENBQVFILFFBQVIsQ0FBUCxFQUEwQkksV0FBMUIsRUFBSixFQUE2QztBQUMzQyx3QkFBTUMsTUFBTUMsUUFBUUQsR0FBcEI7QUFDQUMsMEJBQVFELEdBQVIsR0FBYyxZQUFNLENBQUUsQ0FBdEI7QUFDQSx3QkFBTUUsV0FBV0MsSUFBWCxDQUFnQmIsTUFBaEIsRUFBd0IsQ0FBQ0ssUUFBRCxDQUF4QixDQUFOO0FBQ0FNLDBCQUFRRCxHQUFSLEdBQWNBLEdBQWQ7QUFDRDtBQUNGO0FBQ0Y7QUFabUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjcEMsZ0JBQU1JLGNBQWMsTUFBTSwrQkFBZ0JkLE1BQWhCLENBQTFCOztBQUVBLGdCQUFNZSxRQUFRRCxZQUFZRCxJQUFaLElBQW9CLFVBQWxDO0FBQ0FDLHNCQUFZRSxZQUFaLEdBQTJCRCxLQUEzQjtBQUNBRCxzQkFBWUQsSUFBWixHQUFtQixhQUFuQjs7QUFFQSxnQkFBTVosa0JBQUdnQixTQUFILENBQWFYLGVBQUtDLElBQUwsQ0FBVVAsTUFBVixFQUFrQixhQUFsQixDQUFiLEdBQ0osTUFBTUMsa0JBQUdpQixRQUFILENBQVlaLGVBQUtDLElBQUwsQ0FBVUQsZUFBS2EsT0FBTCxDQUFhekIsV0FBYixFQUEwQiwrQ0FBMUIsQ0FBVixDQUFaLEVBQW1HLE1BQW5HLENBREYsRUFBTjs7QUFHQSxnQkFBTU8sa0JBQUdtQixTQUFILENBQWFkLGVBQUtDLElBQUwsQ0FBVVAsTUFBVixFQUFrQixjQUFsQixDQUFiLEVBQWdEYyxXQUFoRCxFQUE2RCxFQUFFTyxRQUFRLENBQVYsRUFBN0QsQ0FBTjtBQUNELFNBM0JpRDs7QUFBQSx3QkFHbkNDLGNBSG1DO0FBQUE7QUFBQTtBQUFBOztBQUNsRCxZQUFNVixhQUFhVyxRQUFRakIsZUFBS2EsT0FBTCxDQUFhekIsV0FBYixFQUEwQiwwQ0FBMUIsQ0FBUixDQUFuQjs7QUE0QkEsWUFBTTRCLGVBQWUzQixTQUFmLENBQU47QUFDRCxLQTlCSyxFQUFOO0FBK0JBSTtBQUNELEciLCJmaWxlIjoidXRpbC9jb21waWxlLWhvb2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCBhc3luY09yYSBmcm9tICcuL29yYS1oYW5kbGVyJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi9yZWFkLXBhY2thZ2UtanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jKG9yaWdpbmFsRGlyLCBidWlsZFBhdGgsIGVsZWN0cm9uVmVyc2lvbiwgcFBsYXRmb3JtLCBwQXJjaCwgZG9uZSkgPT4ge1xuICBhd2FpdCBhc3luY09yYSgnQ29tcGlsaW5nIEFwcGxpY2F0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNvbXBpbGVDTEkgPSByZXF1aXJlKHBhdGgucmVzb2x2ZShvcmlnaW5hbERpciwgJ25vZGVfbW9kdWxlcy9lbGVjdHJvbi1jb21waWxlL2xpYi9jbGkuanMnKSk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBjb21waWxlQW5kU2hpbShhcHBEaXIpIHtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgYXdhaXQgZnMucmVhZGRpcihhcHBEaXIpKSB7XG4gICAgICAgIGlmICghZW50cnkubWF0Y2goL14obm9kZV9tb2R1bGVzfGJvd2VyX2NvbXBvbmVudHMpJC8pKSB7XG4gICAgICAgICAgY29uc3QgZnVsbFBhdGggPSBwYXRoLmpvaW4oYXBwRGlyLCBlbnRyeSk7XG5cbiAgICAgICAgICBpZiAoKGF3YWl0IGZzLnN0YXQoZnVsbFBhdGgpKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICBjb25zdCBsb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nID0gKCkgPT4ge307XG4gICAgICAgICAgICBhd2FpdCBjb21waWxlQ0xJLm1haW4oYXBwRGlyLCBbZnVsbFBhdGhdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nID0gbG9nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWNrYWdlSlNPTiA9IGF3YWl0IHJlYWRQYWNrYWdlSlNPTihhcHBEaXIpO1xuXG4gICAgICBjb25zdCBpbmRleCA9IHBhY2thZ2VKU09OLm1haW4gfHwgJ2luZGV4LmpzJztcbiAgICAgIHBhY2thZ2VKU09OLm9yaWdpbmFsTWFpbiA9IGluZGV4O1xuICAgICAgcGFja2FnZUpTT04ubWFpbiA9ICdlczYtc2hpbS5qcyc7XG5cbiAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShwYXRoLmpvaW4oYXBwRGlyLCAnZXM2LXNoaW0uanMnKSxcbiAgICAgICAgYXdhaXQgZnMucmVhZEZpbGUocGF0aC5qb2luKHBhdGgucmVzb2x2ZShvcmlnaW5hbERpciwgJ25vZGVfbW9kdWxlcy9lbGVjdHJvbi1jb21waWxlL2xpYi9lczYtc2hpbS5qcycpKSwgJ3V0ZjgnKSk7XG5cbiAgICAgIGF3YWl0IGZzLndyaXRlSnNvbihwYXRoLmpvaW4oYXBwRGlyLCAncGFja2FnZS5qc29uJyksIHBhY2thZ2VKU09OLCB7IHNwYWNlczogMiB9KTtcbiAgICB9XG5cbiAgICBhd2FpdCBjb21waWxlQW5kU2hpbShidWlsZFBhdGgpO1xuICB9KTtcbiAgZG9uZSgpO1xufTtcbiJdfQ==