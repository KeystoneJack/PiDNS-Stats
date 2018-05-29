'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir) {
    return yield _fsExtra2.default.readJson(_path2.default.resolve(dir, 'package.json'));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvcmVhZC1wYWNrYWdlLWpzb24uanMiXSwibmFtZXMiOlsiZGlyIiwiZnMiLCJyZWFkSnNvbiIsInBhdGgiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7c0NBRWUsV0FBTUEsR0FBTjtBQUFBLFdBQ2IsTUFBTUMsa0JBQUdDLFFBQUgsQ0FBWUMsZUFBS0MsT0FBTCxDQUFhSixHQUFiLEVBQWtCLGNBQWxCLENBQVosQ0FETztBQUFBLEciLCJmaWxlIjoidXRpbC9yZWFkLXBhY2thZ2UtanNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZGlyID0+XG4gIGF3YWl0IGZzLnJlYWRKc29uKHBhdGgucmVzb2x2ZShkaXIsICdwYWNrYWdlLmpzb24nKSk7XG4iXX0=