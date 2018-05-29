'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:runtime-config');

/*
 * Let's be real: sharing config across spawned processes must be easier than
 * this...
 */
class BasicConfigStore {
  constructor() {
    this._store = {};
    this._dir = _path2.default.resolve(_os2.default.tmpdir(), 'electron-forge');
    this._path = _path2.default.resolve(this._dir, '.runtime.config');
    _fsExtra2.default.mkdirsSync(this._dir);

    process.on('exit', () => {
      this.reset();
    });
  }

  get(key) {
    this._load();
    d('fetching key', key);
    return this._store[key];
  }

  set(key, value) {
    this._load();
    this._store[key] = value;
    d('setting key:', key, 'to value:', value);
    _fsExtra2.default.writeJsonSync(this._path, this._store);
  }

  _load() {
    if (_fsExtra2.default.existsSync(this._path)) {
      this._store = _fsExtra2.default.readJsonSync(this._path);
    }
  }

  reset() {
    this._store = {};
    _fsExtra2.default.writeJsonSync(this._path, this._store);
  }
}

exports.default = new BasicConfigStore();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvY29uZmlnLmpzIl0sIm5hbWVzIjpbImQiLCJCYXNpY0NvbmZpZ1N0b3JlIiwiY29uc3RydWN0b3IiLCJfc3RvcmUiLCJfZGlyIiwicGF0aCIsInJlc29sdmUiLCJvcyIsInRtcGRpciIsIl9wYXRoIiwiZnMiLCJta2RpcnNTeW5jIiwicHJvY2VzcyIsIm9uIiwicmVzZXQiLCJnZXQiLCJrZXkiLCJfbG9hZCIsInNldCIsInZhbHVlIiwid3JpdGVKc29uU3luYyIsImV4aXN0c1N5bmMiLCJyZWFkSnNvblN5bmMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLCtCQUFOLENBQVY7O0FBRUE7Ozs7QUFJQSxNQUFNQyxnQkFBTixDQUF1QjtBQUNyQkMsZ0JBQWM7QUFDWixTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLElBQUwsR0FBWUMsZUFBS0MsT0FBTCxDQUFhQyxhQUFHQyxNQUFILEVBQWIsRUFBMEIsZ0JBQTFCLENBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWFKLGVBQUtDLE9BQUwsQ0FBYSxLQUFLRixJQUFsQixFQUF3QixpQkFBeEIsQ0FBYjtBQUNBTSxzQkFBR0MsVUFBSCxDQUFjLEtBQUtQLElBQW5COztBQUVBUSxZQUFRQyxFQUFSLENBQVcsTUFBWCxFQUFtQixNQUFNO0FBQ3ZCLFdBQUtDLEtBQUw7QUFDRCxLQUZEO0FBR0Q7O0FBRURDLE1BQUlDLEdBQUosRUFBUztBQUNQLFNBQUtDLEtBQUw7QUFDQWpCLE1BQUUsY0FBRixFQUFrQmdCLEdBQWxCO0FBQ0EsV0FBTyxLQUFLYixNQUFMLENBQVlhLEdBQVosQ0FBUDtBQUNEOztBQUVERSxNQUFJRixHQUFKLEVBQVNHLEtBQVQsRUFBZ0I7QUFDZCxTQUFLRixLQUFMO0FBQ0EsU0FBS2QsTUFBTCxDQUFZYSxHQUFaLElBQW1CRyxLQUFuQjtBQUNBbkIsTUFBRSxjQUFGLEVBQWtCZ0IsR0FBbEIsRUFBdUIsV0FBdkIsRUFBb0NHLEtBQXBDO0FBQ0FULHNCQUFHVSxhQUFILENBQWlCLEtBQUtYLEtBQXRCLEVBQTZCLEtBQUtOLE1BQWxDO0FBQ0Q7O0FBRURjLFVBQVE7QUFDTixRQUFJUCxrQkFBR1csVUFBSCxDQUFjLEtBQUtaLEtBQW5CLENBQUosRUFBK0I7QUFDN0IsV0FBS04sTUFBTCxHQUFjTyxrQkFBR1ksWUFBSCxDQUFnQixLQUFLYixLQUFyQixDQUFkO0FBQ0Q7QUFDRjs7QUFFREssVUFBUTtBQUNOLFNBQUtYLE1BQUwsR0FBYyxFQUFkO0FBQ0FPLHNCQUFHVSxhQUFILENBQWlCLEtBQUtYLEtBQXRCLEVBQTZCLEtBQUtOLE1BQWxDO0FBQ0Q7QUFsQ29COztrQkFxQ1IsSUFBSUYsZ0JBQUosRSIsImZpbGUiOiJ1dGlsL2NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOnJ1bnRpbWUtY29uZmlnJyk7XG5cbi8qXG4gKiBMZXQncyBiZSByZWFsOiBzaGFyaW5nIGNvbmZpZyBhY3Jvc3Mgc3Bhd25lZCBwcm9jZXNzZXMgbXVzdCBiZSBlYXNpZXIgdGhhblxuICogdGhpcy4uLlxuICovXG5jbGFzcyBCYXNpY0NvbmZpZ1N0b3JlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc3RvcmUgPSB7fTtcbiAgICB0aGlzLl9kaXIgPSBwYXRoLnJlc29sdmUob3MudG1wZGlyKCksICdlbGVjdHJvbi1mb3JnZScpO1xuICAgIHRoaXMuX3BhdGggPSBwYXRoLnJlc29sdmUodGhpcy5fZGlyLCAnLnJ1bnRpbWUuY29uZmlnJyk7XG4gICAgZnMubWtkaXJzU3luYyh0aGlzLl9kaXIpO1xuXG4gICAgcHJvY2Vzcy5vbignZXhpdCcsICgpID0+IHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldChrZXkpIHtcbiAgICB0aGlzLl9sb2FkKCk7XG4gICAgZCgnZmV0Y2hpbmcga2V5Jywga2V5KTtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmVba2V5XTtcbiAgfVxuXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5fbG9hZCgpO1xuICAgIHRoaXMuX3N0b3JlW2tleV0gPSB2YWx1ZTtcbiAgICBkKCdzZXR0aW5nIGtleTonLCBrZXksICd0byB2YWx1ZTonLCB2YWx1ZSk7XG4gICAgZnMud3JpdGVKc29uU3luYyh0aGlzLl9wYXRoLCB0aGlzLl9zdG9yZSk7XG4gIH1cblxuICBfbG9hZCgpIHtcbiAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLl9wYXRoKSkge1xuICAgICAgdGhpcy5fc3RvcmUgPSBmcy5yZWFkSnNvblN5bmModGhpcy5fcGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5fc3RvcmUgPSB7fTtcbiAgICBmcy53cml0ZUpzb25TeW5jKHRoaXMuX3BhdGgsIHRoaXMuX3N0b3JlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQmFzaWNDb25maWdTdG9yZSgpO1xuIl19