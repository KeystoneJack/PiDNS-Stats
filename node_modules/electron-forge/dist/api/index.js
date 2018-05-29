'use strict';

require('colors');

var _import2 = require('./import');

var _import3 = _interopRequireDefault(_import2);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _install = require('./install');

var _install2 = _interopRequireDefault(_install);

var _lint = require('./lint');

var _lint2 = _interopRequireDefault(_lint);

var _make = require('./make');

var _make2 = _interopRequireDefault(_make);

var _package2 = require('./package');

var _package3 = _interopRequireDefault(_package2);

var _publish = require('./publish');

var _publish2 = _interopRequireDefault(_publish);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

var _forgeConfig = require('../util/forge-config');

var _forgeConfig2 = _interopRequireDefault(_forgeConfig);

var _readPackageJson = require('../util/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  'import': _import3.default, // eslint-disable-line
  init: _init2.default,
  install: _install2.default,
  lint: _lint2.default,
  make: _make2.default,
  'package': _package3.default, // eslint-disable-line
  publish: _publish2.default,
  start: _start2.default,
  utils: {
    getForgeConfig: _forgeConfig2.default,
    readPackageJSON: _readPackageJson2.default
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiX2ltcG9ydCIsImluaXQiLCJpbnN0YWxsIiwibGludCIsIm1ha2UiLCJfcGFja2FnZSIsInB1Ymxpc2giLCJzdGFydCIsInV0aWxzIiwiZ2V0Rm9yZ2VDb25maWciLCJyZWFkUGFja2FnZUpTT04iXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2YsWUFBVUMsZ0JBREssRUFDSTtBQUNuQkMsc0JBRmU7QUFHZkMsNEJBSGU7QUFJZkMsc0JBSmU7QUFLZkMsc0JBTGU7QUFNZixhQUFXQyxpQkFOSSxFQU1NO0FBQ3JCQyw0QkFQZTtBQVFmQyx3QkFSZTtBQVNmQyxTQUFPO0FBQ0xDLHlDQURLO0FBRUxDO0FBRks7QUFUUSxDQUFqQiIsImZpbGUiOiJhcGkvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XG5cbmltcG9ydCBfaW1wb3J0IGZyb20gJy4vaW1wb3J0JztcbmltcG9ydCBpbml0IGZyb20gJy4vaW5pdCc7XG5pbXBvcnQgaW5zdGFsbCBmcm9tICcuL2luc3RhbGwnO1xuaW1wb3J0IGxpbnQgZnJvbSAnLi9saW50JztcbmltcG9ydCBtYWtlIGZyb20gJy4vbWFrZSc7XG5pbXBvcnQgX3BhY2thZ2UgZnJvbSAnLi9wYWNrYWdlJztcbmltcG9ydCBwdWJsaXNoIGZyb20gJy4vcHVibGlzaCc7XG5pbXBvcnQgc3RhcnQgZnJvbSAnLi9zdGFydCc7XG5cbmltcG9ydCBnZXRGb3JnZUNvbmZpZyBmcm9tICcuLi91dGlsL2ZvcmdlLWNvbmZpZyc7XG5pbXBvcnQgcmVhZFBhY2thZ2VKU09OIGZyb20gJy4uL3V0aWwvcmVhZC1wYWNrYWdlLWpzb24nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgJ2ltcG9ydCc6IF9pbXBvcnQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaW5pdCxcbiAgaW5zdGFsbCxcbiAgbGludCxcbiAgbWFrZSxcbiAgJ3BhY2thZ2UnOiBfcGFja2FnZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBwdWJsaXNoLFxuICBzdGFydCxcbiAgdXRpbHM6IHtcbiAgICBnZXRGb3JnZUNvbmZpZyxcbiAgICByZWFkUGFja2FnZUpTT04sXG4gIH0sXG59O1xuIl19