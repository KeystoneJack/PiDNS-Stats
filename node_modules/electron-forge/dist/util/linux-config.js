'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateConfig = populateConfig;
exports.linuxConfig = linuxConfig;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _configFn = require('./config-fn');

var _configFn2 = _interopRequireDefault(_configFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function populateConfig({ forgeConfig, configKey, targetArch }) {
  const config = (0, _configFn2.default)(forgeConfig[configKey] || {}, targetArch);
  config.options = config.options || {};

  return config;
}

function linuxConfig({ config, pkgArch, dir, outPath }) {
  return (0, _lodash2.default)({}, config, {
    arch: pkgArch,
    dest: _path2.default.dirname(outPath),
    src: dir
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvbGludXgtY29uZmlnLmpzIl0sIm5hbWVzIjpbInBvcHVsYXRlQ29uZmlnIiwibGludXhDb25maWciLCJmb3JnZUNvbmZpZyIsImNvbmZpZ0tleSIsInRhcmdldEFyY2giLCJjb25maWciLCJvcHRpb25zIiwicGtnQXJjaCIsImRpciIsIm91dFBhdGgiLCJhcmNoIiwiZGVzdCIsInBhdGgiLCJkaXJuYW1lIiwic3JjIl0sIm1hcHBpbmdzIjoiOzs7OztRQUtnQkEsYyxHQUFBQSxjO1FBT0FDLFcsR0FBQUEsVzs7QUFaaEI7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFTyxTQUFTRCxjQUFULENBQXdCLEVBQUVFLFdBQUYsRUFBZUMsU0FBZixFQUEwQkMsVUFBMUIsRUFBeEIsRUFBZ0U7QUFDckUsUUFBTUMsU0FBUyx3QkFBU0gsWUFBWUMsU0FBWixLQUEwQixFQUFuQyxFQUF1Q0MsVUFBdkMsQ0FBZjtBQUNBQyxTQUFPQyxPQUFQLEdBQWlCRCxPQUFPQyxPQUFQLElBQWtCLEVBQW5DOztBQUVBLFNBQU9ELE1BQVA7QUFDRDs7QUFFTSxTQUFTSixXQUFULENBQXFCLEVBQUVJLE1BQUYsRUFBVUUsT0FBVixFQUFtQkMsR0FBbkIsRUFBd0JDLE9BQXhCLEVBQXJCLEVBQXdEO0FBQzdELFNBQU8sc0JBQU0sRUFBTixFQUFVSixNQUFWLEVBQWtCO0FBQ3ZCSyxVQUFNSCxPQURpQjtBQUV2QkksVUFBTUMsZUFBS0MsT0FBTCxDQUFhSixPQUFiLENBRmlCO0FBR3ZCSyxTQUFLTjtBQUhrQixHQUFsQixDQUFQO0FBS0QiLCJmaWxlIjoidXRpbC9saW51eC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoLm1lcmdlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgY29uZmlnRm4gZnJvbSAnLi9jb25maWctZm4nO1xuXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVDb25maWcoeyBmb3JnZUNvbmZpZywgY29uZmlnS2V5LCB0YXJnZXRBcmNoIH0pIHtcbiAgY29uc3QgY29uZmlnID0gY29uZmlnRm4oZm9yZ2VDb25maWdbY29uZmlnS2V5XSB8fCB7fSwgdGFyZ2V0QXJjaCk7XG4gIGNvbmZpZy5vcHRpb25zID0gY29uZmlnLm9wdGlvbnMgfHwge307XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbnV4Q29uZmlnKHsgY29uZmlnLCBwa2dBcmNoLCBkaXIsIG91dFBhdGggfSkge1xuICByZXR1cm4gbWVyZ2Uoe30sIGNvbmZpZywge1xuICAgIGFyY2g6IHBrZ0FyY2gsXG4gICAgZGVzdDogcGF0aC5kaXJuYW1lKG91dFBhdGgpLFxuICAgIHNyYzogZGlyLFxuICB9KTtcbn1cbiJdfQ==