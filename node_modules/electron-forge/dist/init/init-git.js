'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require('bluebird');

var _child_process = require('child_process');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:init:git');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir) {
    yield (0, _oraHandler2.default)('Initializing Git Repository', (0, _bluebird.coroutine)(function* () {
      yield new _promise2.default((() => {
        var _ref3 = (0, _bluebird.coroutine)(function* (resolve, reject) {
          if (yield _fsExtra2.default.pathExists(_path2.default.resolve(dir, '.git'))) {
            d('.git directory already exists, skipping git initialization');
            return resolve();
          }
          d('executing "git init" in directory:', dir);
          (0, _child_process.exec)('git init', {
            cwd: dir
          }, function (err) {
            if (err) return reject(err);
            resolve();
          });
        });

        return function (_x2, _x3) {
          return _ref3.apply(this, arguments);
        };
      })());
    }));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQvaW5pdC1naXQuanMiXSwibmFtZXMiOlsiZCIsImRpciIsInJlc29sdmUiLCJyZWplY3QiLCJmcyIsInBhdGhFeGlzdHMiLCJwYXRoIiwiY3dkIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxxQkFBTSx5QkFBTixDQUFWOzs7c0NBRWUsV0FBT0MsR0FBUCxFQUFlO0FBQzVCLFVBQU0sMEJBQVMsNkJBQVQsMkJBQXdDLGFBQVk7QUFDeEQsWUFBTTtBQUFBLDZDQUFZLFdBQU9DLE9BQVAsRUFBZ0JDLE1BQWhCLEVBQTJCO0FBQzNDLGNBQUksTUFBTUMsa0JBQUdDLFVBQUgsQ0FBY0MsZUFBS0osT0FBTCxDQUFhRCxHQUFiLEVBQWtCLE1BQWxCLENBQWQsQ0FBVixFQUFvRDtBQUNsREQsY0FBRSw0REFBRjtBQUNBLG1CQUFPRSxTQUFQO0FBQ0Q7QUFDREYsWUFBRSxvQ0FBRixFQUF3Q0MsR0FBeEM7QUFDQSxtQ0FBSyxVQUFMLEVBQWlCO0FBQ2ZNLGlCQUFLTjtBQURVLFdBQWpCLEVBRUcsVUFBQ08sR0FBRCxFQUFTO0FBQ1YsZ0JBQUlBLEdBQUosRUFBUyxPQUFPTCxPQUFPSyxHQUFQLENBQVA7QUFDVE47QUFDRCxXQUxEO0FBTUQsU0FaSzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFOO0FBYUQsS0FkSyxFQUFOO0FBZUQsRyIsImZpbGUiOiJpbml0L2luaXQtZ2l0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IGFzeW5jT3JhIGZyb20gJy4uL3V0aWwvb3JhLWhhbmRsZXInO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmluaXQ6Z2l0Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChkaXIpID0+IHtcbiAgYXdhaXQgYXN5bmNPcmEoJ0luaXRpYWxpemluZyBHaXQgUmVwb3NpdG9yeScsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoYXdhaXQgZnMucGF0aEV4aXN0cyhwYXRoLnJlc29sdmUoZGlyLCAnLmdpdCcpKSkge1xuICAgICAgICBkKCcuZ2l0IGRpcmVjdG9yeSBhbHJlYWR5IGV4aXN0cywgc2tpcHBpbmcgZ2l0IGluaXRpYWxpemF0aW9uJyk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBkKCdleGVjdXRpbmcgXCJnaXQgaW5pdFwiIGluIGRpcmVjdG9yeTonLCBkaXIpO1xuICAgICAgZXhlYygnZ2l0IGluaXQnLCB7XG4gICAgICAgIGN3ZDogZGlyLFxuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG4iXX0=