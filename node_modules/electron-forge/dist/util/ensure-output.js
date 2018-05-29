'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureFile = exports.ensureDirectory = undefined;

var _bluebird = require('bluebird');

// This is different from fs-extra's ensureDir because it wipes out the existing directory,
// if it's found.
let ensureDirectory = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir) {
    if (yield _fsExtra2.default.pathExists(dir)) {
      yield _fsExtra2.default.remove(dir);
    }
    return _fsExtra2.default.mkdirs(dir);
  });

  return function ensureDirectory(_x) {
    return _ref.apply(this, arguments);
  };
})();

// This is different from fs-extra's ensureFile because it wipes out the existing file,
// if it's found.


let ensureFile = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* (file) {
    if (yield _fsExtra2.default.pathExists(file)) {
      yield _fsExtra2.default.remove(file);
    }
    yield _fsExtra2.default.mkdirs(_path2.default.dirname(file));
  });

  return function ensureFile(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ensureDirectory = ensureDirectory;
exports.ensureFile = ensureFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvZW5zdXJlLW91dHB1dC5qcyJdLCJuYW1lcyI6WyJkaXIiLCJmcyIsInBhdGhFeGlzdHMiLCJyZW1vdmUiLCJta2RpcnMiLCJlbnN1cmVEaXJlY3RvcnkiLCJmaWxlIiwicGF0aCIsImRpcm5hbWUiLCJlbnN1cmVGaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQTtBQUNBOztzQ0FDQSxXQUErQkEsR0FBL0IsRUFBb0M7QUFDbEMsUUFBSSxNQUFNQyxrQkFBR0MsVUFBSCxDQUFjRixHQUFkLENBQVYsRUFBOEI7QUFDNUIsWUFBTUMsa0JBQUdFLE1BQUgsQ0FBVUgsR0FBVixDQUFOO0FBQ0Q7QUFDRCxXQUFPQyxrQkFBR0csTUFBSCxDQUFVSixHQUFWLENBQVA7QUFDRCxHOztrQkFMY0ssZTs7Ozs7QUFPZjtBQUNBOzs7O3VDQUNBLFdBQTBCQyxJQUExQixFQUFnQztBQUM5QixRQUFJLE1BQU1MLGtCQUFHQyxVQUFILENBQWNJLElBQWQsQ0FBVixFQUErQjtBQUM3QixZQUFNTCxrQkFBR0UsTUFBSCxDQUFVRyxJQUFWLENBQU47QUFDRDtBQUNELFVBQU1MLGtCQUFHRyxNQUFILENBQVVHLGVBQUtDLE9BQUwsQ0FBYUYsSUFBYixDQUFWLENBQU47QUFDRCxHOztrQkFMY0csVTs7Ozs7QUFkZjs7OztBQUNBOzs7Ozs7UUFvQlNKLGUsR0FBQUEsZTtRQUFpQkksVSxHQUFBQSxVIiwiZmlsZSI6InV0aWwvZW5zdXJlLW91dHB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBmcy1leHRyYSdzIGVuc3VyZURpciBiZWNhdXNlIGl0IHdpcGVzIG91dCB0aGUgZXhpc3RpbmcgZGlyZWN0b3J5LFxuLy8gaWYgaXQncyBmb3VuZC5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZURpcmVjdG9yeShkaXIpIHtcbiAgaWYgKGF3YWl0IGZzLnBhdGhFeGlzdHMoZGlyKSkge1xuICAgIGF3YWl0IGZzLnJlbW92ZShkaXIpO1xuICB9XG4gIHJldHVybiBmcy5ta2RpcnMoZGlyKTtcbn1cblxuLy8gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBmcy1leHRyYSdzIGVuc3VyZUZpbGUgYmVjYXVzZSBpdCB3aXBlcyBvdXQgdGhlIGV4aXN0aW5nIGZpbGUsXG4vLyBpZiBpdCdzIGZvdW5kLlxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlRmlsZShmaWxlKSB7XG4gIGlmIChhd2FpdCBmcy5wYXRoRXhpc3RzKGZpbGUpKSB7XG4gICAgYXdhaXQgZnMucmVtb3ZlKGZpbGUpO1xuICB9XG4gIGF3YWl0IGZzLm1rZGlycyhwYXRoLmRpcm5hbWUoZmlsZSkpO1xufVxuXG5leHBvcnQgeyBlbnN1cmVEaXJlY3RvcnksIGVuc3VyZUZpbGUgfTtcbiJdfQ==