'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readPackageJson = require('./read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:util');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (projectDir) {
    let result = null;

    const modulesToExamine = ['electron-prebuilt-compile', 'electron', 'electron-prebuilt'];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(modulesToExamine), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const moduleName = _step.value;

        const moduleDir = _path2.default.join(projectDir, 'node_modules', moduleName);
        try {
          const packageJSON = yield (0, _readPackageJson2.default)(moduleDir);
          result = packageJSON.version;
          break;
        } catch (e) {
          d(`Could not read package.json for moduleName=${moduleName}`, e);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!result) {
      d(`getElectronVersion failed to determine Electron version: projectDir=${projectDir}, result=${result}`);
    }

    return result;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvZ2V0LWVsZWN0cm9uLXZlcnNpb24uanMiXSwibmFtZXMiOlsiZCIsInByb2plY3REaXIiLCJyZXN1bHQiLCJtb2R1bGVzVG9FeGFtaW5lIiwibW9kdWxlTmFtZSIsIm1vZHVsZURpciIsInBhdGgiLCJqb2luIiwicGFja2FnZUpTT04iLCJ2ZXJzaW9uIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLHFCQUFOLENBQVY7OztzQ0FFZSxXQUFPQyxVQUFQLEVBQXNCO0FBQ25DLFFBQUlDLFNBQVMsSUFBYjs7QUFFQSxVQUFNQyxtQkFBbUIsQ0FBQywyQkFBRCxFQUE4QixVQUE5QixFQUEwQyxtQkFBMUMsQ0FBekI7QUFIbUM7QUFBQTtBQUFBOztBQUFBO0FBSW5DLHNEQUF5QkEsZ0JBQXpCLDRHQUEyQztBQUFBLGNBQWhDQyxVQUFnQzs7QUFDekMsY0FBTUMsWUFBWUMsZUFBS0MsSUFBTCxDQUFVTixVQUFWLEVBQXNCLGNBQXRCLEVBQXNDRyxVQUF0QyxDQUFsQjtBQUNBLFlBQUk7QUFDRixnQkFBTUksY0FBYyxNQUFNLCtCQUFnQkgsU0FBaEIsQ0FBMUI7QUFDQUgsbUJBQVNNLFlBQVlDLE9BQXJCO0FBQ0E7QUFDRCxTQUpELENBSUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1ZWLFlBQUcsOENBQTZDSSxVQUFXLEVBQTNELEVBQThETSxDQUE5RDtBQUNEO0FBQ0Y7QUFia0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFlbkMsUUFBSSxDQUFDUixNQUFMLEVBQWE7QUFDWEYsUUFBRyx1RUFBc0VDLFVBQVcsWUFBV0MsTUFBTyxFQUF0RztBQUNEOztBQUVELFdBQU9BLE1BQVA7QUFDRCxHIiwiZmlsZSI6InV0aWwvZ2V0LWVsZWN0cm9uLXZlcnNpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVhZFBhY2thZ2VKU09OIGZyb20gJy4vcmVhZC1wYWNrYWdlLWpzb24nO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOnV0aWwnKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHByb2plY3REaXIpID0+IHtcbiAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgY29uc3QgbW9kdWxlc1RvRXhhbWluZSA9IFsnZWxlY3Ryb24tcHJlYnVpbHQtY29tcGlsZScsICdlbGVjdHJvbicsICdlbGVjdHJvbi1wcmVidWlsdCddO1xuICBmb3IgKGNvbnN0IG1vZHVsZU5hbWUgb2YgbW9kdWxlc1RvRXhhbWluZSkge1xuICAgIGNvbnN0IG1vZHVsZURpciA9IHBhdGguam9pbihwcm9qZWN0RGlyLCAnbm9kZV9tb2R1bGVzJywgbW9kdWxlTmFtZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKG1vZHVsZURpcik7XG4gICAgICByZXN1bHQgPSBwYWNrYWdlSlNPTi52ZXJzaW9uO1xuICAgICAgYnJlYWs7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZChgQ291bGQgbm90IHJlYWQgcGFja2FnZS5qc29uIGZvciBtb2R1bGVOYW1lPSR7bW9kdWxlTmFtZX1gLCBlKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXJlc3VsdCkge1xuICAgIGQoYGdldEVsZWN0cm9uVmVyc2lvbiBmYWlsZWQgdG8gZGV0ZXJtaW5lIEVsZWN0cm9uIHZlcnNpb246IHByb2plY3REaXI9JHtwcm9qZWN0RGlyfSwgcmVzdWx0PSR7cmVzdWx0fWApO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iXX0=