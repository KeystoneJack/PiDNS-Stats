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

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _ensureOutput = require('../../util/ensure-output');

var _configFn = require('../../util/config-fn');

var _configFn2 = _interopRequireDefault(_configFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// electron-installer-dmg doesn't set its 'os' field even though it depends on
// appdmg, which is darwin-only
const isSupportedOnCurrentPlatform = exports.isSupportedOnCurrentPlatform = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return process.platform === 'darwin';
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* ({ dir, appName, targetArch, forgeConfig, packageJSON }) {
    const electronDMG = require('electron-installer-dmg');

    const userConfig = (0, _configFn2.default)(forgeConfig.electronInstallerDMG, targetArch);

    const outPath = _path2.default.resolve(dir, '../make', `${userConfig.name || appName}.dmg`);
    const wantedOutPath = _path2.default.resolve(dir, '../make', `${appName}-${packageJSON.version}.dmg`);
    yield (0, _ensureOutput.ensureFile)(outPath);
    const dmgConfig = (0, _assign2.default)({
      overwrite: true,
      name: appName
    }, userConfig, {
      appPath: _path2.default.resolve(dir, `${appName}.app`),
      out: _path2.default.dirname(outPath)
    });
    yield (0, _pify2.default)(electronDMG)(dmgConfig);
    if (!userConfig.name) {
      yield _fsExtra2.default.rename(outPath, wantedOutPath);
    }
    return [wantedOutPath];
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy9kYXJ3aW4vZG1nLmpzIl0sIm5hbWVzIjpbImlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0iLCJwcm9jZXNzIiwicGxhdGZvcm0iLCJkaXIiLCJhcHBOYW1lIiwidGFyZ2V0QXJjaCIsImZvcmdlQ29uZmlnIiwicGFja2FnZUpTT04iLCJlbGVjdHJvbkRNRyIsInJlcXVpcmUiLCJ1c2VyQ29uZmlnIiwiZWxlY3Ryb25JbnN0YWxsZXJETUciLCJvdXRQYXRoIiwicGF0aCIsInJlc29sdmUiLCJuYW1lIiwid2FudGVkT3V0UGF0aCIsInZlcnNpb24iLCJkbWdDb25maWciLCJvdmVyd3JpdGUiLCJhcHBQYXRoIiwib3V0IiwiZGlybmFtZSIsImZzIiwicmVuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDTyxNQUFNQTtBQUFBLHNDQUErQjtBQUFBLFdBQVlDLFFBQVFDLFFBQVIsS0FBcUIsUUFBakM7QUFBQSxHQUEvQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFOOzs7dUNBRVEsV0FBTyxFQUFFQyxHQUFGLEVBQU9DLE9BQVAsRUFBZ0JDLFVBQWhCLEVBQTRCQyxXQUE1QixFQUF5Q0MsV0FBekMsRUFBUCxFQUFrRTtBQUMvRSxVQUFNQyxjQUFjQyxRQUFRLHdCQUFSLENBQXBCOztBQUVBLFVBQU1DLGFBQWEsd0JBQVNKLFlBQVlLLG9CQUFyQixFQUEyQ04sVUFBM0MsQ0FBbkI7O0FBRUEsVUFBTU8sVUFBVUMsZUFBS0MsT0FBTCxDQUFhWCxHQUFiLEVBQWtCLFNBQWxCLEVBQThCLEdBQUVPLFdBQVdLLElBQVgsSUFBbUJYLE9BQVEsTUFBM0QsQ0FBaEI7QUFDQSxVQUFNWSxnQkFBZ0JILGVBQUtDLE9BQUwsQ0FBYVgsR0FBYixFQUFrQixTQUFsQixFQUE4QixHQUFFQyxPQUFRLElBQUdHLFlBQVlVLE9BQVEsTUFBL0QsQ0FBdEI7QUFDQSxVQUFNLDhCQUFXTCxPQUFYLENBQU47QUFDQSxVQUFNTSxZQUFZLHNCQUFjO0FBQzlCQyxpQkFBVyxJQURtQjtBQUU5QkosWUFBTVg7QUFGd0IsS0FBZCxFQUdmTSxVQUhlLEVBR0g7QUFDYlUsZUFBU1AsZUFBS0MsT0FBTCxDQUFhWCxHQUFiLEVBQW1CLEdBQUVDLE9BQVEsTUFBN0IsQ0FESTtBQUViaUIsV0FBS1IsZUFBS1MsT0FBTCxDQUFhVixPQUFiO0FBRlEsS0FIRyxDQUFsQjtBQU9BLFVBQU0sb0JBQUtKLFdBQUwsRUFBa0JVLFNBQWxCLENBQU47QUFDQSxRQUFJLENBQUNSLFdBQVdLLElBQWhCLEVBQXNCO0FBQ3BCLFlBQU1RLGtCQUFHQyxNQUFILENBQVVaLE9BQVYsRUFBbUJJLGFBQW5CLENBQU47QUFDRDtBQUNELFdBQU8sQ0FBQ0EsYUFBRCxDQUFQO0FBQ0QsRyIsImZpbGUiOiJtYWtlcnMvZGFyd2luL2RtZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuXG5pbXBvcnQgeyBlbnN1cmVGaWxlIH0gZnJvbSAnLi4vLi4vdXRpbC9lbnN1cmUtb3V0cHV0JztcbmltcG9ydCBjb25maWdGbiBmcm9tICcuLi8uLi91dGlsL2NvbmZpZy1mbic7XG5cbi8vIGVsZWN0cm9uLWluc3RhbGxlci1kbWcgZG9lc24ndCBzZXQgaXRzICdvcycgZmllbGQgZXZlbiB0aG91Z2ggaXQgZGVwZW5kcyBvblxuLy8gYXBwZG1nLCB3aGljaCBpcyBkYXJ3aW4tb25seVxuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0gPSBhc3luYyAoKSA9PiBwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHsgZGlyLCBhcHBOYW1lLCB0YXJnZXRBcmNoLCBmb3JnZUNvbmZpZywgcGFja2FnZUpTT04gfSkgPT4ge1xuICBjb25zdCBlbGVjdHJvbkRNRyA9IHJlcXVpcmUoJ2VsZWN0cm9uLWluc3RhbGxlci1kbWcnKTtcblxuICBjb25zdCB1c2VyQ29uZmlnID0gY29uZmlnRm4oZm9yZ2VDb25maWcuZWxlY3Ryb25JbnN0YWxsZXJETUcsIHRhcmdldEFyY2gpO1xuXG4gIGNvbnN0IG91dFBhdGggPSBwYXRoLnJlc29sdmUoZGlyLCAnLi4vbWFrZScsIGAke3VzZXJDb25maWcubmFtZSB8fCBhcHBOYW1lfS5kbWdgKTtcbiAgY29uc3Qgd2FudGVkT3V0UGF0aCA9IHBhdGgucmVzb2x2ZShkaXIsICcuLi9tYWtlJywgYCR7YXBwTmFtZX0tJHtwYWNrYWdlSlNPTi52ZXJzaW9ufS5kbWdgKTtcbiAgYXdhaXQgZW5zdXJlRmlsZShvdXRQYXRoKTtcbiAgY29uc3QgZG1nQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgb3ZlcndyaXRlOiB0cnVlLFxuICAgIG5hbWU6IGFwcE5hbWUsXG4gIH0sIHVzZXJDb25maWcsIHtcbiAgICBhcHBQYXRoOiBwYXRoLnJlc29sdmUoZGlyLCBgJHthcHBOYW1lfS5hcHBgKSxcbiAgICBvdXQ6IHBhdGguZGlybmFtZShvdXRQYXRoKSxcbiAgfSk7XG4gIGF3YWl0IHBpZnkoZWxlY3Ryb25ETUcpKGRtZ0NvbmZpZyk7XG4gIGlmICghdXNlckNvbmZpZy5uYW1lKSB7XG4gICAgYXdhaXQgZnMucmVuYW1lKG91dFBhdGgsIHdhbnRlZE91dFBhdGgpO1xuICB9XG4gIHJldHVybiBbd2FudGVkT3V0UGF0aF07XG59O1xuIl19