'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EXTENSION = '.forge.publish';

class PublishState {
  static loadFromDirectory(directory, rootDir) {
    return (0, _bluebird.coroutine)(function* () {
      if (!(yield _fsExtra2.default.exists(directory))) {
        throw new Error(`Attempted to load publish state from a missing directory: ${directory}`);
      }

      const publishes = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)((yield _fsExtra2.default.readdir(directory))), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const dirName = _step.value;

          const subDir = _path2.default.resolve(directory, dirName);
          const states = [];
          if ((yield _fsExtra2.default.stat(subDir)).isDirectory()) {
            const filePaths = (yield _fsExtra2.default.readdir(subDir)).filter(function (fileName) {
              return fileName.endsWith(EXTENSION);
            }).map(function (fileName) {
              return _path2.default.resolve(subDir, fileName);
            });

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = (0, _getIterator3.default)(filePaths), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                const filePath = _step2.value;

                const state = new PublishState(filePath);
                yield state.load();
                state.state.artifacts = state.state.artifacts.map(function (artifactPath) {
                  return _path2.default.resolve(rootDir, artifactPath);
                });
                states.push(state);
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
          publishes.push(states);
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

      return publishes;
    })();
  }

  static saveToDirectory(directory, artifacts, rootDir) {
    return (0, _bluebird.coroutine)(function* () {
      const id = _crypto2.default.createHash('SHA256').update((0, _stringify2.default)(artifacts)).digest('hex');
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(artifacts), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          const artifact = _step3.value;

          artifact.artifacts = artifact.artifacts.map(function (artifactPath) {
            return _path2.default.relative(rootDir, artifactPath);
          });
          const state = new PublishState(_path2.default.resolve(directory, id, 'null'), '', false);
          state.setState(artifact);
          yield state.saveToDisk();
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    })();
  }

  constructor(filePath, hasHash = true) {
    this.dir = _path2.default.dirname(filePath);
    this.path = filePath;
    this.hasHash = hasHash;
  }

  generateHash() {
    const content = (0, _stringify2.default)(this.state || {});
    return _crypto2.default.createHash('SHA256').update(content).digest('hex');
  }

  setState(state) {
    this.state = state;
  }

  load() {
    var _this = this;

    return (0, _bluebird.coroutine)(function* () {
      _this.state = yield _fsExtra2.default.readJson(_this.path);
    })();
  }

  saveToDisk() {
    var _this2 = this;

    return (0, _bluebird.coroutine)(function* () {
      if (!_this2.hasHash) {
        _this2.path = _path2.default.resolve(_this2.dir, `${_this2.generateHash()}${EXTENSION}`);
        _this2.hasHash = true;
      }

      yield _fsExtra2.default.mkdirs(_path2.default.dirname(_this2.path));
      yield _fsExtra2.default.writeJson(_this2.path, _this2.state);
    })();
  }
}
exports.default = PublishState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvcHVibGlzaC1zdGF0ZS5qcyJdLCJuYW1lcyI6WyJFWFRFTlNJT04iLCJQdWJsaXNoU3RhdGUiLCJsb2FkRnJvbURpcmVjdG9yeSIsImRpcmVjdG9yeSIsInJvb3REaXIiLCJmcyIsImV4aXN0cyIsIkVycm9yIiwicHVibGlzaGVzIiwicmVhZGRpciIsImRpck5hbWUiLCJzdWJEaXIiLCJwYXRoIiwicmVzb2x2ZSIsInN0YXRlcyIsInN0YXQiLCJpc0RpcmVjdG9yeSIsImZpbGVQYXRocyIsImZpbHRlciIsImZpbGVOYW1lIiwiZW5kc1dpdGgiLCJtYXAiLCJmaWxlUGF0aCIsInN0YXRlIiwibG9hZCIsImFydGlmYWN0cyIsImFydGlmYWN0UGF0aCIsInB1c2giLCJzYXZlVG9EaXJlY3RvcnkiLCJpZCIsImNyeXB0byIsImNyZWF0ZUhhc2giLCJ1cGRhdGUiLCJkaWdlc3QiLCJhcnRpZmFjdCIsInJlbGF0aXZlIiwic2V0U3RhdGUiLCJzYXZlVG9EaXNrIiwiY29uc3RydWN0b3IiLCJoYXNIYXNoIiwiZGlyIiwiZGlybmFtZSIsImdlbmVyYXRlSGFzaCIsImNvbnRlbnQiLCJyZWFkSnNvbiIsIm1rZGlycyIsIndyaXRlSnNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsWUFBWSxnQkFBbEI7O0FBRWUsTUFBTUMsWUFBTixDQUFtQjtBQUNoQyxTQUFhQyxpQkFBYixDQUErQkMsU0FBL0IsRUFBMENDLE9BQTFDLEVBQW1EO0FBQUE7QUFDakQsVUFBSSxFQUFDLE1BQU1DLGtCQUFHQyxNQUFILENBQVVILFNBQVYsQ0FBUCxDQUFKLEVBQWlDO0FBQy9CLGNBQU0sSUFBSUksS0FBSixDQUFXLDZEQUE0REosU0FBVSxFQUFqRixDQUFOO0FBQ0Q7O0FBRUQsWUFBTUssWUFBWSxFQUFsQjtBQUxpRDtBQUFBO0FBQUE7O0FBQUE7QUFNakQseURBQXNCLE1BQU1ILGtCQUFHSSxPQUFILENBQVdOLFNBQVgsQ0FBNUIsNkdBQW1EO0FBQUEsZ0JBQXhDTyxPQUF3Qzs7QUFDakQsZ0JBQU1DLFNBQVNDLGVBQUtDLE9BQUwsQ0FBYVYsU0FBYixFQUF3Qk8sT0FBeEIsQ0FBZjtBQUNBLGdCQUFNSSxTQUFTLEVBQWY7QUFDQSxjQUFJLENBQUMsTUFBTVQsa0JBQUdVLElBQUgsQ0FBUUosTUFBUixDQUFQLEVBQXdCSyxXQUF4QixFQUFKLEVBQTJDO0FBQ3pDLGtCQUFNQyxZQUFZLENBQUMsTUFBTVosa0JBQUdJLE9BQUgsQ0FBV0UsTUFBWCxDQUFQLEVBQ2ZPLE1BRGUsQ0FDUjtBQUFBLHFCQUFZQyxTQUFTQyxRQUFULENBQWtCcEIsU0FBbEIsQ0FBWjtBQUFBLGFBRFEsRUFFZnFCLEdBRmUsQ0FFWDtBQUFBLHFCQUFZVCxlQUFLQyxPQUFMLENBQWFGLE1BQWIsRUFBcUJRLFFBQXJCLENBQVo7QUFBQSxhQUZXLENBQWxCOztBQUR5QztBQUFBO0FBQUE7O0FBQUE7QUFLekMsK0RBQXVCRixTQUF2QixpSEFBa0M7QUFBQSxzQkFBdkJLLFFBQXVCOztBQUNoQyxzQkFBTUMsUUFBUSxJQUFJdEIsWUFBSixDQUFpQnFCLFFBQWpCLENBQWQ7QUFDQSxzQkFBTUMsTUFBTUMsSUFBTixFQUFOO0FBQ0FELHNCQUFNQSxLQUFOLENBQVlFLFNBQVosR0FBd0JGLE1BQU1BLEtBQU4sQ0FBWUUsU0FBWixDQUFzQkosR0FBdEIsQ0FBMEI7QUFBQSx5QkFBZ0JULGVBQUtDLE9BQUwsQ0FBYVQsT0FBYixFQUFzQnNCLFlBQXRCLENBQWhCO0FBQUEsaUJBQTFCLENBQXhCO0FBQ0FaLHVCQUFPYSxJQUFQLENBQVlKLEtBQVo7QUFDRDtBQVZ3QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVzFDO0FBQ0RmLG9CQUFVbUIsSUFBVixDQUFlYixNQUFmO0FBQ0Q7QUF0QmdEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBdUJqRCxhQUFPTixTQUFQO0FBdkJpRDtBQXdCbEQ7O0FBRUQsU0FBYW9CLGVBQWIsQ0FBNkJ6QixTQUE3QixFQUF3Q3NCLFNBQXhDLEVBQW1EckIsT0FBbkQsRUFBNEQ7QUFBQTtBQUMxRCxZQUFNeUIsS0FBS0MsaUJBQU9DLFVBQVAsQ0FBa0IsUUFBbEIsRUFBNEJDLE1BQTVCLENBQW1DLHlCQUFlUCxTQUFmLENBQW5DLEVBQThEUSxNQUE5RCxDQUFxRSxLQUFyRSxDQUFYO0FBRDBEO0FBQUE7QUFBQTs7QUFBQTtBQUUxRCx5REFBdUJSLFNBQXZCLGlIQUFrQztBQUFBLGdCQUF2QlMsUUFBdUI7O0FBQ2hDQSxtQkFBU1QsU0FBVCxHQUFxQlMsU0FBU1QsU0FBVCxDQUFtQkosR0FBbkIsQ0FBdUI7QUFBQSxtQkFBZ0JULGVBQUt1QixRQUFMLENBQWMvQixPQUFkLEVBQXVCc0IsWUFBdkIsQ0FBaEI7QUFBQSxXQUF2QixDQUFyQjtBQUNBLGdCQUFNSCxRQUFRLElBQUl0QixZQUFKLENBQWlCVyxlQUFLQyxPQUFMLENBQWFWLFNBQWIsRUFBd0IwQixFQUF4QixFQUE0QixNQUE1QixDQUFqQixFQUFzRCxFQUF0RCxFQUEwRCxLQUExRCxDQUFkO0FBQ0FOLGdCQUFNYSxRQUFOLENBQWVGLFFBQWY7QUFDQSxnQkFBTVgsTUFBTWMsVUFBTixFQUFOO0FBQ0Q7QUFQeUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUTNEOztBQUVEQyxjQUFZaEIsUUFBWixFQUFzQmlCLFVBQVUsSUFBaEMsRUFBc0M7QUFDcEMsU0FBS0MsR0FBTCxHQUFXNUIsZUFBSzZCLE9BQUwsQ0FBYW5CLFFBQWIsQ0FBWDtBQUNBLFNBQUtWLElBQUwsR0FBWVUsUUFBWjtBQUNBLFNBQUtpQixPQUFMLEdBQWVBLE9BQWY7QUFDRDs7QUFFREcsaUJBQWU7QUFDYixVQUFNQyxVQUFVLHlCQUFlLEtBQUtwQixLQUFMLElBQWMsRUFBN0IsQ0FBaEI7QUFDQSxXQUFPTyxpQkFBT0MsVUFBUCxDQUFrQixRQUFsQixFQUE0QkMsTUFBNUIsQ0FBbUNXLE9BQW5DLEVBQTRDVixNQUE1QyxDQUFtRCxLQUFuRCxDQUFQO0FBQ0Q7O0FBRURHLFdBQVNiLEtBQVQsRUFBZ0I7QUFDZCxTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7QUFFS0MsTUFBTixHQUFhO0FBQUE7O0FBQUE7QUFDWCxZQUFLRCxLQUFMLEdBQWEsTUFBTWxCLGtCQUFHdUMsUUFBSCxDQUFZLE1BQUtoQyxJQUFqQixDQUFuQjtBQURXO0FBRVo7O0FBRUt5QixZQUFOLEdBQW1CO0FBQUE7O0FBQUE7QUFDakIsVUFBSSxDQUFDLE9BQUtFLE9BQVYsRUFBbUI7QUFDakIsZUFBSzNCLElBQUwsR0FBWUEsZUFBS0MsT0FBTCxDQUFhLE9BQUsyQixHQUFsQixFQUF3QixHQUFFLE9BQUtFLFlBQUwsRUFBb0IsR0FBRTFDLFNBQVUsRUFBMUQsQ0FBWjtBQUNBLGVBQUt1QyxPQUFMLEdBQWUsSUFBZjtBQUNEOztBQUVELFlBQU1sQyxrQkFBR3dDLE1BQUgsQ0FBVWpDLGVBQUs2QixPQUFMLENBQWEsT0FBSzdCLElBQWxCLENBQVYsQ0FBTjtBQUNBLFlBQU1QLGtCQUFHeUMsU0FBSCxDQUFhLE9BQUtsQyxJQUFsQixFQUF3QixPQUFLVyxLQUE3QixDQUFOO0FBUGlCO0FBUWxCO0FBaEUrQjtrQkFBYnRCLFkiLCJmaWxlIjoidXRpbC9wdWJsaXNoLXN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBFWFRFTlNJT04gPSAnLmZvcmdlLnB1Ymxpc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoU3RhdGUge1xuICBzdGF0aWMgYXN5bmMgbG9hZEZyb21EaXJlY3RvcnkoZGlyZWN0b3J5LCByb290RGlyKSB7XG4gICAgaWYgKCFhd2FpdCBmcy5leGlzdHMoZGlyZWN0b3J5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0ZWQgdG8gbG9hZCBwdWJsaXNoIHN0YXRlIGZyb20gYSBtaXNzaW5nIGRpcmVjdG9yeTogJHtkaXJlY3Rvcnl9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgcHVibGlzaGVzID0gW107XG4gICAgZm9yIChjb25zdCBkaXJOYW1lIG9mIGF3YWl0IGZzLnJlYWRkaXIoZGlyZWN0b3J5KSkge1xuICAgICAgY29uc3Qgc3ViRGlyID0gcGF0aC5yZXNvbHZlKGRpcmVjdG9yeSwgZGlyTmFtZSk7XG4gICAgICBjb25zdCBzdGF0ZXMgPSBbXTtcbiAgICAgIGlmICgoYXdhaXQgZnMuc3RhdChzdWJEaXIpKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVQYXRocyA9IChhd2FpdCBmcy5yZWFkZGlyKHN1YkRpcikpXG4gICAgICAgICAgLmZpbHRlcihmaWxlTmFtZSA9PiBmaWxlTmFtZS5lbmRzV2l0aChFWFRFTlNJT04pKVxuICAgICAgICAgIC5tYXAoZmlsZU5hbWUgPT4gcGF0aC5yZXNvbHZlKHN1YkRpciwgZmlsZU5hbWUpKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGVQYXRoIG9mIGZpbGVQYXRocykge1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0gbmV3IFB1Ymxpc2hTdGF0ZShmaWxlUGF0aCk7XG4gICAgICAgICAgYXdhaXQgc3RhdGUubG9hZCgpO1xuICAgICAgICAgIHN0YXRlLnN0YXRlLmFydGlmYWN0cyA9IHN0YXRlLnN0YXRlLmFydGlmYWN0cy5tYXAoYXJ0aWZhY3RQYXRoID0+IHBhdGgucmVzb2x2ZShyb290RGlyLCBhcnRpZmFjdFBhdGgpKTtcbiAgICAgICAgICBzdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHB1Ymxpc2hlcy5wdXNoKHN0YXRlcyk7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaXNoZXM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgc2F2ZVRvRGlyZWN0b3J5KGRpcmVjdG9yeSwgYXJ0aWZhY3RzLCByb290RGlyKSB7XG4gICAgY29uc3QgaWQgPSBjcnlwdG8uY3JlYXRlSGFzaCgnU0hBMjU2JykudXBkYXRlKEpTT04uc3RyaW5naWZ5KGFydGlmYWN0cykpLmRpZ2VzdCgnaGV4Jyk7XG4gICAgZm9yIChjb25zdCBhcnRpZmFjdCBvZiBhcnRpZmFjdHMpIHtcbiAgICAgIGFydGlmYWN0LmFydGlmYWN0cyA9IGFydGlmYWN0LmFydGlmYWN0cy5tYXAoYXJ0aWZhY3RQYXRoID0+IHBhdGgucmVsYXRpdmUocm9vdERpciwgYXJ0aWZhY3RQYXRoKSk7XG4gICAgICBjb25zdCBzdGF0ZSA9IG5ldyBQdWJsaXNoU3RhdGUocGF0aC5yZXNvbHZlKGRpcmVjdG9yeSwgaWQsICdudWxsJyksICcnLCBmYWxzZSk7XG4gICAgICBzdGF0ZS5zZXRTdGF0ZShhcnRpZmFjdCk7XG4gICAgICBhd2FpdCBzdGF0ZS5zYXZlVG9EaXNrKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZmlsZVBhdGgsIGhhc0hhc2ggPSB0cnVlKSB7XG4gICAgdGhpcy5kaXIgPSBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xuICAgIHRoaXMucGF0aCA9IGZpbGVQYXRoO1xuICAgIHRoaXMuaGFzSGFzaCA9IGhhc0hhc2g7XG4gIH1cblxuICBnZW5lcmF0ZUhhc2goKSB7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUgfHwge30pO1xuICAgIHJldHVybiBjcnlwdG8uY3JlYXRlSGFzaCgnU0hBMjU2JykudXBkYXRlKGNvbnRlbnQpLmRpZ2VzdCgnaGV4Jyk7XG4gIH1cblxuICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIGFzeW5jIGxvYWQoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IGF3YWl0IGZzLnJlYWRKc29uKHRoaXMucGF0aCk7XG4gIH1cblxuICBhc3luYyBzYXZlVG9EaXNrKCkge1xuICAgIGlmICghdGhpcy5oYXNIYXNoKSB7XG4gICAgICB0aGlzLnBhdGggPSBwYXRoLnJlc29sdmUodGhpcy5kaXIsIGAke3RoaXMuZ2VuZXJhdGVIYXNoKCl9JHtFWFRFTlNJT059YCk7XG4gICAgICB0aGlzLmhhc0hhc2ggPSB0cnVlO1xuICAgIH1cblxuICAgIGF3YWl0IGZzLm1rZGlycyhwYXRoLmRpcm5hbWUodGhpcy5wYXRoKSk7XG4gICAgYXdhaXQgZnMud3JpdGVKc29uKHRoaXMucGF0aCwgdGhpcy5zdGF0ZSk7XG4gIH1cbn1cbiJdfQ==