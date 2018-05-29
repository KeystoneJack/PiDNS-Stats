'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedOnCurrentPlatform = undefined;

var _bluebird = require('bluebird');

exports.rpmArch = rpmArch;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _ensureOutput = require('../../util/ensure-output');

var _isInstalled = require('../../util/is-installed');

var _isInstalled2 = _interopRequireDefault(_isInstalled);

var _linuxConfig = require('../../util/linux-config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isSupportedOnCurrentPlatform = exports.isSupportedOnCurrentPlatform = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return (0, _isInstalled2.default)('electron-installer-redhat');
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

function rpmArch(nodeArch) {
  switch (nodeArch) {
    case 'ia32':
      return 'i386';
    case 'x64':
      return 'x86_64';
    case 'armv7l':
      return 'armv7hl';
    case 'arm':
      return 'armv6hl';
    default:
      return nodeArch;
  }
}

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* ({ dir, targetArch, forgeConfig, packageJSON }) {
    const installer = require('electron-installer-redhat');

    const arch = rpmArch(targetArch);
    const config = (0, _linuxConfig.populateConfig)({ forgeConfig, configKey: 'electronInstallerRedhat', targetArch });
    const name = config.options.name || packageJSON.name;
    const versionedName = `${name}-${packageJSON.version}.${arch}`;
    const outPath = _path2.default.resolve(dir, '../make', `${versionedName}.rpm`);

    yield (0, _ensureOutput.ensureFile)(outPath);
    const rpmConfig = (0, _linuxConfig.linuxConfig)({
      config,
      pkgArch: arch,
      dir,
      outPath
    });

    yield (0, _pify2.default)(installer)(rpmConfig);
    return [outPath];
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy9saW51eC9ycG0uanMiXSwibmFtZXMiOlsicnBtQXJjaCIsImlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0iLCJub2RlQXJjaCIsImRpciIsInRhcmdldEFyY2giLCJmb3JnZUNvbmZpZyIsInBhY2thZ2VKU09OIiwiaW5zdGFsbGVyIiwicmVxdWlyZSIsImFyY2giLCJjb25maWciLCJjb25maWdLZXkiLCJuYW1lIiwib3B0aW9ucyIsInZlcnNpb25lZE5hbWUiLCJ2ZXJzaW9uIiwib3V0UGF0aCIsInBhdGgiLCJyZXNvbHZlIiwicnBtQ29uZmlnIiwicGtnQXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBU2dCQSxPLEdBQUFBLE87O0FBVGhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBRU8sTUFBTUM7QUFBQSxzQ0FBK0I7QUFBQSxXQUFZLDJCQUFZLDJCQUFaLENBQVo7QUFBQSxHQUEvQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFOOztBQUVBLFNBQVNELE9BQVQsQ0FBaUJFLFFBQWpCLEVBQTJCO0FBQ2hDLFVBQVFBLFFBQVI7QUFDRSxTQUFLLE1BQUw7QUFBYSxhQUFPLE1BQVA7QUFDYixTQUFLLEtBQUw7QUFBWSxhQUFPLFFBQVA7QUFDWixTQUFLLFFBQUw7QUFBZSxhQUFPLFNBQVA7QUFDZixTQUFLLEtBQUw7QUFBWSxhQUFPLFNBQVA7QUFDWjtBQUFTLGFBQU9BLFFBQVA7QUFMWDtBQU9EOzs7dUNBRWMsV0FBTyxFQUFFQyxHQUFGLEVBQU9DLFVBQVAsRUFBbUJDLFdBQW5CLEVBQWdDQyxXQUFoQyxFQUFQLEVBQXlEO0FBQ3RFLFVBQU1DLFlBQVlDLFFBQVEsMkJBQVIsQ0FBbEI7O0FBRUEsVUFBTUMsT0FBT1QsUUFBUUksVUFBUixDQUFiO0FBQ0EsVUFBTU0sU0FBUyxpQ0FBZSxFQUFFTCxXQUFGLEVBQWVNLFdBQVcseUJBQTFCLEVBQXFEUCxVQUFyRCxFQUFmLENBQWY7QUFDQSxVQUFNUSxPQUFPRixPQUFPRyxPQUFQLENBQWVELElBQWYsSUFBdUJOLFlBQVlNLElBQWhEO0FBQ0EsVUFBTUUsZ0JBQWlCLEdBQUVGLElBQUssSUFBR04sWUFBWVMsT0FBUSxJQUFHTixJQUFLLEVBQTdEO0FBQ0EsVUFBTU8sVUFBVUMsZUFBS0MsT0FBTCxDQUFhZixHQUFiLEVBQWtCLFNBQWxCLEVBQThCLEdBQUVXLGFBQWMsTUFBOUMsQ0FBaEI7O0FBRUEsVUFBTSw4QkFBV0UsT0FBWCxDQUFOO0FBQ0EsVUFBTUcsWUFBWSw4QkFBWTtBQUM1QlQsWUFENEI7QUFFNUJVLGVBQVNYLElBRm1CO0FBRzVCTixTQUg0QjtBQUk1QmE7QUFKNEIsS0FBWixDQUFsQjs7QUFPQSxVQUFNLG9CQUFLVCxTQUFMLEVBQWdCWSxTQUFoQixDQUFOO0FBQ0EsV0FBTyxDQUFDSCxPQUFELENBQVA7QUFDRCxHIiwiZmlsZSI6Im1ha2Vycy9saW51eC9ycG0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuXG5pbXBvcnQgeyBlbnN1cmVGaWxlIH0gZnJvbSAnLi4vLi4vdXRpbC9lbnN1cmUtb3V0cHV0JztcbmltcG9ydCBpc0luc3RhbGxlZCBmcm9tICcuLi8uLi91dGlsL2lzLWluc3RhbGxlZCc7XG5pbXBvcnQgeyBsaW51eENvbmZpZywgcG9wdWxhdGVDb25maWcgfSBmcm9tICcuLi8uLi91dGlsL2xpbnV4LWNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBpc1N1cHBvcnRlZE9uQ3VycmVudFBsYXRmb3JtID0gYXN5bmMgKCkgPT4gaXNJbnN0YWxsZWQoJ2VsZWN0cm9uLWluc3RhbGxlci1yZWRoYXQnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJwbUFyY2gobm9kZUFyY2gpIHtcbiAgc3dpdGNoIChub2RlQXJjaCkge1xuICAgIGNhc2UgJ2lhMzInOiByZXR1cm4gJ2kzODYnO1xuICAgIGNhc2UgJ3g2NCc6IHJldHVybiAneDg2XzY0JztcbiAgICBjYXNlICdhcm12N2wnOiByZXR1cm4gJ2FybXY3aGwnO1xuICAgIGNhc2UgJ2FybSc6IHJldHVybiAnYXJtdjZobCc7XG4gICAgZGVmYXVsdDogcmV0dXJuIG5vZGVBcmNoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICh7IGRpciwgdGFyZ2V0QXJjaCwgZm9yZ2VDb25maWcsIHBhY2thZ2VKU09OIH0pID0+IHtcbiAgY29uc3QgaW5zdGFsbGVyID0gcmVxdWlyZSgnZWxlY3Ryb24taW5zdGFsbGVyLXJlZGhhdCcpO1xuXG4gIGNvbnN0IGFyY2ggPSBycG1BcmNoKHRhcmdldEFyY2gpO1xuICBjb25zdCBjb25maWcgPSBwb3B1bGF0ZUNvbmZpZyh7IGZvcmdlQ29uZmlnLCBjb25maWdLZXk6ICdlbGVjdHJvbkluc3RhbGxlclJlZGhhdCcsIHRhcmdldEFyY2ggfSk7XG4gIGNvbnN0IG5hbWUgPSBjb25maWcub3B0aW9ucy5uYW1lIHx8IHBhY2thZ2VKU09OLm5hbWU7XG4gIGNvbnN0IHZlcnNpb25lZE5hbWUgPSBgJHtuYW1lfS0ke3BhY2thZ2VKU09OLnZlcnNpb259LiR7YXJjaH1gO1xuICBjb25zdCBvdXRQYXRoID0gcGF0aC5yZXNvbHZlKGRpciwgJy4uL21ha2UnLCBgJHt2ZXJzaW9uZWROYW1lfS5ycG1gKTtcblxuICBhd2FpdCBlbnN1cmVGaWxlKG91dFBhdGgpO1xuICBjb25zdCBycG1Db25maWcgPSBsaW51eENvbmZpZyh7XG4gICAgY29uZmlnLFxuICAgIHBrZ0FyY2g6IGFyY2gsXG4gICAgZGlyLFxuICAgIG91dFBhdGgsXG4gIH0pO1xuXG4gIGF3YWl0IHBpZnkoaW5zdGFsbGVyKShycG1Db25maWcpO1xuICByZXR1cm4gW291dFBhdGhdO1xufTtcbiJdfQ==