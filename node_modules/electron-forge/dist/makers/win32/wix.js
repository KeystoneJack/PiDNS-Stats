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

var _authorName = require('../../util/author-name');

var _authorName2 = _interopRequireDefault(_authorName);

var _configFn = require('../../util/config-fn');

var _configFn2 = _interopRequireDefault(_configFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// electron-wix-msi doesn't set its 'os' field even though it only runs on win32
const isSupportedOnCurrentPlatform = exports.isSupportedOnCurrentPlatform = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return process.platform === 'win32';
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* ({ dir, appName, targetArch, forgeConfig, packageJSON }) {
    var _require = require('electron-wix-msi');

    const MSICreator = _require.MSICreator;


    const outPath = _path2.default.resolve(dir, `../make/wix/${targetArch}`);
    yield (0, _ensureOutput.ensureDirectory)(outPath);

    const creator = new MSICreator((0, _assign2.default)({
      description: packageJSON.description,
      name: appName,
      version: packageJSON.version,
      manufacturer: (0, _authorName2.default)(packageJSON.author),
      exe: `${appName}.exe`
    }, (0, _configFn2.default)(forgeConfig.electronWixMSIConfig, targetArch), {
      appDirectory: dir,
      outputDirectory: outPath
    }));

    yield creator.create();

    var _ref3 = yield creator.compile();

    const msiFile = _ref3.msiFile;


    return [msiFile];
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy93aW4zMi93aXguanMiXSwibmFtZXMiOlsiaXNTdXBwb3J0ZWRPbkN1cnJlbnRQbGF0Zm9ybSIsInByb2Nlc3MiLCJwbGF0Zm9ybSIsImRpciIsImFwcE5hbWUiLCJ0YXJnZXRBcmNoIiwiZm9yZ2VDb25maWciLCJwYWNrYWdlSlNPTiIsInJlcXVpcmUiLCJNU0lDcmVhdG9yIiwib3V0UGF0aCIsInBhdGgiLCJyZXNvbHZlIiwiY3JlYXRvciIsImRlc2NyaXB0aW9uIiwibmFtZSIsInZlcnNpb24iLCJtYW51ZmFjdHVyZXIiLCJhdXRob3IiLCJleGUiLCJlbGVjdHJvbldpeE1TSUNvbmZpZyIsImFwcERpcmVjdG9yeSIsIm91dHB1dERpcmVjdG9yeSIsImNyZWF0ZSIsImNvbXBpbGUiLCJtc2lGaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNPLE1BQU1BO0FBQUEsc0NBQStCO0FBQUEsV0FBWUMsUUFBUUMsUUFBUixLQUFxQixPQUFqQztBQUFBLEdBQS9COztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU47Ozt1Q0FFUSxXQUFPLEVBQUVDLEdBQUYsRUFBT0MsT0FBUCxFQUFnQkMsVUFBaEIsRUFBNEJDLFdBQTVCLEVBQXlDQyxXQUF6QyxFQUFQLEVBQWtFO0FBQUEsbUJBQ3hEQyxRQUFRLGtCQUFSLENBRHdEOztBQUFBLFVBQ3ZFQyxVQUR1RSxZQUN2RUEsVUFEdUU7OztBQUcvRSxVQUFNQyxVQUFVQyxlQUFLQyxPQUFMLENBQWFULEdBQWIsRUFBbUIsZUFBY0UsVUFBVyxFQUE1QyxDQUFoQjtBQUNBLFVBQU0sbUNBQWdCSyxPQUFoQixDQUFOOztBQUVBLFVBQU1HLFVBQVUsSUFBSUosVUFBSixDQUFlLHNCQUFjO0FBQzNDSyxtQkFBYVAsWUFBWU8sV0FEa0I7QUFFM0NDLFlBQU1YLE9BRnFDO0FBRzNDWSxlQUFTVCxZQUFZUyxPQUhzQjtBQUkzQ0Msb0JBQWMsMEJBQWtCVixZQUFZVyxNQUE5QixDQUo2QjtBQUszQ0MsV0FBTSxHQUFFZixPQUFRO0FBTDJCLEtBQWQsRUFNNUIsd0JBQVNFLFlBQVljLG9CQUFyQixFQUEyQ2YsVUFBM0MsQ0FONEIsRUFNNEI7QUFDekRnQixvQkFBY2xCLEdBRDJDO0FBRXpEbUIsdUJBQWlCWjtBQUZ3QyxLQU41QixDQUFmLENBQWhCOztBQVdBLFVBQU1HLFFBQVFVLE1BQVIsRUFBTjs7QUFqQitFLGdCQWtCM0QsTUFBTVYsUUFBUVcsT0FBUixFQWxCcUQ7O0FBQUEsVUFrQnZFQyxPQWxCdUUsU0FrQnZFQSxPQWxCdUU7OztBQW9CL0UsV0FBTyxDQUFDQSxPQUFELENBQVA7QUFDRCxHIiwiZmlsZSI6Im1ha2Vycy93aW4zMi93aXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgZW5zdXJlRGlyZWN0b3J5IH0gZnJvbSAnLi4vLi4vdXRpbC9lbnN1cmUtb3V0cHV0JztcbmltcG9ydCBnZXROYW1lRnJvbUF1dGhvciBmcm9tICcuLi8uLi91dGlsL2F1dGhvci1uYW1lJztcbmltcG9ydCBjb25maWdGbiBmcm9tICcuLi8uLi91dGlsL2NvbmZpZy1mbic7XG5cbi8vIGVsZWN0cm9uLXdpeC1tc2kgZG9lc24ndCBzZXQgaXRzICdvcycgZmllbGQgZXZlbiB0aG91Z2ggaXQgb25seSBydW5zIG9uIHdpbjMyXG5leHBvcnQgY29uc3QgaXNTdXBwb3J0ZWRPbkN1cnJlbnRQbGF0Zm9ybSA9IGFzeW5jICgpID0+IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICh7IGRpciwgYXBwTmFtZSwgdGFyZ2V0QXJjaCwgZm9yZ2VDb25maWcsIHBhY2thZ2VKU09OIH0pID0+IHtcbiAgY29uc3QgeyBNU0lDcmVhdG9yIH0gPSByZXF1aXJlKCdlbGVjdHJvbi13aXgtbXNpJyk7XG5cbiAgY29uc3Qgb3V0UGF0aCA9IHBhdGgucmVzb2x2ZShkaXIsIGAuLi9tYWtlL3dpeC8ke3RhcmdldEFyY2h9YCk7XG4gIGF3YWl0IGVuc3VyZURpcmVjdG9yeShvdXRQYXRoKTtcblxuICBjb25zdCBjcmVhdG9yID0gbmV3IE1TSUNyZWF0b3IoT2JqZWN0LmFzc2lnbih7XG4gICAgZGVzY3JpcHRpb246IHBhY2thZ2VKU09OLmRlc2NyaXB0aW9uLFxuICAgIG5hbWU6IGFwcE5hbWUsXG4gICAgdmVyc2lvbjogcGFja2FnZUpTT04udmVyc2lvbixcbiAgICBtYW51ZmFjdHVyZXI6IGdldE5hbWVGcm9tQXV0aG9yKHBhY2thZ2VKU09OLmF1dGhvciksXG4gICAgZXhlOiBgJHthcHBOYW1lfS5leGVgLFxuICB9LCBjb25maWdGbihmb3JnZUNvbmZpZy5lbGVjdHJvbldpeE1TSUNvbmZpZywgdGFyZ2V0QXJjaCksIHtcbiAgICBhcHBEaXJlY3Rvcnk6IGRpcixcbiAgICBvdXRwdXREaXJlY3Rvcnk6IG91dFBhdGgsXG4gIH0pKTtcblxuICBhd2FpdCBjcmVhdG9yLmNyZWF0ZSgpO1xuICBjb25zdCB7IG1zaUZpbGUgfSA9IGF3YWl0IGNyZWF0b3IuY29tcGlsZSgpO1xuXG4gIHJldHVybiBbbXNpRmlsZV07XG59O1xuIl19