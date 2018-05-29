'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _linuxInstaller = require('../../util/linux-installer');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (filePath) {
    yield (0, _linuxInstaller.sudo)('RPM', 'dnf', `--assumeyes --nogpgcheck install ${filePath}`);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhbGxlcnMvbGludXgvcnBtLmpzIl0sIm5hbWVzIjpbImZpbGVQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7c0NBRWUsV0FBT0EsUUFBUCxFQUFvQjtBQUNqQyxVQUFNLDBCQUFLLEtBQUwsRUFBWSxLQUFaLEVBQW9CLG9DQUFtQ0EsUUFBUyxFQUFoRSxDQUFOO0FBQ0QsRyIsImZpbGUiOiJpbnN0YWxsZXJzL2xpbnV4L3JwbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN1ZG8gfSBmcm9tICcuLi8uLi91dGlsL2xpbnV4LWluc3RhbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChmaWxlUGF0aCkgPT4ge1xuICBhd2FpdCBzdWRvKCdSUE0nLCAnZG5mJywgYC0tYXNzdW1leWVzIC0tbm9ncGdjaGVjayBpbnN0YWxsICR7ZmlsZVBhdGh9YCk7XG59O1xuIl19