'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _linuxInstaller = require('../../util/linux-installer');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (filePath) {
    yield (0, _linuxInstaller.sudo)('Debian', 'gdebi', `-n ${filePath}`);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhbGxlcnMvbGludXgvZGViLmpzIl0sIm5hbWVzIjpbImZpbGVQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7c0NBRWUsV0FBT0EsUUFBUCxFQUFvQjtBQUNqQyxVQUFNLDBCQUFLLFFBQUwsRUFBZSxPQUFmLEVBQXlCLE1BQUtBLFFBQVMsRUFBdkMsQ0FBTjtBQUNELEciLCJmaWxlIjoiaW5zdGFsbGVycy9saW51eC9kZWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdWRvIH0gZnJvbSAnLi4vLi4vdXRpbC9saW51eC1pbnN0YWxsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZmlsZVBhdGgpID0+IHtcbiAgYXdhaXQgc3VkbygnRGViaWFuJywgJ2dkZWJpJywgYC1uICR7ZmlsZVBhdGh9YCk7XG59O1xuIl19