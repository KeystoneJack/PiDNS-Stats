'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _yarnOrNpm = require('../util/yarn-or-npm');

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:init:standard-fix');

const run = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir) {
    try {
      yield (0, _yarnOrNpm.yarnOrNpmSpawn)(['run', 'lint', '--', '--fix'], {
        stdio: 'inherit',
        cwd: dir
      });
    } catch (err) {
      throw new Error(`Failed to fix JS to standard style (${err.message})`);
    }
  });

  return function run(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* (dir) {
    yield (0, _oraHandler2.default)('Applying Standard Style to JS', (0, _bluebird.coroutine)(function* () {
      d('executing "standard --fix" in:', dir);
      yield run(dir);
    }));
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQvaW5pdC1zdGFuZGFyZC1maXguanMiXSwibmFtZXMiOlsiZCIsInJ1biIsImRpciIsInN0ZGlvIiwiY3dkIiwiZXJyIiwiRXJyb3IiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLE1BQU1BLElBQUkscUJBQU0sa0NBQU4sQ0FBVjs7QUFFQSxNQUFNQztBQUFBLHNDQUFNLFdBQU9DLEdBQVAsRUFBZTtBQUN6QixRQUFJO0FBQ0YsWUFBTSwrQkFBZSxDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLElBQWhCLEVBQXNCLE9BQXRCLENBQWYsRUFBK0M7QUFDbkRDLGVBQU8sU0FENEM7QUFFbkRDLGFBQUtGO0FBRjhDLE9BQS9DLENBQU47QUFJRCxLQUxELENBS0UsT0FBT0csR0FBUCxFQUFZO0FBQ1osWUFBTSxJQUFJQyxLQUFKLENBQVcsdUNBQXNDRCxJQUFJRSxPQUFRLEdBQTdELENBQU47QUFDRDtBQUNGLEdBVEs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7O3VDQVdlLFdBQU9MLEdBQVAsRUFBZTtBQUM1QixVQUFNLDBCQUFTLCtCQUFULDJCQUEwQyxhQUFZO0FBQzFERixRQUFFLGdDQUFGLEVBQW9DRSxHQUFwQztBQUNBLFlBQU1ELElBQUlDLEdBQUosQ0FBTjtBQUNELEtBSEssRUFBTjtBQUlELEciLCJmaWxlIjoiaW5pdC9pbml0LXN0YW5kYXJkLWZpeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgeyB5YXJuT3JOcG1TcGF3biB9IGZyb20gJy4uL3V0aWwveWFybi1vci1ucG0nO1xuXG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aW5pdDpzdGFuZGFyZC1maXgnKTtcblxuY29uc3QgcnVuID0gYXN5bmMgKGRpcikgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IHlhcm5Pck5wbVNwYXduKFsncnVuJywgJ2xpbnQnLCAnLS0nLCAnLS1maXgnXSwge1xuICAgICAgc3RkaW86ICdpbmhlcml0JyxcbiAgICAgIGN3ZDogZGlyLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmaXggSlMgdG8gc3RhbmRhcmQgc3R5bGUgKCR7ZXJyLm1lc3NhZ2V9KWApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyKSA9PiB7XG4gIGF3YWl0IGFzeW5jT3JhKCdBcHBseWluZyBTdGFuZGFyZCBTdHlsZSB0byBKUycsIGFzeW5jICgpID0+IHtcbiAgICBkKCdleGVjdXRpbmcgXCJzdGFuZGFyZCAtLWZpeFwiIGluOicsIGRpcik7XG4gICAgYXdhaXQgcnVuKGRpcik7XG4gIH0pO1xufTtcbiJdfQ==