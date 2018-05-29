'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:hook');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (forgeConfig, hookName, ...hookArgs) {
    const hooks = forgeConfig.hooks || {};
    if (typeof hooks[hookName] === 'function') {
      d('calling hook:', hookName, 'with args:', hookArgs);
      yield hooks[hookName](forgeConfig, ...hookArgs);
    } else {
      d('could not find hook:', hookName);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvaG9vay5qcyJdLCJuYW1lcyI6WyJkIiwiZm9yZ2VDb25maWciLCJob29rTmFtZSIsImhvb2tBcmdzIiwiaG9va3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLE1BQU1BLElBQUkscUJBQU0scUJBQU4sQ0FBVjs7O3NDQUVlLFdBQU9DLFdBQVAsRUFBb0JDLFFBQXBCLEVBQThCLEdBQUdDLFFBQWpDLEVBQThDO0FBQzNELFVBQU1DLFFBQVFILFlBQVlHLEtBQVosSUFBcUIsRUFBbkM7QUFDQSxRQUFJLE9BQU9BLE1BQU1GLFFBQU4sQ0FBUCxLQUEyQixVQUEvQixFQUEyQztBQUN6Q0YsUUFBRSxlQUFGLEVBQW1CRSxRQUFuQixFQUE2QixZQUE3QixFQUEyQ0MsUUFBM0M7QUFDQSxZQUFNQyxNQUFNRixRQUFOLEVBQWdCRCxXQUFoQixFQUE2QixHQUFHRSxRQUFoQyxDQUFOO0FBQ0QsS0FIRCxNQUdPO0FBQ0xILFFBQUUsc0JBQUYsRUFBMEJFLFFBQTFCO0FBQ0Q7QUFDRixHIiwiZmlsZSI6InV0aWwvaG9vay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aG9vaycpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZm9yZ2VDb25maWcsIGhvb2tOYW1lLCAuLi5ob29rQXJncykgPT4ge1xuICBjb25zdCBob29rcyA9IGZvcmdlQ29uZmlnLmhvb2tzIHx8IHt9O1xuICBpZiAodHlwZW9mIGhvb2tzW2hvb2tOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGQoJ2NhbGxpbmcgaG9vazonLCBob29rTmFtZSwgJ3dpdGggYXJnczonLCBob29rQXJncyk7XG4gICAgYXdhaXQgaG9va3NbaG9va05hbWVdKGZvcmdlQ29uZmlnLCAuLi5ob29rQXJncyk7XG4gIH0gZWxzZSB7XG4gICAgZCgnY291bGQgbm90IGZpbmQgaG9vazonLCBob29rTmFtZSk7XG4gIH1cbn07XG4iXX0=