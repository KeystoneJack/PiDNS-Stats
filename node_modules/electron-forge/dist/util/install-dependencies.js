'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _yarnOrNpm = require('./yarn-or-npm');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:dependency-installer');

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir, deps, areDev = false, exact = false) {
    d('installing', (0, _stringify2.default)(deps), 'in:', dir, `dev=${areDev},exact=${exact},withYarn=${(0, _yarnOrNpm.hasYarn)()}`);
    if (deps.length === 0) {
      d('nothing to install, stopping immediately');
      return _promise2.default.resolve();
    }
    let cmd = ['install'].concat(deps);
    if ((0, _yarnOrNpm.hasYarn)()) {
      cmd = ['add'].concat(deps);
      if (areDev) cmd.push('--dev');
      if (exact) cmd.push('--exact');
    } else {
      if (exact) cmd.push('--save-exact');
      if (areDev) cmd.push('--save-dev');
      if (!areDev) cmd.push('--save');
    }
    d('executing', (0, _stringify2.default)(cmd), 'in:', dir);
    try {
      yield (0, _yarnOrNpm.yarnOrNpmSpawn)(cmd, {
        cwd: dir,
        stdio: _config2.default.get('verbose') ? 'inherit' : 'pipe'
      });
    } catch (err) {
      throw new Error(`Failed to install modules: ${(0, _stringify2.default)(deps)}\n\nWith output: ${err.message}`);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvaW5zdGFsbC1kZXBlbmRlbmNpZXMuanMiXSwibmFtZXMiOlsiZCIsImRpciIsImRlcHMiLCJhcmVEZXYiLCJleGFjdCIsImxlbmd0aCIsInJlc29sdmUiLCJjbWQiLCJjb25jYXQiLCJwdXNoIiwiY3dkIiwic3RkaW8iLCJjb25maWciLCJnZXQiLCJlcnIiLCJFcnJvciIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLHFDQUFOLENBQVY7OztzQ0FFZSxXQUFPQyxHQUFQLEVBQVlDLElBQVosRUFBa0JDLFNBQVMsS0FBM0IsRUFBa0NDLFFBQVEsS0FBMUMsRUFBb0Q7QUFDakVKLE1BQUUsWUFBRixFQUFnQix5QkFBZUUsSUFBZixDQUFoQixFQUFzQyxLQUF0QyxFQUE2Q0QsR0FBN0MsRUFBbUQsT0FBTUUsTUFBTyxVQUFTQyxLQUFNLGFBQVkseUJBQVUsRUFBckc7QUFDQSxRQUFJRixLQUFLRyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCTCxRQUFFLDBDQUFGO0FBQ0EsYUFBTyxrQkFBUU0sT0FBUixFQUFQO0FBQ0Q7QUFDRCxRQUFJQyxNQUFNLENBQUMsU0FBRCxFQUFZQyxNQUFaLENBQW1CTixJQUFuQixDQUFWO0FBQ0EsUUFBSSx5QkFBSixFQUFlO0FBQ2JLLFlBQU0sQ0FBQyxLQUFELEVBQVFDLE1BQVIsQ0FBZU4sSUFBZixDQUFOO0FBQ0EsVUFBSUMsTUFBSixFQUFZSSxJQUFJRSxJQUFKLENBQVMsT0FBVDtBQUNaLFVBQUlMLEtBQUosRUFBV0csSUFBSUUsSUFBSixDQUFTLFNBQVQ7QUFDWixLQUpELE1BSU87QUFDTCxVQUFJTCxLQUFKLEVBQVdHLElBQUlFLElBQUosQ0FBUyxjQUFUO0FBQ1gsVUFBSU4sTUFBSixFQUFZSSxJQUFJRSxJQUFKLENBQVMsWUFBVDtBQUNaLFVBQUksQ0FBQ04sTUFBTCxFQUFhSSxJQUFJRSxJQUFKLENBQVMsUUFBVDtBQUNkO0FBQ0RULE1BQUUsV0FBRixFQUFlLHlCQUFlTyxHQUFmLENBQWYsRUFBb0MsS0FBcEMsRUFBMkNOLEdBQTNDO0FBQ0EsUUFBSTtBQUNGLFlBQU0sK0JBQWVNLEdBQWYsRUFBb0I7QUFDeEJHLGFBQUtULEdBRG1CO0FBRXhCVSxlQUFPQyxpQkFBT0MsR0FBUCxDQUFXLFNBQVgsSUFBd0IsU0FBeEIsR0FBb0M7QUFGbkIsT0FBcEIsQ0FBTjtBQUlELEtBTEQsQ0FLRSxPQUFPQyxHQUFQLEVBQVk7QUFDWixZQUFNLElBQUlDLEtBQUosQ0FBVyw4QkFBNkIseUJBQWViLElBQWYsQ0FBcUIsb0JBQW1CWSxJQUFJRSxPQUFRLEVBQTVGLENBQU47QUFDRDtBQUNGLEciLCJmaWxlIjoidXRpbC9pbnN0YWxsLWRlcGVuZGVuY2llcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgeyB5YXJuT3JOcG1TcGF3biwgaGFzWWFybiB9IGZyb20gJy4veWFybi1vci1ucG0nO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpkZXBlbmRlbmN5LWluc3RhbGxlcicpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyLCBkZXBzLCBhcmVEZXYgPSBmYWxzZSwgZXhhY3QgPSBmYWxzZSkgPT4ge1xuICBkKCdpbnN0YWxsaW5nJywgSlNPTi5zdHJpbmdpZnkoZGVwcyksICdpbjonLCBkaXIsIGBkZXY9JHthcmVEZXZ9LGV4YWN0PSR7ZXhhY3R9LHdpdGhZYXJuPSR7aGFzWWFybigpfWApO1xuICBpZiAoZGVwcy5sZW5ndGggPT09IDApIHtcbiAgICBkKCdub3RoaW5nIHRvIGluc3RhbGwsIHN0b3BwaW5nIGltbWVkaWF0ZWx5Jyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGxldCBjbWQgPSBbJ2luc3RhbGwnXS5jb25jYXQoZGVwcyk7XG4gIGlmIChoYXNZYXJuKCkpIHtcbiAgICBjbWQgPSBbJ2FkZCddLmNvbmNhdChkZXBzKTtcbiAgICBpZiAoYXJlRGV2KSBjbWQucHVzaCgnLS1kZXYnKTtcbiAgICBpZiAoZXhhY3QpIGNtZC5wdXNoKCctLWV4YWN0Jyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGV4YWN0KSBjbWQucHVzaCgnLS1zYXZlLWV4YWN0Jyk7XG4gICAgaWYgKGFyZURldikgY21kLnB1c2goJy0tc2F2ZS1kZXYnKTtcbiAgICBpZiAoIWFyZURldikgY21kLnB1c2goJy0tc2F2ZScpO1xuICB9XG4gIGQoJ2V4ZWN1dGluZycsIEpTT04uc3RyaW5naWZ5KGNtZCksICdpbjonLCBkaXIpO1xuICB0cnkge1xuICAgIGF3YWl0IHlhcm5Pck5wbVNwYXduKGNtZCwge1xuICAgICAgY3dkOiBkaXIsXG4gICAgICBzdGRpbzogY29uZmlnLmdldCgndmVyYm9zZScpID8gJ2luaGVyaXQnIDogJ3BpcGUnLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBpbnN0YWxsIG1vZHVsZXM6ICR7SlNPTi5zdHJpbmdpZnkoZGVwcyl9XFxuXFxuV2l0aCBvdXRwdXQ6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG4iXX0=