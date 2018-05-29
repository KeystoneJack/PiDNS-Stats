'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmountImage = exports.mountImage = exports.getMountedImages = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

var _crossSpawnPromise = require('cross-spawn-promise');

var _crossSpawnPromise2 = _interopRequireDefault(_crossSpawnPromise);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:hdiutil');

const getMountedImages = exports.getMountedImages = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    const output = yield (0, _crossSpawnPromise2.default)('hdiutil', ['info']);
    const mounts = output.toString().split(/====\n/g);
    mounts.shift();

    const mountObjects = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(mounts), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const mount = _step.value;

        try {
          const mountPath = /\/Volumes\/(.+)\n/g.exec(mount)[1];
          const imagePath = /image-path +: +(.+)\n/g.exec(mount)[1];
          mountObjects.push({ mountPath, imagePath });
        } catch (err) {
          // Ignore
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

    d('identified active mounts', mountObjects);
    return mountObjects;
  });

  return function getMountedImages() {
    return _ref.apply(this, arguments);
  };
})();

const mountImage = exports.mountImage = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* (filePath) {
    d('mounting image:', filePath);
    const output = yield (0, _crossSpawnPromise2.default)('hdiutil', ['attach', '-noautoopen', '-nobrowse', '-noverify', filePath]);
    const mountPath = /\/Volumes\/(.+)\n/g.exec(output.toString())[1];
    d('mounted at:', mountPath);

    return {
      mountPath,
      imagePath: filePath
    };
  });

  return function mountImage(_x) {
    return _ref2.apply(this, arguments);
  };
})();

const unmountImage = exports.unmountImage = (() => {
  var _ref3 = (0, _bluebird.coroutine)(function* (mount) {
    d('unmounting current mount:', mount);
    yield (0, _crossSpawnPromise2.default)('hdiutil', ['unmount', '-force', `/Volumes/${mount.mountPath}`]);
  });

  return function unmountImage(_x2) {
    return _ref3.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvaGRpdXRpbC5qcyJdLCJuYW1lcyI6WyJkIiwiZ2V0TW91bnRlZEltYWdlcyIsIm91dHB1dCIsIm1vdW50cyIsInRvU3RyaW5nIiwic3BsaXQiLCJzaGlmdCIsIm1vdW50T2JqZWN0cyIsIm1vdW50IiwibW91bnRQYXRoIiwiZXhlYyIsImltYWdlUGF0aCIsInB1c2giLCJlcnIiLCJtb3VudEltYWdlIiwiZmlsZVBhdGgiLCJ1bm1vdW50SW1hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLHdCQUFOLENBQVY7O0FBRU8sTUFBTUM7QUFBQSxzQ0FBbUIsYUFBWTtBQUMxQyxVQUFNQyxTQUFTLE1BQU0saUNBQWEsU0FBYixFQUF3QixDQUFDLE1BQUQsQ0FBeEIsQ0FBckI7QUFDQSxVQUFNQyxTQUFTRCxPQUFPRSxRQUFQLEdBQWtCQyxLQUFsQixDQUF3QixTQUF4QixDQUFmO0FBQ0FGLFdBQU9HLEtBQVA7O0FBRUEsVUFBTUMsZUFBZSxFQUFyQjs7QUFMMEM7QUFBQTtBQUFBOztBQUFBO0FBTzFDLHNEQUFvQkosTUFBcEIsNEdBQTRCO0FBQUEsY0FBakJLLEtBQWlCOztBQUMxQixZQUFJO0FBQ0YsZ0JBQU1DLFlBQVkscUJBQXFCQyxJQUFyQixDQUEwQkYsS0FBMUIsRUFBaUMsQ0FBakMsQ0FBbEI7QUFDQSxnQkFBTUcsWUFBWSx5QkFBeUJELElBQXpCLENBQThCRixLQUE5QixFQUFxQyxDQUFyQyxDQUFsQjtBQUNBRCx1QkFBYUssSUFBYixDQUFrQixFQUFFSCxTQUFGLEVBQWFFLFNBQWIsRUFBbEI7QUFDRCxTQUpELENBSUUsT0FBT0UsR0FBUCxFQUFZO0FBQ1o7QUFDRDtBQUNGO0FBZnlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBaUIxQ2IsTUFBRSwwQkFBRixFQUE4Qk8sWUFBOUI7QUFDQSxXQUFPQSxZQUFQO0FBQ0QsR0FuQlk7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7QUFxQkEsTUFBTU87QUFBQSx1Q0FBYSxXQUFPQyxRQUFQLEVBQW9CO0FBQzVDZixNQUFFLGlCQUFGLEVBQXFCZSxRQUFyQjtBQUNBLFVBQU1iLFNBQVMsTUFBTSxpQ0FBYSxTQUFiLEVBQXdCLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsV0FBMUIsRUFBdUMsV0FBdkMsRUFBb0RhLFFBQXBELENBQXhCLENBQXJCO0FBQ0EsVUFBTU4sWUFBWSxxQkFBcUJDLElBQXJCLENBQTBCUixPQUFPRSxRQUFQLEVBQTFCLEVBQTZDLENBQTdDLENBQWxCO0FBQ0FKLE1BQUUsYUFBRixFQUFpQlMsU0FBakI7O0FBRUEsV0FBTztBQUNMQSxlQURLO0FBRUxFLGlCQUFXSTtBQUZOLEtBQVA7QUFJRCxHQVZZOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU47O0FBWUEsTUFBTUM7QUFBQSx1Q0FBZSxXQUFPUixLQUFQLEVBQWlCO0FBQzNDUixNQUFFLDJCQUFGLEVBQStCUSxLQUEvQjtBQUNBLFVBQU0saUNBQWEsU0FBYixFQUF3QixDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXVCLFlBQVdBLE1BQU1DLFNBQVUsRUFBbEQsQ0FBeEIsQ0FBTjtBQUNELEdBSFk7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTiIsImZpbGUiOiJ1dGlsL2hkaXV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3Bhd25Qcm9taXNlIGZyb20gJ2Nyb3NzLXNwYXduLXByb21pc2UnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpoZGl1dGlsJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRNb3VudGVkSW1hZ2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvdXRwdXQgPSBhd2FpdCBzcGF3blByb21pc2UoJ2hkaXV0aWwnLCBbJ2luZm8nXSk7XG4gIGNvbnN0IG1vdW50cyA9IG91dHB1dC50b1N0cmluZygpLnNwbGl0KC89PT09XFxuL2cpO1xuICBtb3VudHMuc2hpZnQoKTtcblxuICBjb25zdCBtb3VudE9iamVjdHMgPSBbXTtcblxuICBmb3IgKGNvbnN0IG1vdW50IG9mIG1vdW50cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtb3VudFBhdGggPSAvXFwvVm9sdW1lc1xcLyguKylcXG4vZy5leGVjKG1vdW50KVsxXTtcbiAgICAgIGNvbnN0IGltYWdlUGF0aCA9IC9pbWFnZS1wYXRoICs6ICsoLispXFxuL2cuZXhlYyhtb3VudClbMV07XG4gICAgICBtb3VudE9iamVjdHMucHVzaCh7IG1vdW50UGF0aCwgaW1hZ2VQYXRoIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSWdub3JlXG4gICAgfVxuICB9XG5cbiAgZCgnaWRlbnRpZmllZCBhY3RpdmUgbW91bnRzJywgbW91bnRPYmplY3RzKTtcbiAgcmV0dXJuIG1vdW50T2JqZWN0cztcbn07XG5cbmV4cG9ydCBjb25zdCBtb3VudEltYWdlID0gYXN5bmMgKGZpbGVQYXRoKSA9PiB7XG4gIGQoJ21vdW50aW5nIGltYWdlOicsIGZpbGVQYXRoKTtcbiAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgc3Bhd25Qcm9taXNlKCdoZGl1dGlsJywgWydhdHRhY2gnLCAnLW5vYXV0b29wZW4nLCAnLW5vYnJvd3NlJywgJy1ub3ZlcmlmeScsIGZpbGVQYXRoXSk7XG4gIGNvbnN0IG1vdW50UGF0aCA9IC9cXC9Wb2x1bWVzXFwvKC4rKVxcbi9nLmV4ZWMob3V0cHV0LnRvU3RyaW5nKCkpWzFdO1xuICBkKCdtb3VudGVkIGF0OicsIG1vdW50UGF0aCk7XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudFBhdGgsXG4gICAgaW1hZ2VQYXRoOiBmaWxlUGF0aCxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB1bm1vdW50SW1hZ2UgPSBhc3luYyAobW91bnQpID0+IHtcbiAgZCgndW5tb3VudGluZyBjdXJyZW50IG1vdW50OicsIG1vdW50KTtcbiAgYXdhaXQgc3Bhd25Qcm9taXNlKCdoZGl1dGlsJywgWyd1bm1vdW50JywgJy1mb3JjZScsIGAvVm9sdW1lcy8ke21vdW50Lm1vdW50UGF0aH1gXSk7XG59O1xuIl19