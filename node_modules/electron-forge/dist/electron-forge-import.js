'use strict';

var _bluebird = require('bluebird');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

require('./util/terminate');

var _import = require('./api/import');

var _import2 = _interopRequireDefault(_import);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _bluebird.coroutine)(function* () {
  let dir = process.cwd();
  _commander2.default.version(require('../package.json').version).arguments('[name]').action(function (name) {
    if (!name) return;
    if (_path2.default.isAbsolute(name)) {
      dir = name;
    } else {
      dir = _path2.default.resolve(dir, name);
    }
  }).parse(process.argv);

  yield (0, _import2.default)({
    dir,
    interactive: true
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZWN0cm9uLWZvcmdlLWltcG9ydC5qcyJdLCJuYW1lcyI6WyJkaXIiLCJwcm9jZXNzIiwiY3dkIiwicHJvZ3JhbSIsInZlcnNpb24iLCJyZXF1aXJlIiwiYXJndW1lbnRzIiwiYWN0aW9uIiwibmFtZSIsInBhdGgiLCJpc0Fic29sdXRlIiwicmVzb2x2ZSIsInBhcnNlIiwiYXJndiIsImludGVyYWN0aXZlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7QUFFQSx5QkFBQyxhQUFZO0FBQ1gsTUFBSUEsTUFBTUMsUUFBUUMsR0FBUixFQUFWO0FBQ0FDLHNCQUNHQyxPQURILENBQ1dDLFFBQVEsaUJBQVIsRUFBMkJELE9BRHRDLEVBRUdFLFNBRkgsQ0FFYSxRQUZiLEVBR0dDLE1BSEgsQ0FHVSxVQUFDQyxJQUFELEVBQVU7QUFDaEIsUUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDWCxRQUFJQyxlQUFLQyxVQUFMLENBQWdCRixJQUFoQixDQUFKLEVBQTJCO0FBQ3pCUixZQUFNUSxJQUFOO0FBQ0QsS0FGRCxNQUVPO0FBQ0xSLFlBQU1TLGVBQUtFLE9BQUwsQ0FBYVgsR0FBYixFQUFrQlEsSUFBbEIsQ0FBTjtBQUNEO0FBQ0YsR0FWSCxFQVdHSSxLQVhILENBV1NYLFFBQVFZLElBWGpCOztBQWFBLFFBQU0sc0JBQVU7QUFDZGIsT0FEYztBQUVkYyxpQkFBYTtBQUZDLEdBQVYsQ0FBTjtBQUlELENBbkJEIiwiZmlsZSI6ImVsZWN0cm9uLWZvcmdlLWltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcblxuaW1wb3J0ICcuL3V0aWwvdGVybWluYXRlJztcbmltcG9ydCBpbXBvcnRBUEkgZnJvbSAnLi9hcGkvaW1wb3J0JztcblxuKGFzeW5jICgpID0+IHtcbiAgbGV0IGRpciA9IHByb2Nlc3MuY3dkKCk7XG4gIHByb2dyYW1cbiAgICAudmVyc2lvbihyZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uKVxuICAgIC5hcmd1bWVudHMoJ1tuYW1lXScpXG4gICAgLmFjdGlvbigobmFtZSkgPT4ge1xuICAgICAgaWYgKCFuYW1lKSByZXR1cm47XG4gICAgICBpZiAocGF0aC5pc0Fic29sdXRlKG5hbWUpKSB7XG4gICAgICAgIGRpciA9IG5hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXIgPSBwYXRoLnJlc29sdmUoZGlyLCBuYW1lKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG4gIGF3YWl0IGltcG9ydEFQSSh7XG4gICAgZGlyLFxuICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICB9KTtcbn0pKCk7XG4iXX0=