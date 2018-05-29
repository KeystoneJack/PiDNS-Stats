'use strict';

var _bluebird = require('bluebird');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

require('./util/terminate');

var _package = require('./api/package');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _bluebird.coroutine)(function* () {
  let dir = process.cwd();

  _commander2.default.version(require('../package.json').version).arguments('[cwd]').option('-a, --arch [arch]', 'Target architecture').option('-p, --platform [platform]', 'Target build platform').action(function (cwd) {
    if (!cwd) return;
    if (_path2.default.isAbsolute(cwd) && _fsExtra2.default.existsSync(cwd)) {
      dir = cwd;
    } else if (_fsExtra2.default.existsSync(_path2.default.resolve(dir, cwd))) {
      dir = _path2.default.resolve(dir, cwd);
    }
  }).parse(process.argv);

  const packageOpts = {
    dir,
    interactive: true
  };
  if (_commander2.default.arch) packageOpts.arch = _commander2.default.arch;
  if (_commander2.default.platform) packageOpts.platform = _commander2.default.platform;

  yield (0, _package2.default)(packageOpts);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZWN0cm9uLWZvcmdlLXBhY2thZ2UuanMiXSwibmFtZXMiOlsiZGlyIiwicHJvY2VzcyIsImN3ZCIsInByb2dyYW0iLCJ2ZXJzaW9uIiwicmVxdWlyZSIsImFyZ3VtZW50cyIsIm9wdGlvbiIsImFjdGlvbiIsInBhdGgiLCJpc0Fic29sdXRlIiwiZnMiLCJleGlzdHNTeW5jIiwicmVzb2x2ZSIsInBhcnNlIiwiYXJndiIsInBhY2thZ2VPcHRzIiwiaW50ZXJhY3RpdmUiLCJhcmNoIiwicGxhdGZvcm0iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7O0FBRUEseUJBQUMsYUFBWTtBQUNYLE1BQUlBLE1BQU1DLFFBQVFDLEdBQVIsRUFBVjs7QUFFQUMsc0JBQ0dDLE9BREgsQ0FDV0MsUUFBUSxpQkFBUixFQUEyQkQsT0FEdEMsRUFFR0UsU0FGSCxDQUVhLE9BRmIsRUFHR0MsTUFISCxDQUdVLG1CQUhWLEVBRytCLHFCQUgvQixFQUlHQSxNQUpILENBSVUsMkJBSlYsRUFJdUMsdUJBSnZDLEVBS0dDLE1BTEgsQ0FLVSxVQUFDTixHQUFELEVBQVM7QUFDZixRQUFJLENBQUNBLEdBQUwsRUFBVTtBQUNWLFFBQUlPLGVBQUtDLFVBQUwsQ0FBZ0JSLEdBQWhCLEtBQXdCUyxrQkFBR0MsVUFBSCxDQUFjVixHQUFkLENBQTVCLEVBQWdEO0FBQzlDRixZQUFNRSxHQUFOO0FBQ0QsS0FGRCxNQUVPLElBQUlTLGtCQUFHQyxVQUFILENBQWNILGVBQUtJLE9BQUwsQ0FBYWIsR0FBYixFQUFrQkUsR0FBbEIsQ0FBZCxDQUFKLEVBQTJDO0FBQ2hERixZQUFNUyxlQUFLSSxPQUFMLENBQWFiLEdBQWIsRUFBa0JFLEdBQWxCLENBQU47QUFDRDtBQUNGLEdBWkgsRUFhR1ksS0FiSCxDQWFTYixRQUFRYyxJQWJqQjs7QUFlQSxRQUFNQyxjQUFjO0FBQ2xCaEIsT0FEa0I7QUFFbEJpQixpQkFBYTtBQUZLLEdBQXBCO0FBSUEsTUFBSWQsb0JBQVFlLElBQVosRUFBa0JGLFlBQVlFLElBQVosR0FBbUJmLG9CQUFRZSxJQUEzQjtBQUNsQixNQUFJZixvQkFBUWdCLFFBQVosRUFBc0JILFlBQVlHLFFBQVosR0FBdUJoQixvQkFBUWdCLFFBQS9COztBQUV0QixRQUFNLHVCQUFXSCxXQUFYLENBQU47QUFDRCxDQTFCRCIsImZpbGUiOiJlbGVjdHJvbi1mb3JnZS1wYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcblxuaW1wb3J0ICcuL3V0aWwvdGVybWluYXRlJztcbmltcG9ydCBwYWNrYWdlQVBJIGZyb20gJy4vYXBpL3BhY2thZ2UnO1xuXG4oYXN5bmMgKCkgPT4ge1xuICBsZXQgZGlyID0gcHJvY2Vzcy5jd2QoKTtcblxuICBwcm9ncmFtXG4gICAgLnZlcnNpb24ocmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbilcbiAgICAuYXJndW1lbnRzKCdbY3dkXScpXG4gICAgLm9wdGlvbignLWEsIC0tYXJjaCBbYXJjaF0nLCAnVGFyZ2V0IGFyY2hpdGVjdHVyZScpXG4gICAgLm9wdGlvbignLXAsIC0tcGxhdGZvcm0gW3BsYXRmb3JtXScsICdUYXJnZXQgYnVpbGQgcGxhdGZvcm0nKVxuICAgIC5hY3Rpb24oKGN3ZCkgPT4ge1xuICAgICAgaWYgKCFjd2QpIHJldHVybjtcbiAgICAgIGlmIChwYXRoLmlzQWJzb2x1dGUoY3dkKSAmJiBmcy5leGlzdHNTeW5jKGN3ZCkpIHtcbiAgICAgICAgZGlyID0gY3dkO1xuICAgICAgfSBlbHNlIGlmIChmcy5leGlzdHNTeW5jKHBhdGgucmVzb2x2ZShkaXIsIGN3ZCkpKSB7XG4gICAgICAgIGRpciA9IHBhdGgucmVzb2x2ZShkaXIsIGN3ZCk7XG4gICAgICB9XG4gICAgfSlcbiAgICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuICBjb25zdCBwYWNrYWdlT3B0cyA9IHtcbiAgICBkaXIsXG4gICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gIH07XG4gIGlmIChwcm9ncmFtLmFyY2gpIHBhY2thZ2VPcHRzLmFyY2ggPSBwcm9ncmFtLmFyY2g7XG4gIGlmIChwcm9ncmFtLnBsYXRmb3JtKSBwYWNrYWdlT3B0cy5wbGF0Zm9ybSA9IHByb2dyYW0ucGxhdGZvcm07XG5cbiAgYXdhaXQgcGFja2FnZUFQSShwYWNrYWdlT3B0cyk7XG59KSgpO1xuIl19