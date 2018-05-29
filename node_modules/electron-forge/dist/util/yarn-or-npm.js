'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasYarn = exports.yarnOrNpmSpawn = undefined;

var _crossSpawnPromise = require('cross-spawn-promise');

var _crossSpawnPromise2 = _interopRequireDefault(_crossSpawnPromise);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _yarnOrNpm = require('yarn-or-npm');

var _yarnOrNpm2 = _interopRequireDefault(_yarnOrNpm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const safeYarnOrNpm = () => {
  const system = (0, _yarnOrNpm2.default)();
  switch (process.env.NODE_INSTALLER) {
    case 'yarn':
    case 'npm':
      return process.env.NODE_INSTALLER;
    default:
      if (process.env.NODE_INSTALLER) {
        console.warn(`${_logSymbols2.default.warning} Unknown NODE_INSTALLER, using detected installer ${system}`.yellow);
      }
      return system;
  }
};

exports.default = safeYarnOrNpm;
const yarnOrNpmSpawn = exports.yarnOrNpmSpawn = (...args) => (0, _crossSpawnPromise2.default)(safeYarnOrNpm(), ...args);

const hasYarn = exports.hasYarn = () => safeYarnOrNpm() === 'yarn';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwveWFybi1vci1ucG0uanMiXSwibmFtZXMiOlsic2FmZVlhcm5Pck5wbSIsInN5c3RlbSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0lOU1RBTExFUiIsImNvbnNvbGUiLCJ3YXJuIiwibG9nU3ltYm9scyIsIndhcm5pbmciLCJ5ZWxsb3ciLCJ5YXJuT3JOcG1TcGF3biIsImFyZ3MiLCJoYXNZYXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxnQkFBZ0IsTUFBTTtBQUMxQixRQUFNQyxTQUFTLDBCQUFmO0FBQ0EsVUFBUUMsUUFBUUMsR0FBUixDQUFZQyxjQUFwQjtBQUNFLFNBQUssTUFBTDtBQUNBLFNBQUssS0FBTDtBQUNFLGFBQU9GLFFBQVFDLEdBQVIsQ0FBWUMsY0FBbkI7QUFDRjtBQUNFLFVBQUlGLFFBQVFDLEdBQVIsQ0FBWUMsY0FBaEIsRUFBZ0M7QUFDOUJDLGdCQUFRQyxJQUFSLENBQWMsR0FBRUMscUJBQVdDLE9BQVEscURBQW9EUCxNQUFPLEVBQWpGLENBQW1GUSxNQUFoRztBQUNEO0FBQ0QsYUFBT1IsTUFBUDtBQVJKO0FBVUQsQ0FaRDs7a0JBY2VELGE7QUFFUixNQUFNVSwwQ0FBaUIsQ0FBQyxHQUFHQyxJQUFKLEtBQWEsaUNBQWFYLGVBQWIsRUFBOEIsR0FBR1csSUFBakMsQ0FBcEM7O0FBRUEsTUFBTUMsNEJBQVUsTUFBTVosb0JBQW9CLE1BQTFDIiwiZmlsZSI6InV0aWwveWFybi1vci1ucG0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3Bhd25Qcm9taXNlIGZyb20gJ2Nyb3NzLXNwYXduLXByb21pc2UnO1xuaW1wb3J0IGxvZ1N5bWJvbHMgZnJvbSAnbG9nLXN5bWJvbHMnO1xuaW1wb3J0IHlhcm5Pck5wbSBmcm9tICd5YXJuLW9yLW5wbSc7XG5cbmNvbnN0IHNhZmVZYXJuT3JOcG0gPSAoKSA9PiB7XG4gIGNvbnN0IHN5c3RlbSA9IHlhcm5Pck5wbSgpO1xuICBzd2l0Y2ggKHByb2Nlc3MuZW52Lk5PREVfSU5TVEFMTEVSKSB7XG4gICAgY2FzZSAneWFybic6XG4gICAgY2FzZSAnbnBtJzpcbiAgICAgIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0lOU1RBTExFUjtcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfSU5TVEFMTEVSKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dTeW1ib2xzLndhcm5pbmd9IFVua25vd24gTk9ERV9JTlNUQUxMRVIsIHVzaW5nIGRldGVjdGVkIGluc3RhbGxlciAke3N5c3RlbX1gLnllbGxvdyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3lzdGVtO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzYWZlWWFybk9yTnBtO1xuXG5leHBvcnQgY29uc3QgeWFybk9yTnBtU3Bhd24gPSAoLi4uYXJncykgPT4gc3Bhd25Qcm9taXNlKHNhZmVZYXJuT3JOcG0oKSwgLi4uYXJncyk7XG5cbmV4cG9ydCBjb25zdCBoYXNZYXJuID0gKCkgPT4gc2FmZVlhcm5Pck5wbSgpID09PSAneWFybic7XG4iXX0=