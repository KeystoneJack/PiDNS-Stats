'use strict';

var _bluebird = require('bluebird');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

require('./util/terminate');

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _bluebird.coroutine)(function* () {
  let dir = process.cwd();
  _commander2.default.version(require('../package.json').version).arguments('[cwd]').action(function (cwd) {
    if (!cwd) return;
    if (_path2.default.isAbsolute(cwd) && _fs2.default.existsSync(cwd)) {
      dir = cwd;
    } else if (_fs2.default.existsSync(_path2.default.resolve(dir, cwd))) {
      dir = _path2.default.resolve(dir, cwd);
    }
  }).parse(process.argv);

  yield (0, _api.lint)({
    dir,
    interactive: true
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZWN0cm9uLWZvcmdlLWxpbnQuanMiXSwibmFtZXMiOlsiZGlyIiwicHJvY2VzcyIsImN3ZCIsInByb2dyYW0iLCJ2ZXJzaW9uIiwicmVxdWlyZSIsImFyZ3VtZW50cyIsImFjdGlvbiIsInBhdGgiLCJpc0Fic29sdXRlIiwiZnMiLCJleGlzdHNTeW5jIiwicmVzb2x2ZSIsInBhcnNlIiwiYXJndiIsImludGVyYWN0aXZlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFFQSx5QkFBQyxhQUFZO0FBQ1gsTUFBSUEsTUFBTUMsUUFBUUMsR0FBUixFQUFWO0FBQ0FDLHNCQUNHQyxPQURILENBQ1dDLFFBQVEsaUJBQVIsRUFBMkJELE9BRHRDLEVBRUdFLFNBRkgsQ0FFYSxPQUZiLEVBR0dDLE1BSEgsQ0FHVSxVQUFDTCxHQUFELEVBQVM7QUFDZixRQUFJLENBQUNBLEdBQUwsRUFBVTtBQUNWLFFBQUlNLGVBQUtDLFVBQUwsQ0FBZ0JQLEdBQWhCLEtBQXdCUSxhQUFHQyxVQUFILENBQWNULEdBQWQsQ0FBNUIsRUFBZ0Q7QUFDOUNGLFlBQU1FLEdBQU47QUFDRCxLQUZELE1BRU8sSUFBSVEsYUFBR0MsVUFBSCxDQUFjSCxlQUFLSSxPQUFMLENBQWFaLEdBQWIsRUFBa0JFLEdBQWxCLENBQWQsQ0FBSixFQUEyQztBQUNoREYsWUFBTVEsZUFBS0ksT0FBTCxDQUFhWixHQUFiLEVBQWtCRSxHQUFsQixDQUFOO0FBQ0Q7QUFDRixHQVZILEVBV0dXLEtBWEgsQ0FXU1osUUFBUWEsSUFYakI7O0FBYUEsUUFBTSxlQUFLO0FBQ1RkLE9BRFM7QUFFVGUsaUJBQWE7QUFGSixHQUFMLENBQU47QUFJRCxDQW5CRCIsImZpbGUiOiJlbGVjdHJvbi1mb3JnZS1saW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcblxuaW1wb3J0ICcuL3V0aWwvdGVybWluYXRlJztcbmltcG9ydCB7IGxpbnQgfSBmcm9tICcuL2FwaSc7XG5cbihhc3luYyAoKSA9PiB7XG4gIGxldCBkaXIgPSBwcm9jZXNzLmN3ZCgpO1xuICBwcm9ncmFtXG4gICAgLnZlcnNpb24ocmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbilcbiAgICAuYXJndW1lbnRzKCdbY3dkXScpXG4gICAgLmFjdGlvbigoY3dkKSA9PiB7XG4gICAgICBpZiAoIWN3ZCkgcmV0dXJuO1xuICAgICAgaWYgKHBhdGguaXNBYnNvbHV0ZShjd2QpICYmIGZzLmV4aXN0c1N5bmMoY3dkKSkge1xuICAgICAgICBkaXIgPSBjd2Q7XG4gICAgICB9IGVsc2UgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5yZXNvbHZlKGRpciwgY3dkKSkpIHtcbiAgICAgICAgZGlyID0gcGF0aC5yZXNvbHZlKGRpciwgY3dkKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG4gIGF3YWl0IGxpbnQoe1xuICAgIGRpcixcbiAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgfSk7XG59KSgpO1xuIl19