'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _initCustom = require('../init/init-custom');

var _initCustom2 = _interopRequireDefault(_initCustom);

var _initDirectory = require('../init/init-directory');

var _initDirectory2 = _interopRequireDefault(_initDirectory);

var _initGit = require('../init/init-git');

var _initGit2 = _interopRequireDefault(_initGit);

var _initNpm = require('../init/init-npm');

var _initNpm2 = _interopRequireDefault(_initNpm);

var _initStandardFix = require('../init/init-standard-fix');

var _initStandardFix2 = _interopRequireDefault(_initStandardFix);

var _initStarterFiles = require('../init/init-starter-files');

var _initStarterFiles2 = _interopRequireDefault(_initStarterFiles);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:init');

/**
 * @typedef {Object} InitOptions
 * @property {string} [dir=process.cwd()] The path to the app to be initialized
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {string} [lintStyle=airbnb] The lintStyle to pass through to the template creator
 * @property {boolean} [copyCIFiles=false] Whether to copy Travis and AppVeyor CI files
 * @property {string} [template] The custom template to use. If left empty, the default template is used
 */

/**
 * Initialize a new Electron Forge template project in the given directory.
 *
 * @param {InitOptions} providedOptions - Options for the init method
 * @return {Promise} Will resolve when the initialization process is complete
 */

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    var _Object$assign = (0, _assign2.default)({
      dir: process.cwd(),
      interactive: false,
      lintStyle: 'airbnb',
      copyCIFiles: false,
      template: null
    }, providedOptions);

    let dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        lintStyle = _Object$assign.lintStyle,
        copyCIFiles = _Object$assign.copyCIFiles,
        template = _Object$assign.template;

    _oraHandler2.default.interactive = interactive;

    d(`Initializing in: ${dir}`);

    if (!template) {
      lintStyle = lintStyle.toLowerCase();
      if (!['airbnb', 'standard'].includes(lintStyle)) {
        d(`Unrecognized lintStyle argument: '${lintStyle}' -- defaulting to 'airbnb'`);
        lintStyle = 'airbnb';
      }
    }

    yield (0, _initDirectory2.default)(dir, interactive);
    yield (0, _initGit2.default)(dir);
    yield (0, _initStarterFiles2.default)(dir, { lintStyle: template ? undefined : lintStyle, copyCIFiles });
    yield (0, _initNpm2.default)(dir, template ? undefined : lintStyle);
    if (!template) {
      if (lintStyle === 'standard') {
        yield (0, _initStandardFix2.default)(dir);
      }
    } else {
      yield (0, _initCustom2.default)(dir, template, lintStyle);
    }
  });

  return function () {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9pbml0LmpzIl0sIm5hbWVzIjpbImQiLCJwcm92aWRlZE9wdGlvbnMiLCJkaXIiLCJwcm9jZXNzIiwiY3dkIiwiaW50ZXJhY3RpdmUiLCJsaW50U3R5bGUiLCJjb3B5Q0lGaWxlcyIsInRlbXBsYXRlIiwiYXN5bmNPcmEiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLHFCQUFOLENBQVY7O0FBRUE7Ozs7Ozs7OztBQVNBOzs7Ozs7OztzQ0FNZSxXQUFPQyxrQkFBa0IsRUFBekIsRUFBZ0M7QUFDN0M7QUFENkMseUJBRWdCLHNCQUFjO0FBQ3pFQyxXQUFLQyxRQUFRQyxHQUFSLEVBRG9FO0FBRXpFQyxtQkFBYSxLQUY0RDtBQUd6RUMsaUJBQVcsUUFIOEQ7QUFJekVDLG1CQUFhLEtBSjREO0FBS3pFQyxnQkFBVTtBQUwrRCxLQUFkLEVBTTFEUCxlQU4wRCxDQUZoQjs7QUFBQSxRQUV2Q0MsR0FGdUMsa0JBRXZDQSxHQUZ1QztBQUFBLFFBRWxDRyxXQUZrQyxrQkFFbENBLFdBRmtDO0FBQUEsUUFFckJDLFNBRnFCLGtCQUVyQkEsU0FGcUI7QUFBQSxRQUVWQyxXQUZVLGtCQUVWQSxXQUZVO0FBQUEsUUFFR0MsUUFGSCxrQkFFR0EsUUFGSDs7QUFTN0NDLHlCQUFTSixXQUFULEdBQXVCQSxXQUF2Qjs7QUFFQUwsTUFBRyxvQkFBbUJFLEdBQUksRUFBMUI7O0FBRUEsUUFBSSxDQUFDTSxRQUFMLEVBQWU7QUFDYkYsa0JBQVlBLFVBQVVJLFdBQVYsRUFBWjtBQUNBLFVBQUksQ0FBQyxDQUFDLFFBQUQsRUFBVyxVQUFYLEVBQXVCQyxRQUF2QixDQUFnQ0wsU0FBaEMsQ0FBTCxFQUFpRDtBQUMvQ04sVUFBRyxxQ0FBb0NNLFNBQVUsNkJBQWpEO0FBQ0FBLG9CQUFZLFFBQVo7QUFDRDtBQUNGOztBQUVELFVBQU0sNkJBQWNKLEdBQWQsRUFBbUJHLFdBQW5CLENBQU47QUFDQSxVQUFNLHVCQUFRSCxHQUFSLENBQU47QUFDQSxVQUFNLGdDQUFZQSxHQUFaLEVBQWlCLEVBQUVJLFdBQVdFLFdBQVdJLFNBQVgsR0FBdUJOLFNBQXBDLEVBQStDQyxXQUEvQyxFQUFqQixDQUFOO0FBQ0EsVUFBTSx1QkFBUUwsR0FBUixFQUFhTSxXQUFXSSxTQUFYLEdBQXVCTixTQUFwQyxDQUFOO0FBQ0EsUUFBSSxDQUFDRSxRQUFMLEVBQWU7QUFDYixVQUFJRixjQUFjLFVBQWxCLEVBQThCO0FBQzVCLGNBQU0sK0JBQWdCSixHQUFoQixDQUFOO0FBQ0Q7QUFDRixLQUpELE1BSU87QUFDTCxZQUFNLDBCQUFXQSxHQUFYLEVBQWdCTSxRQUFoQixFQUEwQkYsU0FBMUIsQ0FBTjtBQUNEO0FBQ0YsRyIsImZpbGUiOiJhcGkvaW5pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5cbmltcG9ydCBpbml0Q3VzdG9tIGZyb20gJy4uL2luaXQvaW5pdC1jdXN0b20nO1xuaW1wb3J0IGluaXREaXJlY3RvcnkgZnJvbSAnLi4vaW5pdC9pbml0LWRpcmVjdG9yeSc7XG5pbXBvcnQgaW5pdEdpdCBmcm9tICcuLi9pbml0L2luaXQtZ2l0JztcbmltcG9ydCBpbml0TlBNIGZyb20gJy4uL2luaXQvaW5pdC1ucG0nO1xuaW1wb3J0IGluaXRTdGFuZGFyZEZpeCBmcm9tICcuLi9pbml0L2luaXQtc3RhbmRhcmQtZml4JztcbmltcG9ydCBpbml0U3RhcnRlciBmcm9tICcuLi9pbml0L2luaXQtc3RhcnRlci1maWxlcyc7XG5cbmltcG9ydCBhc3luY09yYSBmcm9tICcuLi91dGlsL29yYS1oYW5kbGVyJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTppbml0Jyk7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gSW5pdE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGlyPXByb2Nlc3MuY3dkKCldIFRoZSBwYXRoIHRvIHRoZSBhcHAgdG8gYmUgaW5pdGlhbGl6ZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2ludGVyYWN0aXZlPWZhbHNlXSBXaGV0aGVyIHRvIHVzZSBzZW5zaWJsZSBkZWZhdWx0cyBvciBwcm9tcHQgdGhlIHVzZXIgdmlzdWFsbHlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbGludFN0eWxlPWFpcmJuYl0gVGhlIGxpbnRTdHlsZSB0byBwYXNzIHRocm91Z2ggdG8gdGhlIHRlbXBsYXRlIGNyZWF0b3JcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2NvcHlDSUZpbGVzPWZhbHNlXSBXaGV0aGVyIHRvIGNvcHkgVHJhdmlzIGFuZCBBcHBWZXlvciBDSSBmaWxlc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0ZW1wbGF0ZV0gVGhlIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UuIElmIGxlZnQgZW1wdHksIHRoZSBkZWZhdWx0IHRlbXBsYXRlIGlzIHVzZWRcbiAqL1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgRWxlY3Ryb24gRm9yZ2UgdGVtcGxhdGUgcHJvamVjdCBpbiB0aGUgZ2l2ZW4gZGlyZWN0b3J5LlxuICpcbiAqIEBwYXJhbSB7SW5pdE9wdGlvbnN9IHByb3ZpZGVkT3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBpbml0IG1ldGhvZFxuICogQHJldHVybiB7UHJvbWlzZX0gV2lsbCByZXNvbHZlIHdoZW4gdGhlIGluaXRpYWxpemF0aW9uIHByb2Nlc3MgaXMgY29tcGxldGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHByb3ZpZGVkT3B0aW9ucyA9IHt9KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3QsIG5vLXVudXNlZC12YXJzXG4gIGxldCB7IGRpciwgaW50ZXJhY3RpdmUsIGxpbnRTdHlsZSwgY29weUNJRmlsZXMsIHRlbXBsYXRlIH0gPSBPYmplY3QuYXNzaWduKHtcbiAgICBkaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIGxpbnRTdHlsZTogJ2FpcmJuYicsXG4gICAgY29weUNJRmlsZXM6IGZhbHNlLFxuICAgIHRlbXBsYXRlOiBudWxsLFxuICB9LCBwcm92aWRlZE9wdGlvbnMpO1xuICBhc3luY09yYS5pbnRlcmFjdGl2ZSA9IGludGVyYWN0aXZlO1xuXG4gIGQoYEluaXRpYWxpemluZyBpbjogJHtkaXJ9YCk7XG5cbiAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgIGxpbnRTdHlsZSA9IGxpbnRTdHlsZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghWydhaXJibmInLCAnc3RhbmRhcmQnXS5pbmNsdWRlcyhsaW50U3R5bGUpKSB7XG4gICAgICBkKGBVbnJlY29nbml6ZWQgbGludFN0eWxlIGFyZ3VtZW50OiAnJHtsaW50U3R5bGV9JyAtLSBkZWZhdWx0aW5nIHRvICdhaXJibmInYCk7XG4gICAgICBsaW50U3R5bGUgPSAnYWlyYm5iJztcbiAgICB9XG4gIH1cblxuICBhd2FpdCBpbml0RGlyZWN0b3J5KGRpciwgaW50ZXJhY3RpdmUpO1xuICBhd2FpdCBpbml0R2l0KGRpcik7XG4gIGF3YWl0IGluaXRTdGFydGVyKGRpciwgeyBsaW50U3R5bGU6IHRlbXBsYXRlID8gdW5kZWZpbmVkIDogbGludFN0eWxlLCBjb3B5Q0lGaWxlcyB9KTtcbiAgYXdhaXQgaW5pdE5QTShkaXIsIHRlbXBsYXRlID8gdW5kZWZpbmVkIDogbGludFN0eWxlKTtcbiAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgIGlmIChsaW50U3R5bGUgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgIGF3YWl0IGluaXRTdGFuZGFyZEZpeChkaXIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBpbml0Q3VzdG9tKGRpciwgdGVtcGxhdGUsIGxpbnRTdHlsZSk7XG4gIH1cbn07XG4iXX0=