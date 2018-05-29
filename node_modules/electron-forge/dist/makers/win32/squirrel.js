'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedOnCurrentPlatform = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ensureOutput = require('../../util/ensure-output');

var _configFn = require('../../util/config-fn');

var _configFn2 = _interopRequireDefault(_configFn);

var _isInstalled = require('../../util/is-installed');

var _isInstalled2 = _interopRequireDefault(_isInstalled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isSupportedOnCurrentPlatform = exports.isSupportedOnCurrentPlatform = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return (0, _isInstalled2.default)('electron-winstaller');
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* ({ dir, appName, targetArch, forgeConfig, packageJSON }) {
    var _require = require('electron-winstaller');

    const createWindowsInstaller = _require.createWindowsInstaller;


    const outPath = _path2.default.resolve(dir, `../make/squirrel.windows/${targetArch}`);
    yield (0, _ensureOutput.ensureDirectory)(outPath);

    const winstallerConfig = (0, _assign2.default)({
      name: appName,
      noMsi: true,
      exe: `${appName}.exe`,
      setupExe: `${appName}-${packageJSON.version} Setup.exe`
    }, (0, _configFn2.default)(forgeConfig.electronWinstallerConfig, targetArch), {
      appDirectory: dir,
      outputDirectory: outPath
    });

    yield createWindowsInstaller(winstallerConfig);

    const artifacts = [_path2.default.resolve(outPath, 'RELEASES'), _path2.default.resolve(outPath, winstallerConfig.setupExe || `${appName}Setup.exe`), _path2.default.resolve(outPath, `${winstallerConfig.name}-${packageJSON.version}-full.nupkg`)];
    const deltaPath = _path2.default.resolve(outPath, `${winstallerConfig.name}-${packageJSON.version}-delta.nupkg`);
    if (winstallerConfig.remoteReleases || (yield _fsExtra2.default.pathExists(deltaPath))) {
      artifacts.push(deltaPath);
    }
    const msiPath = _path2.default.resolve(outPath, winstallerConfig.setupMsi || `${appName}Setup.msi`);
    if (!winstallerConfig.noMsi && (yield _fsExtra2.default.pathExists(msiPath))) {
      artifacts.push(msiPath);
    }
    return artifacts;
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy93aW4zMi9zcXVpcnJlbC5qcyJdLCJuYW1lcyI6WyJpc1N1cHBvcnRlZE9uQ3VycmVudFBsYXRmb3JtIiwiZGlyIiwiYXBwTmFtZSIsInRhcmdldEFyY2giLCJmb3JnZUNvbmZpZyIsInBhY2thZ2VKU09OIiwicmVxdWlyZSIsImNyZWF0ZVdpbmRvd3NJbnN0YWxsZXIiLCJvdXRQYXRoIiwicGF0aCIsInJlc29sdmUiLCJ3aW5zdGFsbGVyQ29uZmlnIiwibmFtZSIsIm5vTXNpIiwiZXhlIiwic2V0dXBFeGUiLCJ2ZXJzaW9uIiwiZWxlY3Ryb25XaW5zdGFsbGVyQ29uZmlnIiwiYXBwRGlyZWN0b3J5Iiwib3V0cHV0RGlyZWN0b3J5IiwiYXJ0aWZhY3RzIiwiZGVsdGFQYXRoIiwicmVtb3RlUmVsZWFzZXMiLCJmcyIsInBhdGhFeGlzdHMiLCJwdXNoIiwibXNpUGF0aCIsInNldHVwTXNpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLE1BQU1BO0FBQUEsc0NBQStCO0FBQUEsV0FBWSwyQkFBWSxxQkFBWixDQUFaO0FBQUEsR0FBL0I7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7O3VDQUVRLFdBQU8sRUFBRUMsR0FBRixFQUFPQyxPQUFQLEVBQWdCQyxVQUFoQixFQUE0QkMsV0FBNUIsRUFBeUNDLFdBQXpDLEVBQVAsRUFBa0U7QUFBQSxtQkFDNUNDLFFBQVEscUJBQVIsQ0FENEM7O0FBQUEsVUFDdkVDLHNCQUR1RSxZQUN2RUEsc0JBRHVFOzs7QUFHL0UsVUFBTUMsVUFBVUMsZUFBS0MsT0FBTCxDQUFhVCxHQUFiLEVBQW1CLDRCQUEyQkUsVUFBVyxFQUF6RCxDQUFoQjtBQUNBLFVBQU0sbUNBQWdCSyxPQUFoQixDQUFOOztBQUVBLFVBQU1HLG1CQUFtQixzQkFBYztBQUNyQ0MsWUFBTVYsT0FEK0I7QUFFckNXLGFBQU8sSUFGOEI7QUFHckNDLFdBQU0sR0FBRVosT0FBUSxNQUhxQjtBQUlyQ2EsZ0JBQVcsR0FBRWIsT0FBUSxJQUFHRyxZQUFZVyxPQUFRO0FBSlAsS0FBZCxFQUt0Qix3QkFBU1osWUFBWWEsd0JBQXJCLEVBQStDZCxVQUEvQyxDQUxzQixFQUtzQztBQUM3RGUsb0JBQWNqQixHQUQrQztBQUU3RGtCLHVCQUFpQlg7QUFGNEMsS0FMdEMsQ0FBekI7O0FBVUEsVUFBTUQsdUJBQXVCSSxnQkFBdkIsQ0FBTjs7QUFFQSxVQUFNUyxZQUFZLENBQ2hCWCxlQUFLQyxPQUFMLENBQWFGLE9BQWIsRUFBc0IsVUFBdEIsQ0FEZ0IsRUFFaEJDLGVBQUtDLE9BQUwsQ0FBYUYsT0FBYixFQUFzQkcsaUJBQWlCSSxRQUFqQixJQUE4QixHQUFFYixPQUFRLFdBQTlELENBRmdCLEVBR2hCTyxlQUFLQyxPQUFMLENBQWFGLE9BQWIsRUFBdUIsR0FBRUcsaUJBQWlCQyxJQUFLLElBQUdQLFlBQVlXLE9BQVEsYUFBdEUsQ0FIZ0IsQ0FBbEI7QUFLQSxVQUFNSyxZQUFZWixlQUFLQyxPQUFMLENBQWFGLE9BQWIsRUFBdUIsR0FBRUcsaUJBQWlCQyxJQUFLLElBQUdQLFlBQVlXLE9BQVEsY0FBdEUsQ0FBbEI7QUFDQSxRQUFJTCxpQkFBaUJXLGNBQWpCLEtBQW1DLE1BQU1DLGtCQUFHQyxVQUFILENBQWNILFNBQWQsQ0FBekMsQ0FBSixFQUF1RTtBQUNyRUQsZ0JBQVVLLElBQVYsQ0FBZUosU0FBZjtBQUNEO0FBQ0QsVUFBTUssVUFBVWpCLGVBQUtDLE9BQUwsQ0FBYUYsT0FBYixFQUFzQkcsaUJBQWlCZ0IsUUFBakIsSUFBOEIsR0FBRXpCLE9BQVEsV0FBOUQsQ0FBaEI7QUFDQSxRQUFJLENBQUNTLGlCQUFpQkUsS0FBbEIsS0FBMkIsTUFBTVUsa0JBQUdDLFVBQUgsQ0FBY0UsT0FBZCxDQUFqQyxDQUFKLEVBQTZEO0FBQzNETixnQkFBVUssSUFBVixDQUFlQyxPQUFmO0FBQ0Q7QUFDRCxXQUFPTixTQUFQO0FBQ0QsRyIsImZpbGUiOiJtYWtlcnMvd2luMzIvc3F1aXJyZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IGVuc3VyZURpcmVjdG9yeSB9IGZyb20gJy4uLy4uL3V0aWwvZW5zdXJlLW91dHB1dCc7XG5pbXBvcnQgY29uZmlnRm4gZnJvbSAnLi4vLi4vdXRpbC9jb25maWctZm4nO1xuaW1wb3J0IGlzSW5zdGFsbGVkIGZyb20gJy4uLy4uL3V0aWwvaXMtaW5zdGFsbGVkJztcblxuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0gPSBhc3luYyAoKSA9PiBpc0luc3RhbGxlZCgnZWxlY3Ryb24td2luc3RhbGxlcicpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBkaXIsIGFwcE5hbWUsIHRhcmdldEFyY2gsIGZvcmdlQ29uZmlnLCBwYWNrYWdlSlNPTiB9KSA9PiB7XG4gIGNvbnN0IHsgY3JlYXRlV2luZG93c0luc3RhbGxlciB9ID0gcmVxdWlyZSgnZWxlY3Ryb24td2luc3RhbGxlcicpO1xuXG4gIGNvbnN0IG91dFBhdGggPSBwYXRoLnJlc29sdmUoZGlyLCBgLi4vbWFrZS9zcXVpcnJlbC53aW5kb3dzLyR7dGFyZ2V0QXJjaH1gKTtcbiAgYXdhaXQgZW5zdXJlRGlyZWN0b3J5KG91dFBhdGgpO1xuXG4gIGNvbnN0IHdpbnN0YWxsZXJDb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICBuYW1lOiBhcHBOYW1lLFxuICAgIG5vTXNpOiB0cnVlLFxuICAgIGV4ZTogYCR7YXBwTmFtZX0uZXhlYCxcbiAgICBzZXR1cEV4ZTogYCR7YXBwTmFtZX0tJHtwYWNrYWdlSlNPTi52ZXJzaW9ufSBTZXR1cC5leGVgLFxuICB9LCBjb25maWdGbihmb3JnZUNvbmZpZy5lbGVjdHJvbldpbnN0YWxsZXJDb25maWcsIHRhcmdldEFyY2gpLCB7XG4gICAgYXBwRGlyZWN0b3J5OiBkaXIsXG4gICAgb3V0cHV0RGlyZWN0b3J5OiBvdXRQYXRoLFxuICB9KTtcblxuICBhd2FpdCBjcmVhdGVXaW5kb3dzSW5zdGFsbGVyKHdpbnN0YWxsZXJDb25maWcpO1xuXG4gIGNvbnN0IGFydGlmYWN0cyA9IFtcbiAgICBwYXRoLnJlc29sdmUob3V0UGF0aCwgJ1JFTEVBU0VTJyksXG4gICAgcGF0aC5yZXNvbHZlKG91dFBhdGgsIHdpbnN0YWxsZXJDb25maWcuc2V0dXBFeGUgfHwgYCR7YXBwTmFtZX1TZXR1cC5leGVgKSxcbiAgICBwYXRoLnJlc29sdmUob3V0UGF0aCwgYCR7d2luc3RhbGxlckNvbmZpZy5uYW1lfS0ke3BhY2thZ2VKU09OLnZlcnNpb259LWZ1bGwubnVwa2dgKSxcbiAgXTtcbiAgY29uc3QgZGVsdGFQYXRoID0gcGF0aC5yZXNvbHZlKG91dFBhdGgsIGAke3dpbnN0YWxsZXJDb25maWcubmFtZX0tJHtwYWNrYWdlSlNPTi52ZXJzaW9ufS1kZWx0YS5udXBrZ2ApO1xuICBpZiAod2luc3RhbGxlckNvbmZpZy5yZW1vdGVSZWxlYXNlcyB8fCBhd2FpdCBmcy5wYXRoRXhpc3RzKGRlbHRhUGF0aCkpIHtcbiAgICBhcnRpZmFjdHMucHVzaChkZWx0YVBhdGgpO1xuICB9XG4gIGNvbnN0IG1zaVBhdGggPSBwYXRoLnJlc29sdmUob3V0UGF0aCwgd2luc3RhbGxlckNvbmZpZy5zZXR1cE1zaSB8fCBgJHthcHBOYW1lfVNldHVwLm1zaWApO1xuICBpZiAoIXdpbnN0YWxsZXJDb25maWcubm9Nc2kgJiYgYXdhaXQgZnMucGF0aEV4aXN0cyhtc2lQYXRoKSkge1xuICAgIGFydGlmYWN0cy5wdXNoKG1zaVBhdGgpO1xuICB9XG4gIHJldHVybiBhcnRpZmFjdHM7XG59O1xuIl19