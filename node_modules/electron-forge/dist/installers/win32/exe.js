'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _opn = require('opn');

var _opn2 = _interopRequireDefault(_opn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (filePath) {
    return yield (0, _opn2.default)(filePath, { wait: false });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhbGxlcnMvd2luMzIvZXhlLmpzIl0sIm5hbWVzIjpbImZpbGVQYXRoIiwid2FpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7OztzQ0FFZSxXQUFNQSxRQUFOO0FBQUEsV0FBa0IsTUFBTSxtQkFBSUEsUUFBSixFQUFjLEVBQUVDLE1BQU0sS0FBUixFQUFkLENBQXhCO0FBQUEsRyIsImZpbGUiOiJpbnN0YWxsZXJzL3dpbjMyL2V4ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvcG4gZnJvbSAnb3BuJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZmlsZVBhdGggPT4gYXdhaXQgb3BuKGZpbGVQYXRoLCB7IHdhaXQ6IGZhbHNlIH0pO1xuIl19