'use strict';

var _bluebird = require('bluebird');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

require('./util/terminate');

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _bluebird.coroutine)(function* () {
  let dir = process.cwd();
  _commander2.default.version(require('../package.json').version).arguments('[name]').option('-t, --template [name]', 'Name of the forge template to use').option('-l, --lintStyle [style]', 'Linting standard to follow.  For the default template it can be "airbnb" or "standard"', 'airbnb').option('-c, --copy-ci-files', 'Whether to copy the templated CI files (defaults to false)', false).action(function (name) {
    if (!name) return;
    if (_path2.default.isAbsolute(name)) {
      dir = name;
    } else {
      dir = _path2.default.resolve(dir, name);
    }
  }).parse(process.argv);

  const initOpts = {
    dir,
    interactive: true,
    lintStyle: _commander2.default.lintStyle,
    copyCIFiles: !!_commander2.default.copyCiFiles
  };
  if (_commander2.default.template) initOpts.template = _commander2.default.template;

  yield (0, _api.init)(initOpts);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZWN0cm9uLWZvcmdlLWluaXQuanMiXSwibmFtZXMiOlsiZGlyIiwicHJvY2VzcyIsImN3ZCIsInByb2dyYW0iLCJ2ZXJzaW9uIiwicmVxdWlyZSIsImFyZ3VtZW50cyIsIm9wdGlvbiIsImFjdGlvbiIsIm5hbWUiLCJwYXRoIiwiaXNBYnNvbHV0ZSIsInJlc29sdmUiLCJwYXJzZSIsImFyZ3YiLCJpbml0T3B0cyIsImludGVyYWN0aXZlIiwibGludFN0eWxlIiwiY29weUNJRmlsZXMiLCJjb3B5Q2lGaWxlcyIsInRlbXBsYXRlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBRUEseUJBQUMsYUFBWTtBQUNYLE1BQUlBLE1BQU1DLFFBQVFDLEdBQVIsRUFBVjtBQUNBQyxzQkFDR0MsT0FESCxDQUNXQyxRQUFRLGlCQUFSLEVBQTJCRCxPQUR0QyxFQUVHRSxTQUZILENBRWEsUUFGYixFQUdHQyxNQUhILENBR1UsdUJBSFYsRUFHbUMsbUNBSG5DLEVBSUdBLE1BSkgsQ0FJVSx5QkFKVixFQUlxQyx3RkFKckMsRUFJK0gsUUFKL0gsRUFLR0EsTUFMSCxDQUtVLHFCQUxWLEVBS2lDLDREQUxqQyxFQUsrRixLQUwvRixFQU1HQyxNQU5ILENBTVUsVUFBQ0MsSUFBRCxFQUFVO0FBQ2hCLFFBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1gsUUFBSUMsZUFBS0MsVUFBTCxDQUFnQkYsSUFBaEIsQ0FBSixFQUEyQjtBQUN6QlQsWUFBTVMsSUFBTjtBQUNELEtBRkQsTUFFTztBQUNMVCxZQUFNVSxlQUFLRSxPQUFMLENBQWFaLEdBQWIsRUFBa0JTLElBQWxCLENBQU47QUFDRDtBQUNGLEdBYkgsRUFjR0ksS0FkSCxDQWNTWixRQUFRYSxJQWRqQjs7QUFnQkEsUUFBTUMsV0FBVztBQUNmZixPQURlO0FBRWZnQixpQkFBYSxJQUZFO0FBR2ZDLGVBQVdkLG9CQUFRYyxTQUhKO0FBSWZDLGlCQUFhLENBQUMsQ0FBQ2Ysb0JBQVFnQjtBQUpSLEdBQWpCO0FBTUEsTUFBSWhCLG9CQUFRaUIsUUFBWixFQUFzQkwsU0FBU0ssUUFBVCxHQUFvQmpCLG9CQUFRaUIsUUFBNUI7O0FBRXRCLFFBQU0sZUFBS0wsUUFBTCxDQUFOO0FBQ0QsQ0EzQkQiLCJmaWxlIjoiZWxlY3Ryb24tZm9yZ2UtaW5pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcblxuaW1wb3J0ICcuL3V0aWwvdGVybWluYXRlJztcbmltcG9ydCB7IGluaXQgfSBmcm9tICcuL2FwaSc7XG5cbihhc3luYyAoKSA9PiB7XG4gIGxldCBkaXIgPSBwcm9jZXNzLmN3ZCgpO1xuICBwcm9ncmFtXG4gICAgLnZlcnNpb24ocmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbilcbiAgICAuYXJndW1lbnRzKCdbbmFtZV0nKVxuICAgIC5vcHRpb24oJy10LCAtLXRlbXBsYXRlIFtuYW1lXScsICdOYW1lIG9mIHRoZSBmb3JnZSB0ZW1wbGF0ZSB0byB1c2UnKVxuICAgIC5vcHRpb24oJy1sLCAtLWxpbnRTdHlsZSBbc3R5bGVdJywgJ0xpbnRpbmcgc3RhbmRhcmQgdG8gZm9sbG93LiAgRm9yIHRoZSBkZWZhdWx0IHRlbXBsYXRlIGl0IGNhbiBiZSBcImFpcmJuYlwiIG9yIFwic3RhbmRhcmRcIicsICdhaXJibmInKVxuICAgIC5vcHRpb24oJy1jLCAtLWNvcHktY2ktZmlsZXMnLCAnV2hldGhlciB0byBjb3B5IHRoZSB0ZW1wbGF0ZWQgQ0kgZmlsZXMgKGRlZmF1bHRzIHRvIGZhbHNlKScsIGZhbHNlKVxuICAgIC5hY3Rpb24oKG5hbWUpID0+IHtcbiAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xuICAgICAgaWYgKHBhdGguaXNBYnNvbHV0ZShuYW1lKSkge1xuICAgICAgICBkaXIgPSBuYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlyID0gcGF0aC5yZXNvbHZlKGRpciwgbmFtZSk7XG4gICAgICB9XG4gICAgfSlcbiAgICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuICBjb25zdCBpbml0T3B0cyA9IHtcbiAgICBkaXIsXG4gICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgbGludFN0eWxlOiBwcm9ncmFtLmxpbnRTdHlsZSxcbiAgICBjb3B5Q0lGaWxlczogISFwcm9ncmFtLmNvcHlDaUZpbGVzLFxuICB9O1xuICBpZiAocHJvZ3JhbS50ZW1wbGF0ZSkgaW5pdE9wdHMudGVtcGxhdGUgPSBwcm9ncmFtLnRlbXBsYXRlO1xuXG4gIGF3YWl0IGluaXQoaW5pdE9wdHMpO1xufSkoKTtcbiJdfQ==