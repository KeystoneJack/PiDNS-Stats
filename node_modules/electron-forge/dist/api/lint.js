'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

require('colors');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _yarnOrNpm = require('../util/yarn-or-npm');

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _resolveDir = require('../util/resolve-dir');

var _resolveDir2 = _interopRequireDefault(_resolveDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:lint');

/**
 * @typedef {Object} LintOptions
 * @property {string} [dir=process.cwd()] The path to the module to import
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 */

/**
 * Lint a local Electron application.
 *
 * The promise will be rejected with the stdout+stderr of the linting process if linting fails or
 * will be resolved if it succeeds.
 *
 * @param {LintOptions} providedOptions - Options for the Lint method
 * @return {Promise<null, string>} Will resolve when the lint process is complete
 */

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    var _Object$assign = (0, _assign2.default)({
      dir: process.cwd(),
      interactive: false
    }, providedOptions);

    let dir = _Object$assign.dir,
        interactive = _Object$assign.interactive;

    _oraHandler2.default.interactive = interactive;

    let success = true;
    let result = null;

    yield (0, _oraHandler2.default)('Linting Application', (() => {
      var _ref2 = (0, _bluebird.coroutine)(function* (lintSpinner) {
        dir = yield (0, _resolveDir2.default)(dir);
        if (!dir) {
          throw 'Failed to locate lintable Electron application';
        }

        d('executing "run lint" in dir:', dir);
        try {
          yield (0, _yarnOrNpm.yarnOrNpmSpawn)(['run', 'lint'], {
            stdio: process.platform === 'win32' ? 'inherit' : 'pipe',
            cwd: dir
          });
        } catch (err) {
          lintSpinner.fail();
          success = false;
          result = err;
        }
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })());

    if (!success) {
      throw result;
    }
  });

  return function () {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9saW50LmpzIl0sIm5hbWVzIjpbImQiLCJwcm92aWRlZE9wdGlvbnMiLCJkaXIiLCJwcm9jZXNzIiwiY3dkIiwiaW50ZXJhY3RpdmUiLCJhc3luY09yYSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJsaW50U3Bpbm5lciIsInN0ZGlvIiwicGxhdGZvcm0iLCJlcnIiLCJmYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLElBQUkscUJBQU0scUJBQU4sQ0FBVjs7QUFFQTs7Ozs7O0FBTUE7Ozs7Ozs7Ozs7O3NDQVNlLFdBQU9DLGtCQUFrQixFQUF6QixFQUFnQztBQUM3QztBQUQ2Qyx5QkFFbEIsc0JBQWM7QUFDdkNDLFdBQUtDLFFBQVFDLEdBQVIsRUFEa0M7QUFFdkNDLG1CQUFhO0FBRjBCLEtBQWQsRUFHeEJKLGVBSHdCLENBRmtCOztBQUFBLFFBRXZDQyxHQUZ1QyxrQkFFdkNBLEdBRnVDO0FBQUEsUUFFbENHLFdBRmtDLGtCQUVsQ0EsV0FGa0M7O0FBTTdDQyx5QkFBU0QsV0FBVCxHQUF1QkEsV0FBdkI7O0FBRUEsUUFBSUUsVUFBVSxJQUFkO0FBQ0EsUUFBSUMsU0FBUyxJQUFiOztBQUVBLFVBQU0sMEJBQVMscUJBQVQ7QUFBQSwyQ0FBZ0MsV0FBT0MsV0FBUCxFQUF1QjtBQUMzRFAsY0FBTSxNQUFNLDBCQUFXQSxHQUFYLENBQVo7QUFDQSxZQUFJLENBQUNBLEdBQUwsRUFBVTtBQUNSLGdCQUFNLGdEQUFOO0FBQ0Q7O0FBRURGLFVBQUUsOEJBQUYsRUFBa0NFLEdBQWxDO0FBQ0EsWUFBSTtBQUNGLGdCQUFNLCtCQUFlLENBQUMsS0FBRCxFQUFRLE1BQVIsQ0FBZixFQUFnQztBQUNwQ1EsbUJBQU9QLFFBQVFRLFFBQVIsS0FBcUIsT0FBckIsR0FBK0IsU0FBL0IsR0FBMkMsTUFEZDtBQUVwQ1AsaUJBQUtGO0FBRitCLFdBQWhDLENBQU47QUFJRCxTQUxELENBS0UsT0FBT1UsR0FBUCxFQUFZO0FBQ1pILHNCQUFZSSxJQUFaO0FBQ0FOLG9CQUFVLEtBQVY7QUFDQUMsbUJBQVNJLEdBQVQ7QUFDRDtBQUNGLE9BakJLOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQU47O0FBbUJBLFFBQUksQ0FBQ0wsT0FBTCxFQUFjO0FBQ1osWUFBTUMsTUFBTjtBQUNEO0FBQ0YsRyIsImZpbGUiOiJhcGkvbGludC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgeyB5YXJuT3JOcG1TcGF3biB9IGZyb20gJy4uL3V0aWwveWFybi1vci1ucG0nO1xuXG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5pbXBvcnQgcmVzb2x2ZURpciBmcm9tICcuLi91dGlsL3Jlc29sdmUtZGlyJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpsaW50Jyk7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTGludE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGlyPXByb2Nlc3MuY3dkKCldIFRoZSBwYXRoIHRvIHRoZSBtb2R1bGUgdG8gaW1wb3J0XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtpbnRlcmFjdGl2ZT1mYWxzZV0gV2hldGhlciB0byB1c2Ugc2Vuc2libGUgZGVmYXVsdHMgb3IgcHJvbXB0IHRoZSB1c2VyIHZpc3VhbGx5XG4gKi9cblxuLyoqXG4gKiBMaW50IGEgbG9jYWwgRWxlY3Ryb24gYXBwbGljYXRpb24uXG4gKlxuICogVGhlIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzdGRvdXQrc3RkZXJyIG9mIHRoZSBsaW50aW5nIHByb2Nlc3MgaWYgbGludGluZyBmYWlscyBvclxuICogd2lsbCBiZSByZXNvbHZlZCBpZiBpdCBzdWNjZWVkcy5cbiAqXG4gKiBAcGFyYW0ge0xpbnRPcHRpb25zfSBwcm92aWRlZE9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgTGludCBtZXRob2RcbiAqIEByZXR1cm4ge1Byb21pc2U8bnVsbCwgc3RyaW5nPn0gV2lsbCByZXNvbHZlIHdoZW4gdGhlIGxpbnQgcHJvY2VzcyBpcyBjb21wbGV0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocHJvdmlkZWRPcHRpb25zID0ge30pID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdCwgbm8tdW51c2VkLXZhcnNcbiAgbGV0IHsgZGlyLCBpbnRlcmFjdGl2ZSB9ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgZGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcbiAgYXN5bmNPcmEuaW50ZXJhY3RpdmUgPSBpbnRlcmFjdGl2ZTtcblxuICBsZXQgc3VjY2VzcyA9IHRydWU7XG4gIGxldCByZXN1bHQgPSBudWxsO1xuXG4gIGF3YWl0IGFzeW5jT3JhKCdMaW50aW5nIEFwcGxpY2F0aW9uJywgYXN5bmMgKGxpbnRTcGlubmVyKSA9PiB7XG4gICAgZGlyID0gYXdhaXQgcmVzb2x2ZURpcihkaXIpO1xuICAgIGlmICghZGlyKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGxvY2F0ZSBsaW50YWJsZSBFbGVjdHJvbiBhcHBsaWNhdGlvbic7XG4gICAgfVxuXG4gICAgZCgnZXhlY3V0aW5nIFwicnVuIGxpbnRcIiBpbiBkaXI6JywgZGlyKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgeWFybk9yTnBtU3Bhd24oWydydW4nLCAnbGludCddLCB7XG4gICAgICAgIHN0ZGlvOiBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInID8gJ2luaGVyaXQnIDogJ3BpcGUnLFxuICAgICAgICBjd2Q6IGRpcixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbGludFNwaW5uZXIuZmFpbCgpO1xuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgcmVzdWx0ID0gZXJyO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCFzdWNjZXNzKSB7XG4gICAgdGhyb3cgcmVzdWx0O1xuICB9XG59O1xuIl19