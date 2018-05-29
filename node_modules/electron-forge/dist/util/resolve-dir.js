'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _exactVersion = require('exact-version');

var _exactVersion2 = _interopRequireDefault(_exactVersion);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readPackageJson = require('./read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:project-resolver');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir) {
    let mDir = dir;
    let prevDir;
    while (prevDir !== mDir) {
      prevDir = mDir;
      const testPath = _path2.default.resolve(mDir, 'package.json');
      d('searching for project in:', mDir);
      if (yield _fsExtra2.default.pathExists(testPath)) {
        const packageJSON = yield (0, _readPackageJson2.default)(mDir);

        if (packageJSON.devDependencies && packageJSON.devDependencies['electron-prebuilt-compile']) {
          const version = packageJSON.devDependencies['electron-prebuilt-compile'];
          if (!(0, _exactVersion2.default)(version)) {
            throw `You must depend on an EXACT version of "electron-prebuilt-compile" not a range (got "${version}")`;
          }
        } else {
          throw 'You must depend on "electron-prebuilt-compile" in your devDependencies';
        }

        if (packageJSON.config && packageJSON.config.forge) {
          d('electron-forge compatible package.json found in', testPath);
          return mDir;
        }
      }
      mDir = _path2.default.dirname(mDir);
    }
    return null;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvcmVzb2x2ZS1kaXIuanMiXSwibmFtZXMiOlsiZCIsImRpciIsIm1EaXIiLCJwcmV2RGlyIiwidGVzdFBhdGgiLCJwYXRoIiwicmVzb2x2ZSIsImZzIiwicGF0aEV4aXN0cyIsInBhY2thZ2VKU09OIiwiZGV2RGVwZW5kZW5jaWVzIiwidmVyc2lvbiIsImNvbmZpZyIsImZvcmdlIiwiZGlybmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLGlDQUFOLENBQVY7OztzQ0FFZSxXQUFPQyxHQUFQLEVBQWU7QUFDNUIsUUFBSUMsT0FBT0QsR0FBWDtBQUNBLFFBQUlFLE9BQUo7QUFDQSxXQUFPQSxZQUFZRCxJQUFuQixFQUF5QjtBQUN2QkMsZ0JBQVVELElBQVY7QUFDQSxZQUFNRSxXQUFXQyxlQUFLQyxPQUFMLENBQWFKLElBQWIsRUFBbUIsY0FBbkIsQ0FBakI7QUFDQUYsUUFBRSwyQkFBRixFQUErQkUsSUFBL0I7QUFDQSxVQUFJLE1BQU1LLGtCQUFHQyxVQUFILENBQWNKLFFBQWQsQ0FBVixFQUFtQztBQUNqQyxjQUFNSyxjQUFjLE1BQU0sK0JBQWdCUCxJQUFoQixDQUExQjs7QUFFQSxZQUFJTyxZQUFZQyxlQUFaLElBQStCRCxZQUFZQyxlQUFaLENBQTRCLDJCQUE1QixDQUFuQyxFQUE2RjtBQUMzRixnQkFBTUMsVUFBVUYsWUFBWUMsZUFBWixDQUE0QiwyQkFBNUIsQ0FBaEI7QUFDQSxjQUFJLENBQUMsNEJBQWVDLE9BQWYsQ0FBTCxFQUE4QjtBQUM1QixrQkFBTyx3RkFBdUZBLE9BQVEsSUFBdEc7QUFDRDtBQUNGLFNBTEQsTUFLTztBQUNMLGdCQUFNLHdFQUFOO0FBQ0Q7O0FBRUQsWUFBSUYsWUFBWUcsTUFBWixJQUFzQkgsWUFBWUcsTUFBWixDQUFtQkMsS0FBN0MsRUFBb0Q7QUFDbERiLFlBQUUsaURBQUYsRUFBcURJLFFBQXJEO0FBQ0EsaUJBQU9GLElBQVA7QUFDRDtBQUNGO0FBQ0RBLGFBQU9HLGVBQUtTLE9BQUwsQ0FBYVosSUFBYixDQUFQO0FBQ0Q7QUFDRCxXQUFPLElBQVA7QUFDRCxHIiwiZmlsZSI6InV0aWwvcmVzb2x2ZS1kaXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBpc0V4YWN0VmVyc2lvbiBmcm9tICdleGFjdC12ZXJzaW9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHJlYWRQYWNrYWdlSlNPTiBmcm9tICcuL3JlYWQtcGFja2FnZS1qc29uJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpwcm9qZWN0LXJlc29sdmVyJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChkaXIpID0+IHtcbiAgbGV0IG1EaXIgPSBkaXI7XG4gIGxldCBwcmV2RGlyO1xuICB3aGlsZSAocHJldkRpciAhPT0gbURpcikge1xuICAgIHByZXZEaXIgPSBtRGlyO1xuICAgIGNvbnN0IHRlc3RQYXRoID0gcGF0aC5yZXNvbHZlKG1EaXIsICdwYWNrYWdlLmpzb24nKTtcbiAgICBkKCdzZWFyY2hpbmcgZm9yIHByb2plY3QgaW46JywgbURpcik7XG4gICAgaWYgKGF3YWl0IGZzLnBhdGhFeGlzdHModGVzdFBhdGgpKSB7XG4gICAgICBjb25zdCBwYWNrYWdlSlNPTiA9IGF3YWl0IHJlYWRQYWNrYWdlSlNPTihtRGlyKTtcblxuICAgICAgaWYgKHBhY2thZ2VKU09OLmRldkRlcGVuZGVuY2llcyAmJiBwYWNrYWdlSlNPTi5kZXZEZXBlbmRlbmNpZXNbJ2VsZWN0cm9uLXByZWJ1aWx0LWNvbXBpbGUnXSkge1xuICAgICAgICBjb25zdCB2ZXJzaW9uID0gcGFja2FnZUpTT04uZGV2RGVwZW5kZW5jaWVzWydlbGVjdHJvbi1wcmVidWlsdC1jb21waWxlJ107XG4gICAgICAgIGlmICghaXNFeGFjdFZlcnNpb24odmVyc2lvbikpIHtcbiAgICAgICAgICB0aHJvdyBgWW91IG11c3QgZGVwZW5kIG9uIGFuIEVYQUNUIHZlcnNpb24gb2YgXCJlbGVjdHJvbi1wcmVidWlsdC1jb21waWxlXCIgbm90IGEgcmFuZ2UgKGdvdCBcIiR7dmVyc2lvbn1cIilgO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnWW91IG11c3QgZGVwZW5kIG9uIFwiZWxlY3Ryb24tcHJlYnVpbHQtY29tcGlsZVwiIGluIHlvdXIgZGV2RGVwZW5kZW5jaWVzJztcbiAgICAgIH1cblxuICAgICAgaWYgKHBhY2thZ2VKU09OLmNvbmZpZyAmJiBwYWNrYWdlSlNPTi5jb25maWcuZm9yZ2UpIHtcbiAgICAgICAgZCgnZWxlY3Ryb24tZm9yZ2UgY29tcGF0aWJsZSBwYWNrYWdlLmpzb24gZm91bmQgaW4nLCB0ZXN0UGF0aCk7XG4gICAgICAgIHJldHVybiBtRGlyO1xuICAgICAgfVxuICAgIH1cbiAgICBtRGlyID0gcGF0aC5kaXJuYW1lKG1EaXIpO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcbiJdfQ==