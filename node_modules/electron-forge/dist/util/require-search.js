'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.requireSearchRaw = requireSearchRaw;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:require-search');

function requireSearchRaw(relativeTo, paths) {
  const testPaths = paths.concat(paths.map(mapPath => _path2.default.resolve(relativeTo, mapPath))).concat(paths.map(mapPath => _path2.default.resolve(relativeTo, 'node_modules', mapPath)));
  d('searching', testPaths, 'relative to', relativeTo);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(testPaths), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const testPath = _step.value;

      try {
        d('testing', testPath);
        return require(testPath);
      } catch (err) {
        // Ignore the error
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

  d('failed to find a module in', testPaths);
}

exports.default = (relativeTo, paths) => {
  const result = requireSearchRaw(relativeTo, paths);
  return typeof result === 'object' && result && result.default ? result.default : result;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvcmVxdWlyZS1zZWFyY2guanMiXSwibmFtZXMiOlsicmVxdWlyZVNlYXJjaFJhdyIsImQiLCJyZWxhdGl2ZVRvIiwicGF0aHMiLCJ0ZXN0UGF0aHMiLCJjb25jYXQiLCJtYXAiLCJtYXBQYXRoIiwicGF0aCIsInJlc29sdmUiLCJ0ZXN0UGF0aCIsInJlcXVpcmUiLCJlcnIiLCJyZXN1bHQiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O1FBS2dCQSxnQixHQUFBQSxnQjs7QUFMaEI7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUMsSUFBSSxxQkFBTSwrQkFBTixDQUFWOztBQUVPLFNBQVNELGdCQUFULENBQTBCRSxVQUExQixFQUFzQ0MsS0FBdEMsRUFBNkM7QUFDbEQsUUFBTUMsWUFBWUQsTUFDZkUsTUFEZSxDQUNSRixNQUFNRyxHQUFOLENBQVVDLFdBQVdDLGVBQUtDLE9BQUwsQ0FBYVAsVUFBYixFQUF5QkssT0FBekIsQ0FBckIsQ0FEUSxFQUVmRixNQUZlLENBRVJGLE1BQU1HLEdBQU4sQ0FBVUMsV0FBV0MsZUFBS0MsT0FBTCxDQUFhUCxVQUFiLEVBQXlCLGNBQXpCLEVBQXlDSyxPQUF6QyxDQUFyQixDQUZRLENBQWxCO0FBR0FOLElBQUUsV0FBRixFQUFlRyxTQUFmLEVBQTBCLGFBQTFCLEVBQXlDRixVQUF6QztBQUprRDtBQUFBO0FBQUE7O0FBQUE7QUFLbEQsb0RBQXVCRSxTQUF2Qiw0R0FBa0M7QUFBQSxZQUF2Qk0sUUFBdUI7O0FBQ2hDLFVBQUk7QUFDRlQsVUFBRSxTQUFGLEVBQWFTLFFBQWI7QUFDQSxlQUFPQyxRQUFRRCxRQUFSLENBQVA7QUFDRCxPQUhELENBR0UsT0FBT0UsR0FBUCxFQUFZO0FBQ1o7QUFDRDtBQUNGO0FBWmlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYWxEWCxJQUFFLDRCQUFGLEVBQWdDRyxTQUFoQztBQUNEOztrQkFFYyxDQUFDRixVQUFELEVBQWFDLEtBQWIsS0FBdUI7QUFDcEMsUUFBTVUsU0FBU2IsaUJBQWlCRSxVQUFqQixFQUE2QkMsS0FBN0IsQ0FBZjtBQUNBLFNBQU8sT0FBT1UsTUFBUCxLQUFrQixRQUFsQixJQUE4QkEsTUFBOUIsSUFBd0NBLE9BQU9DLE9BQS9DLEdBQXlERCxPQUFPQyxPQUFoRSxHQUEwRUQsTUFBakY7QUFDRCxDIiwiZmlsZSI6InV0aWwvcmVxdWlyZS1zZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6cmVxdWlyZS1zZWFyY2gnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVTZWFyY2hSYXcocmVsYXRpdmVUbywgcGF0aHMpIHtcbiAgY29uc3QgdGVzdFBhdGhzID0gcGF0aHNcbiAgICAuY29uY2F0KHBhdGhzLm1hcChtYXBQYXRoID0+IHBhdGgucmVzb2x2ZShyZWxhdGl2ZVRvLCBtYXBQYXRoKSkpXG4gICAgLmNvbmNhdChwYXRocy5tYXAobWFwUGF0aCA9PiBwYXRoLnJlc29sdmUocmVsYXRpdmVUbywgJ25vZGVfbW9kdWxlcycsIG1hcFBhdGgpKSk7XG4gIGQoJ3NlYXJjaGluZycsIHRlc3RQYXRocywgJ3JlbGF0aXZlIHRvJywgcmVsYXRpdmVUbyk7XG4gIGZvciAoY29uc3QgdGVzdFBhdGggb2YgdGVzdFBhdGhzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGQoJ3Rlc3RpbmcnLCB0ZXN0UGF0aCk7XG4gICAgICByZXR1cm4gcmVxdWlyZSh0ZXN0UGF0aCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBJZ25vcmUgdGhlIGVycm9yXG4gICAgfVxuICB9XG4gIGQoJ2ZhaWxlZCB0byBmaW5kIGEgbW9kdWxlIGluJywgdGVzdFBhdGhzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKHJlbGF0aXZlVG8sIHBhdGhzKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHJlcXVpcmVTZWFyY2hSYXcocmVsYXRpdmVUbywgcGF0aHMpO1xuICByZXR1cm4gdHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcgJiYgcmVzdWx0ICYmIHJlc3VsdC5kZWZhdWx0ID8gcmVzdWx0LmRlZmF1bHQgOiByZXN1bHQ7XG59O1xuIl19