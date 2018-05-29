'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedOnCurrentPlatform = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require('bluebird');

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _ensureOutput = require('../../util/ensure-output');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isSupportedOnCurrentPlatform = exports.isSupportedOnCurrentPlatform = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return true;
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

const zipPromise = (from, to) => new _promise2.default((resolve, reject) => {
  const child = (0, _child_process.spawn)('zip', ['-r', '-y', to, _path2.default.basename(from)], {
    cwd: _path2.default.dirname(from)
  });

  child.stdout.on('data', () => {});
  child.stderr.on('data', () => {});

  child.on('close', code => {
    if (code === 0) return resolve();
    reject(new Error(`Failed to zip, exitted with code: ${code}`));
  });
});

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* ({ dir, appName, targetPlatform, packageJSON }) {
    const zipFolder = require('zip-folder');

    const zipPath = _path2.default.resolve(dir, '../make', `${_path2.default.basename(dir)}-${packageJSON.version}.zip`);
    yield (0, _ensureOutput.ensureFile)(zipPath);
    switch (targetPlatform) {
      // This case is tested but not on the coverage reporting platform
      /* istanbul ignore next */
      case 'win32':
        yield (0, _pify2.default)(zipFolder)(dir, zipPath);
        break;
      case 'mas':
      case 'darwin':
        yield zipPromise(_path2.default.resolve(dir, `${appName}.app`), zipPath);
        break;
      // This case is tested but not on the coverage reporting platform
      /* istanbul ignore next */
      case 'linux':
        yield zipPromise(dir, zipPath);
        break;
      default:
        throw new Error('Unrecognized platform');
    }
    return [zipPath];
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy9nZW5lcmljL3ppcC5qcyJdLCJuYW1lcyI6WyJpc1N1cHBvcnRlZE9uQ3VycmVudFBsYXRmb3JtIiwiemlwUHJvbWlzZSIsImZyb20iLCJ0byIsInJlc29sdmUiLCJyZWplY3QiLCJjaGlsZCIsInBhdGgiLCJiYXNlbmFtZSIsImN3ZCIsImRpcm5hbWUiLCJzdGRvdXQiLCJvbiIsInN0ZGVyciIsImNvZGUiLCJFcnJvciIsImRpciIsImFwcE5hbWUiLCJ0YXJnZXRQbGF0Zm9ybSIsInBhY2thZ2VKU09OIiwiemlwRm9sZGVyIiwicmVxdWlyZSIsInppcFBhdGgiLCJ2ZXJzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBRU8sTUFBTUE7QUFBQSxzQ0FBK0I7QUFBQSxXQUFZLElBQVo7QUFBQSxHQUEvQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFOOztBQUVQLE1BQU1DLGFBQWEsQ0FBQ0MsSUFBRCxFQUFPQyxFQUFQLEtBQ2pCLHNCQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUMvQixRQUFNQyxRQUFRLDBCQUFNLEtBQU4sRUFBYSxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWFILEVBQWIsRUFBaUJJLGVBQUtDLFFBQUwsQ0FBY04sSUFBZCxDQUFqQixDQUFiLEVBQW9EO0FBQ2hFTyxTQUFLRixlQUFLRyxPQUFMLENBQWFSLElBQWI7QUFEMkQsR0FBcEQsQ0FBZDs7QUFJQUksUUFBTUssTUFBTixDQUFhQyxFQUFiLENBQWdCLE1BQWhCLEVBQXdCLE1BQU0sQ0FBRSxDQUFoQztBQUNBTixRQUFNTyxNQUFOLENBQWFELEVBQWIsQ0FBZ0IsTUFBaEIsRUFBd0IsTUFBTSxDQUFFLENBQWhDOztBQUVBTixRQUFNTSxFQUFOLENBQVMsT0FBVCxFQUFtQkUsSUFBRCxJQUFVO0FBQzFCLFFBQUlBLFNBQVMsQ0FBYixFQUFnQixPQUFPVixTQUFQO0FBQ2hCQyxXQUFPLElBQUlVLEtBQUosQ0FBVyxxQ0FBb0NELElBQUssRUFBcEQsQ0FBUDtBQUNELEdBSEQ7QUFJRCxDQVpELENBREY7Ozt1Q0FlZSxXQUFPLEVBQUVFLEdBQUYsRUFBT0MsT0FBUCxFQUFnQkMsY0FBaEIsRUFBZ0NDLFdBQWhDLEVBQVAsRUFBeUQ7QUFDdEUsVUFBTUMsWUFBWUMsUUFBUSxZQUFSLENBQWxCOztBQUVBLFVBQU1DLFVBQVVmLGVBQUtILE9BQUwsQ0FBYVksR0FBYixFQUFrQixTQUFsQixFQUE4QixHQUFFVCxlQUFLQyxRQUFMLENBQWNRLEdBQWQsQ0FBbUIsSUFBR0csWUFBWUksT0FBUSxNQUExRSxDQUFoQjtBQUNBLFVBQU0sOEJBQVdELE9BQVgsQ0FBTjtBQUNBLFlBQVFKLGNBQVI7QUFDRTtBQUNBO0FBQ0EsV0FBSyxPQUFMO0FBQ0UsY0FBTSxvQkFBS0UsU0FBTCxFQUFnQkosR0FBaEIsRUFBcUJNLE9BQXJCLENBQU47QUFDQTtBQUNGLFdBQUssS0FBTDtBQUNBLFdBQUssUUFBTDtBQUNFLGNBQU1yQixXQUFXTSxlQUFLSCxPQUFMLENBQWFZLEdBQWIsRUFBbUIsR0FBRUMsT0FBUSxNQUE3QixDQUFYLEVBQWdESyxPQUFoRCxDQUFOO0FBQ0E7QUFDRjtBQUNBO0FBQ0EsV0FBSyxPQUFMO0FBQ0UsY0FBTXJCLFdBQVdlLEdBQVgsRUFBZ0JNLE9BQWhCLENBQU47QUFDQTtBQUNGO0FBQ0UsY0FBTSxJQUFJUCxLQUFKLENBQVUsdUJBQVYsQ0FBTjtBQWhCSjtBQWtCQSxXQUFPLENBQUNPLE9BQUQsQ0FBUDtBQUNELEciLCJmaWxlIjoibWFrZXJzL2dlbmVyaWMvemlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3Bhd24gfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHBpZnkgZnJvbSAncGlmeSc7XG5cbmltcG9ydCB7IGVuc3VyZUZpbGUgfSBmcm9tICcuLi8uLi91dGlsL2Vuc3VyZS1vdXRwdXQnO1xuXG5leHBvcnQgY29uc3QgaXNTdXBwb3J0ZWRPbkN1cnJlbnRQbGF0Zm9ybSA9IGFzeW5jICgpID0+IHRydWU7XG5cbmNvbnN0IHppcFByb21pc2UgPSAoZnJvbSwgdG8pID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjaGlsZCA9IHNwYXduKCd6aXAnLCBbJy1yJywgJy15JywgdG8sIHBhdGguYmFzZW5hbWUoZnJvbSldLCB7XG4gICAgICBjd2Q6IHBhdGguZGlybmFtZShmcm9tKSxcbiAgICB9KTtcblxuICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsICgpID0+IHt9KTtcbiAgICBjaGlsZC5zdGRlcnIub24oJ2RhdGEnLCAoKSA9PiB7fSk7XG5cbiAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSkgPT4ge1xuICAgICAgaWYgKGNvZGUgPT09IDApIHJldHVybiByZXNvbHZlKCk7XG4gICAgICByZWplY3QobmV3IEVycm9yKGBGYWlsZWQgdG8gemlwLCBleGl0dGVkIHdpdGggY29kZTogJHtjb2RlfWApKTtcbiAgICB9KTtcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICh7IGRpciwgYXBwTmFtZSwgdGFyZ2V0UGxhdGZvcm0sIHBhY2thZ2VKU09OIH0pID0+IHtcbiAgY29uc3QgemlwRm9sZGVyID0gcmVxdWlyZSgnemlwLWZvbGRlcicpO1xuXG4gIGNvbnN0IHppcFBhdGggPSBwYXRoLnJlc29sdmUoZGlyLCAnLi4vbWFrZScsIGAke3BhdGguYmFzZW5hbWUoZGlyKX0tJHtwYWNrYWdlSlNPTi52ZXJzaW9ufS56aXBgKTtcbiAgYXdhaXQgZW5zdXJlRmlsZSh6aXBQYXRoKTtcbiAgc3dpdGNoICh0YXJnZXRQbGF0Zm9ybSkge1xuICAgIC8vIFRoaXMgY2FzZSBpcyB0ZXN0ZWQgYnV0IG5vdCBvbiB0aGUgY292ZXJhZ2UgcmVwb3J0aW5nIHBsYXRmb3JtXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBjYXNlICd3aW4zMic6XG4gICAgICBhd2FpdCBwaWZ5KHppcEZvbGRlcikoZGlyLCB6aXBQYXRoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21hcyc6XG4gICAgY2FzZSAnZGFyd2luJzpcbiAgICAgIGF3YWl0IHppcFByb21pc2UocGF0aC5yZXNvbHZlKGRpciwgYCR7YXBwTmFtZX0uYXBwYCksIHppcFBhdGgpO1xuICAgICAgYnJlYWs7XG4gICAgLy8gVGhpcyBjYXNlIGlzIHRlc3RlZCBidXQgbm90IG9uIHRoZSBjb3ZlcmFnZSByZXBvcnRpbmcgcGxhdGZvcm1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGNhc2UgJ2xpbnV4JzpcbiAgICAgIGF3YWl0IHppcFByb21pc2UoZGlyLCB6aXBQYXRoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VucmVjb2duaXplZCBwbGF0Zm9ybScpO1xuICB9XG4gIHJldHVybiBbemlwUGF0aF07XG59O1xuIl19