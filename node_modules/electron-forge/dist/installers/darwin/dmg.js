'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _crossSpawnPromise = require('cross-spawn-promise');

var _crossSpawnPromise2 = _interopRequireDefault(_crossSpawnPromise);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hdiutil = require('../../util/hdiutil');

var _moveApp = require('../../util/move-app');

var _moveApp2 = _interopRequireDefault(_moveApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (filePath, installSpinner) {
    const mounts = yield (0, _hdiutil.getMountedImages)();
    let targetMount = mounts.find(function (mount) {
      return mount.imagePath === filePath;
    });

    if (!targetMount) {
      targetMount = yield (0, _hdiutil.mountImage)(filePath);
    }

    try {
      const volumePath = _path2.default.resolve('/Volumes', targetMount.mountPath);
      const appName = (yield _fsExtra2.default.readdir(volumePath)).find(function (file) {
        return file.endsWith('.app');
      });
      if (!appName) {
        throw 'Failed to find .app file in DMG';
      }
      const appPath = _path2.default.resolve(volumePath, appName);
      const targetApplicationPath = `/Applications/${_path2.default.basename(appPath)}`;

      yield (0, _moveApp2.default)(appPath, targetApplicationPath, installSpinner, true);

      yield (0, _crossSpawnPromise2.default)('open', ['-R', targetApplicationPath], { detached: true });
    } finally {
      yield (0, _hdiutil.unmountImage)(targetMount);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhbGxlcnMvZGFyd2luL2RtZy5qcyJdLCJuYW1lcyI6WyJmaWxlUGF0aCIsImluc3RhbGxTcGlubmVyIiwibW91bnRzIiwidGFyZ2V0TW91bnQiLCJmaW5kIiwibW91bnQiLCJpbWFnZVBhdGgiLCJ2b2x1bWVQYXRoIiwicGF0aCIsInJlc29sdmUiLCJtb3VudFBhdGgiLCJhcHBOYW1lIiwiZnMiLCJyZWFkZGlyIiwiZmlsZSIsImVuZHNXaXRoIiwiYXBwUGF0aCIsInRhcmdldEFwcGxpY2F0aW9uUGF0aCIsImJhc2VuYW1lIiwiZGV0YWNoZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7c0NBRWUsV0FBT0EsUUFBUCxFQUFpQkMsY0FBakIsRUFBb0M7QUFDakQsVUFBTUMsU0FBUyxNQUFNLGdDQUFyQjtBQUNBLFFBQUlDLGNBQWNELE9BQU9FLElBQVAsQ0FBWTtBQUFBLGFBQVNDLE1BQU1DLFNBQU4sS0FBb0JOLFFBQTdCO0FBQUEsS0FBWixDQUFsQjs7QUFFQSxRQUFJLENBQUNHLFdBQUwsRUFBa0I7QUFDaEJBLG9CQUFjLE1BQU0seUJBQVdILFFBQVgsQ0FBcEI7QUFDRDs7QUFFRCxRQUFJO0FBQ0YsWUFBTU8sYUFBYUMsZUFBS0MsT0FBTCxDQUFhLFVBQWIsRUFBeUJOLFlBQVlPLFNBQXJDLENBQW5CO0FBQ0EsWUFBTUMsVUFBVSxDQUFDLE1BQU1DLGtCQUFHQyxPQUFILENBQVdOLFVBQVgsQ0FBUCxFQUErQkgsSUFBL0IsQ0FBb0M7QUFBQSxlQUFRVSxLQUFLQyxRQUFMLENBQWMsTUFBZCxDQUFSO0FBQUEsT0FBcEMsQ0FBaEI7QUFDQSxVQUFJLENBQUNKLE9BQUwsRUFBYztBQUNaLGNBQU0saUNBQU47QUFDRDtBQUNELFlBQU1LLFVBQVVSLGVBQUtDLE9BQUwsQ0FBYUYsVUFBYixFQUF5QkksT0FBekIsQ0FBaEI7QUFDQSxZQUFNTSx3QkFBeUIsaUJBQWdCVCxlQUFLVSxRQUFMLENBQWNGLE9BQWQsQ0FBdUIsRUFBdEU7O0FBRUEsWUFBTSx1QkFBUUEsT0FBUixFQUFpQkMscUJBQWpCLEVBQXdDaEIsY0FBeEMsRUFBd0QsSUFBeEQsQ0FBTjs7QUFFQSxZQUFNLGlDQUFhLE1BQWIsRUFBcUIsQ0FBQyxJQUFELEVBQU9nQixxQkFBUCxDQUFyQixFQUFvRCxFQUFFRSxVQUFVLElBQVosRUFBcEQsQ0FBTjtBQUNELEtBWkQsU0FZVTtBQUNSLFlBQU0sMkJBQWFoQixXQUFiLENBQU47QUFDRDtBQUNGLEciLCJmaWxlIjoiaW5zdGFsbGVycy9kYXJ3aW4vZG1nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNwYXduUHJvbWlzZSBmcm9tICdjcm9zcy1zcGF3bi1wcm9taXNlJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgZ2V0TW91bnRlZEltYWdlcywgbW91bnRJbWFnZSwgdW5tb3VudEltYWdlIH0gZnJvbSAnLi4vLi4vdXRpbC9oZGl1dGlsJztcbmltcG9ydCBtb3ZlQXBwIGZyb20gJy4uLy4uL3V0aWwvbW92ZS1hcHAnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZmlsZVBhdGgsIGluc3RhbGxTcGlubmVyKSA9PiB7XG4gIGNvbnN0IG1vdW50cyA9IGF3YWl0IGdldE1vdW50ZWRJbWFnZXMoKTtcbiAgbGV0IHRhcmdldE1vdW50ID0gbW91bnRzLmZpbmQobW91bnQgPT4gbW91bnQuaW1hZ2VQYXRoID09PSBmaWxlUGF0aCk7XG5cbiAgaWYgKCF0YXJnZXRNb3VudCkge1xuICAgIHRhcmdldE1vdW50ID0gYXdhaXQgbW91bnRJbWFnZShmaWxlUGF0aCk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHZvbHVtZVBhdGggPSBwYXRoLnJlc29sdmUoJy9Wb2x1bWVzJywgdGFyZ2V0TW91bnQubW91bnRQYXRoKTtcbiAgICBjb25zdCBhcHBOYW1lID0gKGF3YWl0IGZzLnJlYWRkaXIodm9sdW1lUGF0aCkpLmZpbmQoZmlsZSA9PiBmaWxlLmVuZHNXaXRoKCcuYXBwJykpO1xuICAgIGlmICghYXBwTmFtZSkge1xuICAgICAgdGhyb3cgJ0ZhaWxlZCB0byBmaW5kIC5hcHAgZmlsZSBpbiBETUcnO1xuICAgIH1cbiAgICBjb25zdCBhcHBQYXRoID0gcGF0aC5yZXNvbHZlKHZvbHVtZVBhdGgsIGFwcE5hbWUpO1xuICAgIGNvbnN0IHRhcmdldEFwcGxpY2F0aW9uUGF0aCA9IGAvQXBwbGljYXRpb25zLyR7cGF0aC5iYXNlbmFtZShhcHBQYXRoKX1gO1xuXG4gICAgYXdhaXQgbW92ZUFwcChhcHBQYXRoLCB0YXJnZXRBcHBsaWNhdGlvblBhdGgsIGluc3RhbGxTcGlubmVyLCB0cnVlKTtcblxuICAgIGF3YWl0IHNwYXduUHJvbWlzZSgnb3BlbicsIFsnLVInLCB0YXJnZXRBcHBsaWNhdGlvblBhdGhdLCB7IGRldGFjaGVkOiB0cnVlIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IHVubW91bnRJbWFnZSh0YXJnZXRNb3VudCk7XG4gIH1cbn07XG4iXX0=