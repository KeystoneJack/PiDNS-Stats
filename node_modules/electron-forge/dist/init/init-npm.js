'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.airbnbDeps = exports.standardDeps = exports.exactDevDeps = exports.devDeps = exports.deps = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _username = require('username');

var _username2 = _interopRequireDefault(_username);

var _forgeConfig = require('../util/forge-config');

var _installDependencies = require('../util/install-dependencies');

var _installDependencies2 = _interopRequireDefault(_installDependencies);

var _readPackageJson = require('../util/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:init:npm');

const deps = exports.deps = ['electron-compile', 'electron-squirrel-startup'];
const devDeps = exports.devDeps = ['babel-preset-env', 'babel-preset-react', 'babel-plugin-transform-async-to-generator', 'electron-forge'];
const exactDevDeps = exports.exactDevDeps = ['electron-prebuilt-compile'];
const standardDeps = exports.standardDeps = ['standard'];
const airbnbDeps = exports.airbnbDeps = ['eslint@^3', 'eslint-config-airbnb@^15', 'eslint-plugin-import@^2', 'eslint-plugin-jsx-a11y@^5', 'eslint-plugin-react@^7'];

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir, lintStyle) {
    yield (0, _oraHandler2.default)('Initializing NPM Module', (0, _bluebird.coroutine)(function* () {
      const packageJSON = yield (0, _readPackageJson2.default)(_path2.default.resolve(__dirname, '../../tmpl'));
      packageJSON.productName = packageJSON.name = _path2.default.basename(dir).toLowerCase();
      packageJSON.author = yield (0, _username2.default)();
      (0, _forgeConfig.setInitialForgeConfig)(packageJSON);

      switch (lintStyle) {
        case 'standard':
          packageJSON.scripts.lint = 'standard';
          break;
        case 'airbnb':
          packageJSON.scripts.lint = 'eslint src --color';
          break;
        default:
          packageJSON.scripts.lint = 'echo "No linting configured"';
          break;
      }
      d('writing package.json to:', dir);
      yield _fsExtra2.default.writeJson(_path2.default.resolve(dir, 'package.json'), packageJSON, { spaces: 2 });
    }));

    yield (0, _oraHandler2.default)('Installing NPM Dependencies', (0, _bluebird.coroutine)(function* () {
      d('installing dependencies');
      yield (0, _installDependencies2.default)(dir, deps);

      d('installing devDependencies');
      yield (0, _installDependencies2.default)(dir, devDeps, true);

      d('installing exact dependencies');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(exactDevDeps), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const packageName = _step.value;

          yield (0, _installDependencies2.default)(dir, [packageName], true, true);
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

      switch (lintStyle) {
        case 'standard':
          d('installing standard linting dependencies');
          yield (0, _installDependencies2.default)(dir, standardDeps, true);
          break;
        case 'airbnb':
          d('installing airbnb linting dependencies');
          yield (0, _installDependencies2.default)(dir, airbnbDeps, true);
          break;
        default:
          d('not installing linting deps');
          break;
      }

      // NB: For babel-preset-env to work correctly, it needs to know the
      // actual version of Electron that we installed
      const content = yield _fsExtra2.default.readJson(_path2.default.join(dir, '.compilerc'), 'utf8');
      const electronPrebuilt = require(_path2.default.join(dir, 'node_modules', 'electron-prebuilt-compile', 'package.json'));

      var _arr = ['development', 'production'];
      for (var _i = 0; _i < _arr.length; _i++) {
        const profile = _arr[_i];
        const envTarget = content.env[profile]['application/javascript'].presets.find(function (x) {
          return x[0] === 'env';
        });
        // parseFloat strips the patch version
        // parseFloat('1.3.2') === 1.3
        // Note: This won't work if the minor version ever gets higher than 9
        envTarget[1].targets.electron = parseFloat(electronPrebuilt.version).toFixed(1).toString();
      }

      yield _fsExtra2.default.writeJson(_path2.default.join(dir, '.compilerc'), content, { spaces: 2 });
    }));
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQvaW5pdC1ucG0uanMiXSwibmFtZXMiOlsiZCIsImRlcHMiLCJkZXZEZXBzIiwiZXhhY3REZXZEZXBzIiwic3RhbmRhcmREZXBzIiwiYWlyYm5iRGVwcyIsImRpciIsImxpbnRTdHlsZSIsInBhY2thZ2VKU09OIiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJwcm9kdWN0TmFtZSIsIm5hbWUiLCJiYXNlbmFtZSIsInRvTG93ZXJDYXNlIiwiYXV0aG9yIiwic2NyaXB0cyIsImxpbnQiLCJmcyIsIndyaXRlSnNvbiIsInNwYWNlcyIsInBhY2thZ2VOYW1lIiwiY29udGVudCIsInJlYWRKc29uIiwiam9pbiIsImVsZWN0cm9uUHJlYnVpbHQiLCJyZXF1aXJlIiwicHJvZmlsZSIsImVudlRhcmdldCIsImVudiIsInByZXNldHMiLCJmaW5kIiwieCIsInRhcmdldHMiLCJlbGVjdHJvbiIsInBhcnNlRmxvYXQiLCJ2ZXJzaW9uIiwidG9GaXhlZCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLElBQUkscUJBQU0seUJBQU4sQ0FBVjs7QUFFTyxNQUFNQyxzQkFBTyxDQUFDLGtCQUFELEVBQXFCLDJCQUFyQixDQUFiO0FBQ0EsTUFBTUMsNEJBQVUsQ0FBQyxrQkFBRCxFQUFxQixvQkFBckIsRUFBMkMsMkNBQTNDLEVBQXdGLGdCQUF4RixDQUFoQjtBQUNBLE1BQU1DLHNDQUFlLENBQUMsMkJBQUQsQ0FBckI7QUFDQSxNQUFNQyxzQ0FBZSxDQUFDLFVBQUQsQ0FBckI7QUFDQSxNQUFNQyxrQ0FBYSxDQUFDLFdBQUQsRUFBYywwQkFBZCxFQUEwQyx5QkFBMUMsRUFDeEIsMkJBRHdCLEVBQ0ssd0JBREwsQ0FBbkI7OztzQ0FHUSxXQUFPQyxHQUFQLEVBQVlDLFNBQVosRUFBMEI7QUFDdkMsVUFBTSww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cEIsa0JBQUdDLFNBQUgsQ0FBYVgsZUFBS2dCLElBQUwsQ0FBVW5CLEdBQVYsRUFBZSxZQUFmLENBQWIsRUFBMkNpQixPQUEzQyxFQUFvRCxFQUFFRixRQUFRLENBQVYsRUFBcEQsQ0FBTjtBQUNELEtBekNLLEVBQU47QUEwQ0QsRyIsImZpbGUiOiJpbml0L2luaXQtbnBtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB1c2VybmFtZSBmcm9tICd1c2VybmFtZSc7XG5cbmltcG9ydCB7IHNldEluaXRpYWxGb3JnZUNvbmZpZyB9IGZyb20gJy4uL3V0aWwvZm9yZ2UtY29uZmlnJztcbmltcG9ydCBpbnN0YWxsRGVwTGlzdCBmcm9tICcuLi91dGlsL2luc3RhbGwtZGVwZW5kZW5jaWVzJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi4vdXRpbC9yZWFkLXBhY2thZ2UtanNvbic7XG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aW5pdDpucG0nKTtcblxuZXhwb3J0IGNvbnN0IGRlcHMgPSBbJ2VsZWN0cm9uLWNvbXBpbGUnLCAnZWxlY3Ryb24tc3F1aXJyZWwtc3RhcnR1cCddO1xuZXhwb3J0IGNvbnN0IGRldkRlcHMgPSBbJ2JhYmVsLXByZXNldC1lbnYnLCAnYmFiZWwtcHJlc2V0LXJlYWN0JywgJ2JhYmVsLXBsdWdpbi10cmFuc2Zvcm0tYXN5bmMtdG8tZ2VuZXJhdG9yJywgJ2VsZWN0cm9uLWZvcmdlJ107XG5leHBvcnQgY29uc3QgZXhhY3REZXZEZXBzID0gWydlbGVjdHJvbi1wcmVidWlsdC1jb21waWxlJ107XG5leHBvcnQgY29uc3Qgc3RhbmRhcmREZXBzID0gWydzdGFuZGFyZCddO1xuZXhwb3J0IGNvbnN0IGFpcmJuYkRlcHMgPSBbJ2VzbGludEBeMycsICdlc2xpbnQtY29uZmlnLWFpcmJuYkBeMTUnLCAnZXNsaW50LXBsdWdpbi1pbXBvcnRAXjInLFxuICAnZXNsaW50LXBsdWdpbi1qc3gtYTExeUBeNScsICdlc2xpbnQtcGx1Z2luLXJlYWN0QF43J107XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChkaXIsIGxpbnRTdHlsZSkgPT4ge1xuICBhd2FpdCBhc3luY09yYSgnSW5pdGlhbGl6aW5nIE5QTSBNb2R1bGUnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04ocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3RtcGwnKSk7XG4gICAgcGFja2FnZUpTT04ucHJvZHVjdE5hbWUgPSBwYWNrYWdlSlNPTi5uYW1lID0gcGF0aC5iYXNlbmFtZShkaXIpLnRvTG93ZXJDYXNlKCk7XG4gICAgcGFja2FnZUpTT04uYXV0aG9yID0gYXdhaXQgdXNlcm5hbWUoKTtcbiAgICBzZXRJbml0aWFsRm9yZ2VDb25maWcocGFja2FnZUpTT04pO1xuXG4gICAgc3dpdGNoIChsaW50U3R5bGUpIHtcbiAgICAgIGNhc2UgJ3N0YW5kYXJkJzpcbiAgICAgICAgcGFja2FnZUpTT04uc2NyaXB0cy5saW50ID0gJ3N0YW5kYXJkJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhaXJibmInOlxuICAgICAgICBwYWNrYWdlSlNPTi5zY3JpcHRzLmxpbnQgPSAnZXNsaW50IHNyYyAtLWNvbG9yJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwYWNrYWdlSlNPTi5zY3JpcHRzLmxpbnQgPSAnZWNobyBcIk5vIGxpbnRpbmcgY29uZmlndXJlZFwiJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGQoJ3dyaXRpbmcgcGFja2FnZS5qc29uIHRvOicsIGRpcik7XG4gICAgYXdhaXQgZnMud3JpdGVKc29uKHBhdGgucmVzb2x2ZShkaXIsICdwYWNrYWdlLmpzb24nKSwgcGFja2FnZUpTT04sIHsgc3BhY2VzOiAyIH0pO1xuICB9KTtcblxuICBhd2FpdCBhc3luY09yYSgnSW5zdGFsbGluZyBOUE0gRGVwZW5kZW5jaWVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGQoJ2luc3RhbGxpbmcgZGVwZW5kZW5jaWVzJyk7XG4gICAgYXdhaXQgaW5zdGFsbERlcExpc3QoZGlyLCBkZXBzKTtcblxuICAgIGQoJ2luc3RhbGxpbmcgZGV2RGVwZW5kZW5jaWVzJyk7XG4gICAgYXdhaXQgaW5zdGFsbERlcExpc3QoZGlyLCBkZXZEZXBzLCB0cnVlKTtcblxuICAgIGQoJ2luc3RhbGxpbmcgZXhhY3QgZGVwZW5kZW5jaWVzJyk7XG4gICAgZm9yIChjb25zdCBwYWNrYWdlTmFtZSBvZiBleGFjdERldkRlcHMpIHtcbiAgICAgIGF3YWl0IGluc3RhbGxEZXBMaXN0KGRpciwgW3BhY2thZ2VOYW1lXSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc3dpdGNoIChsaW50U3R5bGUpIHtcbiAgICAgIGNhc2UgJ3N0YW5kYXJkJzpcbiAgICAgICAgZCgnaW5zdGFsbGluZyBzdGFuZGFyZCBsaW50aW5nIGRlcGVuZGVuY2llcycpO1xuICAgICAgICBhd2FpdCBpbnN0YWxsRGVwTGlzdChkaXIsIHN0YW5kYXJkRGVwcywgdHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWlyYm5iJzpcbiAgICAgICAgZCgnaW5zdGFsbGluZyBhaXJibmIgbGludGluZyBkZXBlbmRlbmNpZXMnKTtcbiAgICAgICAgYXdhaXQgaW5zdGFsbERlcExpc3QoZGlyLCBhaXJibmJEZXBzLCB0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBkKCdub3QgaW5zdGFsbGluZyBsaW50aW5nIGRlcHMnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gTkI6IEZvciBiYWJlbC1wcmVzZXQtZW52IHRvIHdvcmsgY29ycmVjdGx5LCBpdCBuZWVkcyB0byBrbm93IHRoZVxuICAgIC8vIGFjdHVhbCB2ZXJzaW9uIG9mIEVsZWN0cm9uIHRoYXQgd2UgaW5zdGFsbGVkXG4gICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnJlYWRKc29uKHBhdGguam9pbihkaXIsICcuY29tcGlsZXJjJyksICd1dGY4Jyk7XG4gICAgY29uc3QgZWxlY3Ryb25QcmVidWlsdCA9IHJlcXVpcmUoXG4gICAgICBwYXRoLmpvaW4oZGlyLCAnbm9kZV9tb2R1bGVzJywgJ2VsZWN0cm9uLXByZWJ1aWx0LWNvbXBpbGUnLCAncGFja2FnZS5qc29uJykpO1xuXG4gICAgZm9yIChjb25zdCBwcm9maWxlIG9mIFsnZGV2ZWxvcG1lbnQnLCAncHJvZHVjdGlvbiddKSB7XG4gICAgICBjb25zdCBlbnZUYXJnZXQgPSBjb250ZW50LmVudltwcm9maWxlXVsnYXBwbGljYXRpb24vamF2YXNjcmlwdCddLnByZXNldHMuZmluZCh4ID0+IHhbMF0gPT09ICdlbnYnKTtcbiAgICAgIC8vIHBhcnNlRmxvYXQgc3RyaXBzIHRoZSBwYXRjaCB2ZXJzaW9uXG4gICAgICAvLyBwYXJzZUZsb2F0KCcxLjMuMicpID09PSAxLjNcbiAgICAgIC8vIE5vdGU6IFRoaXMgd29uJ3Qgd29yayBpZiB0aGUgbWlub3IgdmVyc2lvbiBldmVyIGdldHMgaGlnaGVyIHRoYW4gOVxuICAgICAgZW52VGFyZ2V0WzFdLnRhcmdldHMuZWxlY3Ryb24gPSBwYXJzZUZsb2F0KGVsZWN0cm9uUHJlYnVpbHQudmVyc2lvbikudG9GaXhlZCgxKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGF3YWl0IGZzLndyaXRlSnNvbihwYXRoLmpvaW4oZGlyLCAnLmNvbXBpbGVyYycpLCBjb250ZW50LCB7IHNwYWNlczogMiB9KTtcbiAgfSk7XG59O1xuIl19