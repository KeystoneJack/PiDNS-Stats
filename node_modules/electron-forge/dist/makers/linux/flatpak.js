'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedOnCurrentPlatform = undefined;

var _bluebird = require('bluebird');

exports.flatpakArch = flatpakArch;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

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
    return (0, _isInstalled2.default)('electron-installer-flatpak');
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

function flatpakArch(nodeArch) {
  switch (nodeArch) {
    case 'ia32':
      return 'i386';
    case 'x64':
      return 'x86_64';
    case 'armv7l':
      return 'arm';
    // arm => arm
    default:
      return nodeArch;
  }
}

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* ({ dir, targetArch, forgeConfig }) {
    const installer = require('electron-installer-flatpak');

    const arch = flatpakArch(targetArch);
    const config = (0, _linuxConfig.populateConfig)({ forgeConfig, configKey: 'electronInstallerFlatpak', targetArch });
    const outDir = _path2.default.resolve(dir, '../make');

    yield (0, _ensureOutput.ensureDirectory)(outDir);
    const flatpakConfig = (0, _linuxConfig.linuxConfig)({
      config,
      pkgArch: arch,
      dir,
      // electron-installer-flatpak uses a filename scheme with default config options that we don't
      // have access to, so we need to detect the flatpak filename after it's created.
      outPath: _path2.default.join(outDir, 'dummy.flatpak')
    });

    yield (0, _pify2.default)(installer)(flatpakConfig);

    return (yield _fsExtra2.default.readdir(outDir)).filter(function (basename) {
      return basename.endsWith('.flatpak');
    }).map(function (basename) {
      return _path2.default.join(outDir, basename);
    });
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy9saW51eC9mbGF0cGFrLmpzIl0sIm5hbWVzIjpbImZsYXRwYWtBcmNoIiwiaXNTdXBwb3J0ZWRPbkN1cnJlbnRQbGF0Zm9ybSIsIm5vZGVBcmNoIiwiZGlyIiwidGFyZ2V0QXJjaCIsImZvcmdlQ29uZmlnIiwiaW5zdGFsbGVyIiwicmVxdWlyZSIsImFyY2giLCJjb25maWciLCJjb25maWdLZXkiLCJvdXREaXIiLCJwYXRoIiwicmVzb2x2ZSIsImZsYXRwYWtDb25maWciLCJwa2dBcmNoIiwib3V0UGF0aCIsImpvaW4iLCJmcyIsInJlYWRkaXIiLCJmaWx0ZXIiLCJiYXNlbmFtZSIsImVuZHNXaXRoIiwibWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFVZ0JBLFcsR0FBQUEsVzs7QUFWaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUVPLE1BQU1DO0FBQUEsc0NBQStCO0FBQUEsV0FBWSwyQkFBWSw0QkFBWixDQUFaO0FBQUEsR0FBL0I7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7QUFFQSxTQUFTRCxXQUFULENBQXFCRSxRQUFyQixFQUErQjtBQUNwQyxVQUFRQSxRQUFSO0FBQ0UsU0FBSyxNQUFMO0FBQWEsYUFBTyxNQUFQO0FBQ2IsU0FBSyxLQUFMO0FBQVksYUFBTyxRQUFQO0FBQ1osU0FBSyxRQUFMO0FBQWUsYUFBTyxLQUFQO0FBQ2Y7QUFDQTtBQUFTLGFBQU9BLFFBQVA7QUFMWDtBQU9EOzs7dUNBRWMsV0FBTyxFQUFFQyxHQUFGLEVBQU9DLFVBQVAsRUFBbUJDLFdBQW5CLEVBQVAsRUFBNEM7QUFDekQsVUFBTUMsWUFBWUMsUUFBUSw0QkFBUixDQUFsQjs7QUFFQSxVQUFNQyxPQUFPUixZQUFZSSxVQUFaLENBQWI7QUFDQSxVQUFNSyxTQUFTLGlDQUFlLEVBQUVKLFdBQUYsRUFBZUssV0FBVywwQkFBMUIsRUFBc0ROLFVBQXRELEVBQWYsQ0FBZjtBQUNBLFVBQU1PLFNBQVNDLGVBQUtDLE9BQUwsQ0FBYVYsR0FBYixFQUFrQixTQUFsQixDQUFmOztBQUVBLFVBQU0sbUNBQWdCUSxNQUFoQixDQUFOO0FBQ0EsVUFBTUcsZ0JBQWdCLDhCQUFZO0FBQ2hDTCxZQURnQztBQUVoQ00sZUFBU1AsSUFGdUI7QUFHaENMLFNBSGdDO0FBSWhDO0FBQ0E7QUFDQWEsZUFBU0osZUFBS0ssSUFBTCxDQUFVTixNQUFWLEVBQWtCLGVBQWxCO0FBTnVCLEtBQVosQ0FBdEI7O0FBU0EsVUFBTSxvQkFBS0wsU0FBTCxFQUFnQlEsYUFBaEIsQ0FBTjs7QUFFQSxXQUFPLENBQUMsTUFBTUksa0JBQUdDLE9BQUgsQ0FBV1IsTUFBWCxDQUFQLEVBQ0pTLE1BREksQ0FDRztBQUFBLGFBQVlDLFNBQVNDLFFBQVQsQ0FBa0IsVUFBbEIsQ0FBWjtBQUFBLEtBREgsRUFFSkMsR0FGSSxDQUVBO0FBQUEsYUFBWVgsZUFBS0ssSUFBTCxDQUFVTixNQUFWLEVBQWtCVSxRQUFsQixDQUFaO0FBQUEsS0FGQSxDQUFQO0FBR0QsRyIsImZpbGUiOiJtYWtlcnMvbGludXgvZmxhdHBhay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuXG5pbXBvcnQgeyBlbnN1cmVEaXJlY3RvcnkgfSBmcm9tICcuLi8uLi91dGlsL2Vuc3VyZS1vdXRwdXQnO1xuaW1wb3J0IGlzSW5zdGFsbGVkIGZyb20gJy4uLy4uL3V0aWwvaXMtaW5zdGFsbGVkJztcbmltcG9ydCB7IGxpbnV4Q29uZmlnLCBwb3B1bGF0ZUNvbmZpZyB9IGZyb20gJy4uLy4uL3V0aWwvbGludXgtY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0gPSBhc3luYyAoKSA9PiBpc0luc3RhbGxlZCgnZWxlY3Ryb24taW5zdGFsbGVyLWZsYXRwYWsnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXRwYWtBcmNoKG5vZGVBcmNoKSB7XG4gIHN3aXRjaCAobm9kZUFyY2gpIHtcbiAgICBjYXNlICdpYTMyJzogcmV0dXJuICdpMzg2JztcbiAgICBjYXNlICd4NjQnOiByZXR1cm4gJ3g4Nl82NCc7XG4gICAgY2FzZSAnYXJtdjdsJzogcmV0dXJuICdhcm0nO1xuICAgIC8vIGFybSA9PiBhcm1cbiAgICBkZWZhdWx0OiByZXR1cm4gbm9kZUFyY2g7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHsgZGlyLCB0YXJnZXRBcmNoLCBmb3JnZUNvbmZpZyB9KSA9PiB7XG4gIGNvbnN0IGluc3RhbGxlciA9IHJlcXVpcmUoJ2VsZWN0cm9uLWluc3RhbGxlci1mbGF0cGFrJyk7XG5cbiAgY29uc3QgYXJjaCA9IGZsYXRwYWtBcmNoKHRhcmdldEFyY2gpO1xuICBjb25zdCBjb25maWcgPSBwb3B1bGF0ZUNvbmZpZyh7IGZvcmdlQ29uZmlnLCBjb25maWdLZXk6ICdlbGVjdHJvbkluc3RhbGxlckZsYXRwYWsnLCB0YXJnZXRBcmNoIH0pO1xuICBjb25zdCBvdXREaXIgPSBwYXRoLnJlc29sdmUoZGlyLCAnLi4vbWFrZScpO1xuXG4gIGF3YWl0IGVuc3VyZURpcmVjdG9yeShvdXREaXIpO1xuICBjb25zdCBmbGF0cGFrQ29uZmlnID0gbGludXhDb25maWcoe1xuICAgIGNvbmZpZyxcbiAgICBwa2dBcmNoOiBhcmNoLFxuICAgIGRpcixcbiAgICAvLyBlbGVjdHJvbi1pbnN0YWxsZXItZmxhdHBhayB1c2VzIGEgZmlsZW5hbWUgc2NoZW1lIHdpdGggZGVmYXVsdCBjb25maWcgb3B0aW9ucyB0aGF0IHdlIGRvbid0XG4gICAgLy8gaGF2ZSBhY2Nlc3MgdG8sIHNvIHdlIG5lZWQgdG8gZGV0ZWN0IHRoZSBmbGF0cGFrIGZpbGVuYW1lIGFmdGVyIGl0J3MgY3JlYXRlZC5cbiAgICBvdXRQYXRoOiBwYXRoLmpvaW4ob3V0RGlyLCAnZHVtbXkuZmxhdHBhaycpLFxuICB9KTtcblxuICBhd2FpdCBwaWZ5KGluc3RhbGxlcikoZmxhdHBha0NvbmZpZyk7XG5cbiAgcmV0dXJuIChhd2FpdCBmcy5yZWFkZGlyKG91dERpcikpXG4gICAgLmZpbHRlcihiYXNlbmFtZSA9PiBiYXNlbmFtZS5lbmRzV2l0aCgnLmZsYXRwYWsnKSlcbiAgICAubWFwKGJhc2VuYW1lID0+IHBhdGguam9pbihvdXREaXIsIGJhc2VuYW1lKSk7XG59O1xuIl19