'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _snapcraft = require('electron-installer-snap/snapcraft');

var _snapcraft2 = _interopRequireDefault(_snapcraft);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `forgeConfig.snapStore`:
 * * `release`: comma-separated list of channels to release to
 */
exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* ({ dir, artifacts, forgeConfig }) {
    const snapArtifacts = artifacts.filter(function (artifact) {
      return artifact.endsWith('.snap');
    });

    if (snapArtifacts.length === 0) {
      throw 'No snap files to upload. Please ensure that "snap" is listed in the "make_targets" in Forge config.';
    }

    const snapcraftCfgPath = _path2.default.join(dir, '.snapcraft', 'snapcraft.cfg');

    if (!(yield _fsExtra2.default.pathExists(snapcraftCfgPath))) {
      throw `Snapcraft credentials not found at "${snapcraftCfgPath}". It can be generated with the command "snapcraft export-login" (snapcraft 2.37 and above).`;
    }

    yield (0, _oraHandler2.default)('Pushing snap to the snap store', (0, _bluebird.coroutine)(function* () {
      const snapcraft = new _snapcraft2.default();
      yield snapcraft.run(dir, 'push', forgeConfig.snapStore, snapArtifacts);
    }));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hlcnMvc25hcGNyYWZ0LmpzIl0sIm5hbWVzIjpbImRpciIsImFydGlmYWN0cyIsImZvcmdlQ29uZmlnIiwic25hcEFydGlmYWN0cyIsImZpbHRlciIsImFydGlmYWN0IiwiZW5kc1dpdGgiLCJsZW5ndGgiLCJzbmFwY3JhZnRDZmdQYXRoIiwicGF0aCIsImpvaW4iLCJmcyIsInBhdGhFeGlzdHMiLCJzbmFwY3JhZnQiLCJTbmFwY3JhZnQiLCJydW4iLCJzbmFwU3RvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBOzs7OztzQ0FJZSxXQUFPLEVBQUVBLEdBQUYsRUFBT0MsU0FBUCxFQUFrQkMsV0FBbEIsRUFBUCxFQUEyQztBQUN4RCxVQUFNQyxnQkFBZ0JGLFVBQVVHLE1BQVYsQ0FBaUI7QUFBQSxhQUFZQyxTQUFTQyxRQUFULENBQWtCLE9BQWxCLENBQVo7QUFBQSxLQUFqQixDQUF0Qjs7QUFFQSxRQUFJSCxjQUFjSSxNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzlCLFlBQU0scUdBQU47QUFDRDs7QUFFRCxVQUFNQyxtQkFBbUJDLGVBQUtDLElBQUwsQ0FBVVYsR0FBVixFQUFlLFlBQWYsRUFBNkIsZUFBN0IsQ0FBekI7O0FBRUEsUUFBSSxFQUFDLE1BQU1XLGtCQUFHQyxVQUFILENBQWNKLGdCQUFkLENBQVAsQ0FBSixFQUE0QztBQUMxQyxZQUFPLHVDQUFzQ0EsZ0JBQWlCLDhGQUE5RDtBQUNEOztBQUVELFVBQU0sMEJBQVMsZ0NBQVQsMkJBQTJDLGFBQVk7QUFDM0QsWUFBTUssWUFBWSxJQUFJQyxtQkFBSixFQUFsQjtBQUNBLFlBQU1ELFVBQVVFLEdBQVYsQ0FBY2YsR0FBZCxFQUFtQixNQUFuQixFQUEyQkUsWUFBWWMsU0FBdkMsRUFBa0RiLGFBQWxELENBQU47QUFDRCxLQUhLLEVBQU47QUFJRCxHIiwiZmlsZSI6InB1Ymxpc2hlcnMvc25hcGNyYWZ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFNuYXBjcmFmdCBmcm9tICdlbGVjdHJvbi1pbnN0YWxsZXItc25hcC9zbmFwY3JhZnQnO1xuXG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5cbi8qKlxuICogYGZvcmdlQ29uZmlnLnNuYXBTdG9yZWA6XG4gKiAqIGByZWxlYXNlYDogY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgY2hhbm5lbHMgdG8gcmVsZWFzZSB0b1xuICovXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBkaXIsIGFydGlmYWN0cywgZm9yZ2VDb25maWcgfSkgPT4ge1xuICBjb25zdCBzbmFwQXJ0aWZhY3RzID0gYXJ0aWZhY3RzLmZpbHRlcihhcnRpZmFjdCA9PiBhcnRpZmFjdC5lbmRzV2l0aCgnLnNuYXAnKSk7XG5cbiAgaWYgKHNuYXBBcnRpZmFjdHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgJ05vIHNuYXAgZmlsZXMgdG8gdXBsb2FkLiBQbGVhc2UgZW5zdXJlIHRoYXQgXCJzbmFwXCIgaXMgbGlzdGVkIGluIHRoZSBcIm1ha2VfdGFyZ2V0c1wiIGluIEZvcmdlIGNvbmZpZy4nO1xuICB9XG5cbiAgY29uc3Qgc25hcGNyYWZ0Q2ZnUGF0aCA9IHBhdGguam9pbihkaXIsICcuc25hcGNyYWZ0JywgJ3NuYXBjcmFmdC5jZmcnKTtcblxuICBpZiAoIWF3YWl0IGZzLnBhdGhFeGlzdHMoc25hcGNyYWZ0Q2ZnUGF0aCkpIHtcbiAgICB0aHJvdyBgU25hcGNyYWZ0IGNyZWRlbnRpYWxzIG5vdCBmb3VuZCBhdCBcIiR7c25hcGNyYWZ0Q2ZnUGF0aH1cIi4gSXQgY2FuIGJlIGdlbmVyYXRlZCB3aXRoIHRoZSBjb21tYW5kIFwic25hcGNyYWZ0IGV4cG9ydC1sb2dpblwiIChzbmFwY3JhZnQgMi4zNyBhbmQgYWJvdmUpLmA7XG4gIH1cblxuICBhd2FpdCBhc3luY09yYSgnUHVzaGluZyBzbmFwIHRvIHRoZSBzbmFwIHN0b3JlJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHNuYXBjcmFmdCA9IG5ldyBTbmFwY3JhZnQoKTtcbiAgICBhd2FpdCBzbmFwY3JhZnQucnVuKGRpciwgJ3B1c2gnLCBmb3JnZUNvbmZpZy5zbmFwU3RvcmUsIHNuYXBBcnRpZmFjdHMpO1xuICB9KTtcbn07XG4iXX0=