'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _confirmIfInteractive = require('../util/confirm-if-interactive');

var _confirmIfInteractive2 = _interopRequireDefault(_confirmIfInteractive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:init:directory');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir, interactive) {
    yield (0, _oraHandler2.default)('Initializing Project Directory', (() => {
      var _ref2 = (0, _bluebird.coroutine)(function* (initSpinner) {
        d('creating directory:', dir);
        yield _fsExtra2.default.mkdirs(dir);

        const files = yield _fsExtra2.default.readdir(dir);
        if (files.length !== 0) {
          d('found', files.length, 'files in the directory.  warning the user');
          initSpinner.stop(_logSymbols2.default.warning);
          const confirm = yield (0, _confirmIfInteractive2.default)(interactive, `WARNING: The specified path: "${dir}" is not empty, do you wish to continue?`);
          if (!confirm) {
            throw 'Cancelled by user'; // eslint-disable-line
          }
        }
      });

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    })());
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQvaW5pdC1kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZCIsImRpciIsImludGVyYWN0aXZlIiwiaW5pdFNwaW5uZXIiLCJmcyIsIm1rZGlycyIsImZpbGVzIiwicmVhZGRpciIsImxlbmd0aCIsInN0b3AiLCJsb2dTeW1ib2xzIiwid2FybmluZyIsImNvbmZpcm0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxxQkFBTSwrQkFBTixDQUFWOzs7c0NBRWUsV0FBT0MsR0FBUCxFQUFZQyxXQUFaLEVBQTRCO0FBQ3pDLFVBQU0sMEJBQVMsZ0NBQVQ7QUFBQSwyQ0FBMkMsV0FBT0MsV0FBUCxFQUF1QjtBQUN0RUgsVUFBRSxxQkFBRixFQUF5QkMsR0FBekI7QUFDQSxjQUFNRyxrQkFBR0MsTUFBSCxDQUFVSixHQUFWLENBQU47O0FBRUEsY0FBTUssUUFBUSxNQUFNRixrQkFBR0csT0FBSCxDQUFXTixHQUFYLENBQXBCO0FBQ0EsWUFBSUssTUFBTUUsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QlIsWUFBRSxPQUFGLEVBQVdNLE1BQU1FLE1BQWpCLEVBQXlCLDJDQUF6QjtBQUNBTCxzQkFBWU0sSUFBWixDQUFpQkMscUJBQVdDLE9BQTVCO0FBQ0EsZ0JBQU1DLFVBQVUsTUFBTSxvQ0FBcUJWLFdBQXJCLEVBQW1DLGlDQUFnQ0QsR0FBSSwwQ0FBdkUsQ0FBdEI7QUFDQSxjQUFJLENBQUNXLE9BQUwsRUFBYztBQUNaLGtCQUFNLG1CQUFOLENBRFksQ0FDZTtBQUM1QjtBQUNGO0FBQ0YsT0FiSzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFOO0FBY0QsRyIsImZpbGUiOiJpbml0L2luaXQtZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgbG9nU3ltYm9scyBmcm9tICdsb2ctc3ltYm9scyc7XG5cbmltcG9ydCBhc3luY09yYSBmcm9tICcuLi91dGlsL29yYS1oYW5kbGVyJztcbmltcG9ydCBjb25maXJtSWZJbnRlcmFjdGl2ZSBmcm9tICcuLi91dGlsL2NvbmZpcm0taWYtaW50ZXJhY3RpdmUnO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmluaXQ6ZGlyZWN0b3J5Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChkaXIsIGludGVyYWN0aXZlKSA9PiB7XG4gIGF3YWl0IGFzeW5jT3JhKCdJbml0aWFsaXppbmcgUHJvamVjdCBEaXJlY3RvcnknLCBhc3luYyAoaW5pdFNwaW5uZXIpID0+IHtcbiAgICBkKCdjcmVhdGluZyBkaXJlY3Rvcnk6JywgZGlyKTtcbiAgICBhd2FpdCBmcy5ta2RpcnMoZGlyKTtcblxuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgZnMucmVhZGRpcihkaXIpO1xuICAgIGlmIChmaWxlcy5sZW5ndGggIT09IDApIHtcbiAgICAgIGQoJ2ZvdW5kJywgZmlsZXMubGVuZ3RoLCAnZmlsZXMgaW4gdGhlIGRpcmVjdG9yeS4gIHdhcm5pbmcgdGhlIHVzZXInKTtcbiAgICAgIGluaXRTcGlubmVyLnN0b3AobG9nU3ltYm9scy53YXJuaW5nKTtcbiAgICAgIGNvbnN0IGNvbmZpcm0gPSBhd2FpdCBjb25maXJtSWZJbnRlcmFjdGl2ZShpbnRlcmFjdGl2ZSwgYFdBUk5JTkc6IFRoZSBzcGVjaWZpZWQgcGF0aDogXCIke2Rpcn1cIiBpcyBub3QgZW1wdHksIGRvIHlvdSB3aXNoIHRvIGNvbnRpbnVlP2ApO1xuICAgICAgaWYgKCFjb25maXJtKSB7XG4gICAgICAgIHRocm93ICdDYW5jZWxsZWQgYnkgdXNlcic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==