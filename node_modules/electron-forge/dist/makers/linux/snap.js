'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedOnCurrentPlatform = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ensureOutput = require('../../util/ensure-output');

var _configFn = require('../../util/config-fn');

var _configFn2 = _interopRequireDefault(_configFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isSupportedOnCurrentPlatform = exports.isSupportedOnCurrentPlatform = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return process.platform === 'linux';
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* ({ dir, targetArch, forgeConfig }) {
    const installer = require('electron-installer-snap');

    const outPath = _path2.default.resolve(dir, '../make');

    yield (0, _ensureOutput.ensureDirectory)(outPath);
    const snapDefaults = {
      arch: targetArch,
      dest: outPath,
      src: dir
    };
    const snapConfig = (0, _assign2.default)({}, (0, _configFn2.default)(forgeConfig.electronInstallerSnap, targetArch), snapDefaults);

    return [yield installer(snapConfig)];
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy9saW51eC9zbmFwLmpzIl0sIm5hbWVzIjpbImlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0iLCJwcm9jZXNzIiwicGxhdGZvcm0iLCJkaXIiLCJ0YXJnZXRBcmNoIiwiZm9yZ2VDb25maWciLCJpbnN0YWxsZXIiLCJyZXF1aXJlIiwib3V0UGF0aCIsInBhdGgiLCJyZXNvbHZlIiwic25hcERlZmF1bHRzIiwiYXJjaCIsImRlc3QiLCJzcmMiLCJzbmFwQ29uZmlnIiwiZWxlY3Ryb25JbnN0YWxsZXJTbmFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7O0FBRU8sTUFBTUE7QUFBQSxzQ0FBK0I7QUFBQSxXQUFZQyxRQUFRQyxRQUFSLEtBQXFCLE9BQWpDO0FBQUEsR0FBL0I7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7O3VDQUVRLFdBQU8sRUFBRUMsR0FBRixFQUFPQyxVQUFQLEVBQW1CQyxXQUFuQixFQUFQLEVBQTRDO0FBQ3pELFVBQU1DLFlBQVlDLFFBQVEseUJBQVIsQ0FBbEI7O0FBRUEsVUFBTUMsVUFBVUMsZUFBS0MsT0FBTCxDQUFhUCxHQUFiLEVBQWtCLFNBQWxCLENBQWhCOztBQUVBLFVBQU0sbUNBQWdCSyxPQUFoQixDQUFOO0FBQ0EsVUFBTUcsZUFBZTtBQUNuQkMsWUFBTVIsVUFEYTtBQUVuQlMsWUFBTUwsT0FGYTtBQUduQk0sV0FBS1g7QUFIYyxLQUFyQjtBQUtBLFVBQU1ZLGFBQWEsc0JBQWMsRUFBZCxFQUFrQix3QkFBU1YsWUFBWVcscUJBQXJCLEVBQTRDWixVQUE1QyxDQUFsQixFQUEyRU8sWUFBM0UsQ0FBbkI7O0FBRUEsV0FBTyxDQUFDLE1BQU1MLFVBQVVTLFVBQVYsQ0FBUCxDQUFQO0FBQ0QsRyIsImZpbGUiOiJtYWtlcnMvbGludXgvc25hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBlbnN1cmVEaXJlY3RvcnkgfSBmcm9tICcuLi8uLi91dGlsL2Vuc3VyZS1vdXRwdXQnO1xuaW1wb3J0IGNvbmZpZ0ZuIGZyb20gJy4uLy4uL3V0aWwvY29uZmlnLWZuJztcblxuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0gPSBhc3luYyAoKSA9PiBwcm9jZXNzLnBsYXRmb3JtID09PSAnbGludXgnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBkaXIsIHRhcmdldEFyY2gsIGZvcmdlQ29uZmlnIH0pID0+IHtcbiAgY29uc3QgaW5zdGFsbGVyID0gcmVxdWlyZSgnZWxlY3Ryb24taW5zdGFsbGVyLXNuYXAnKTtcblxuICBjb25zdCBvdXRQYXRoID0gcGF0aC5yZXNvbHZlKGRpciwgJy4uL21ha2UnKTtcblxuICBhd2FpdCBlbnN1cmVEaXJlY3Rvcnkob3V0UGF0aCk7XG4gIGNvbnN0IHNuYXBEZWZhdWx0cyA9IHtcbiAgICBhcmNoOiB0YXJnZXRBcmNoLFxuICAgIGRlc3Q6IG91dFBhdGgsXG4gICAgc3JjOiBkaXIsXG4gIH07XG4gIGNvbnN0IHNuYXBDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdGbihmb3JnZUNvbmZpZy5lbGVjdHJvbkluc3RhbGxlclNuYXAsIHRhcmdldEFyY2gpLCBzbmFwRGVmYXVsdHMpO1xuXG4gIHJldHVybiBbYXdhaXQgaW5zdGFsbGVyKHNuYXBDb25maWcpXTtcbn07XG4iXX0=