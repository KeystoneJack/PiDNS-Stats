'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.setInitialForgeConfig = setInitialForgeConfig;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash.template');

var _lodash2 = _interopRequireDefault(_lodash);

var _readPackageJson = require('./read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

var _yarnOrNpm = require('./yarn-or-npm');

var _yarnOrNpm2 = _interopRequireDefault(_yarnOrNpm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const underscoreCase = str => str.replace(/(.)([A-Z][a-z]+)/g, '$1_$2').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

const proxify = (object, envPrefix) => {
  const newObject = {};

  (0, _keys2.default)(object).forEach(key => {
    if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      newObject[key] = proxify(object[key], `${envPrefix}_${underscoreCase(key)}`);
    } else {
      newObject[key] = object[key];
    }
  });

  return new Proxy(newObject, {
    get(target, name) {
      // eslint-disable-next-line no-prototype-builtins
      if (!target.hasOwnProperty(name) && typeof name === 'string') {
        const envValue = process.env[`${envPrefix}_${underscoreCase(name)}`];
        if (envValue) return envValue;
      }
      return target[name];
    },
    getOwnPropertyDescriptor(target, name) {
      const envValue = process.env[`${envPrefix}_${underscoreCase(name)}`];
      // eslint-disable-next-line no-prototype-builtins
      if (target.hasOwnProperty(name)) {
        return (0, _getOwnPropertyDescriptor2.default)(target, name);
      } else if (envValue) {
        return { writable: true, enumerable: true, configurable: true, value: envValue };
      }
    }
  });
};

/**
 * Sets sensible defaults for the `config.forge` object.
 */
function setInitialForgeConfig(packageJSON) {
  var _packageJSON$name = packageJSON.name;
  const name = _packageJSON$name === undefined ? '' : _packageJSON$name;
  var _packageJSON$productN = packageJSON.productName;
  const productName = _packageJSON$productN === undefined ? name : _packageJSON$productN;

  /* eslint-disable no-param-reassign */

  packageJSON.config.forge.electronWinstallerConfig.name = name.replace(/-/g, '_');
  packageJSON.config.forge.windowsStoreConfig.name = productName.replace(/-/g, '');
  packageJSON.config.forge.electronPackagerConfig.packageManager = (0, _yarnOrNpm2.default)();
  /* eslint-enable no-param-reassign */
}

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (dir) {
    const packageJSON = yield (0, _readPackageJson2.default)(dir);
    let forgeConfig = packageJSON.config.forge;
    if (typeof forgeConfig === 'string' && ((yield _fsExtra2.default.pathExists(_path2.default.resolve(dir, forgeConfig))) || (yield _fsExtra2.default.pathExists(_path2.default.resolve(dir, `${forgeConfig}.js`))))) {
      try {
        forgeConfig = require(_path2.default.resolve(dir, forgeConfig));
      } catch (err) {
        console.error(`Failed to load: ${_path2.default.resolve(dir, forgeConfig)}`);
        throw err;
      }
    } else if (typeof forgeConfig !== 'object') {
      throw new Error('Expected packageJSON.config.forge to be an object or point to a requirable JS file');
    }
    forgeConfig = (0, _assign2.default)({
      make_targets: {},
      publish_targets: {},
      electronPackagerConfig: {},
      electronRebuildConfig: {},
      electronWinstallerConfig: {},
      electronInstallerDebian: {},
      electronInstallerDMG: {},
      electronInstallerRedhat: {},
      s3: {},
      github_repository: {},
      electronReleaseServer: {}
    }, forgeConfig);
    forgeConfig.make_targets = (0, _assign2.default)({
      win32: ['squirrel'],
      darwin: ['zip'],
      mas: ['zip'],
      linux: ['deb', 'rpm']
    }, forgeConfig.make_targets);
    forgeConfig.publish_targets = (0, _assign2.default)({
      win32: ['github'],
      darwin: ['github'],
      mas: ['github'],
      linux: ['github']
    }, forgeConfig.publish_targets);

    const templateObj = (0, _assign2.default)({}, packageJSON, { year: new Date().getFullYear() });
    const template = function template(obj) {
      (0, _keys2.default)(obj).forEach(function (objKey) {
        if (typeof obj[objKey] === 'object' && obj !== null) {
          template(obj[objKey]);
        } else if (typeof obj[objKey] === 'string') {
          obj[objKey] = (0, _lodash2.default)(obj[objKey])(templateObj); // eslint-disable-line
          if (obj[objKey].startsWith('require:')) {
            obj[objKey] = require(_path2.default.resolve(dir, obj[objKey].substr(8))); // eslint-disable-line
          }
        }
      });
    };

    template(forgeConfig);

    return proxify(forgeConfig, 'ELECTRON_FORGE');
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvZm9yZ2UtY29uZmlnLmpzIl0sIm5hbWVzIjpbInNldEluaXRpYWxGb3JnZUNvbmZpZyIsInVuZGVyc2NvcmVDYXNlIiwic3RyIiwicmVwbGFjZSIsInRvVXBwZXJDYXNlIiwicHJveGlmeSIsIm9iamVjdCIsImVudlByZWZpeCIsIm5ld09iamVjdCIsImZvckVhY2giLCJrZXkiLCJBcnJheSIsImlzQXJyYXkiLCJQcm94eSIsImdldCIsInRhcmdldCIsIm5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImVudlZhbHVlIiwicHJvY2VzcyIsImVudiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIndyaXRhYmxlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInZhbHVlIiwicGFja2FnZUpTT04iLCJwcm9kdWN0TmFtZSIsImNvbmZpZyIsImZvcmdlIiwiZWxlY3Ryb25XaW5zdGFsbGVyQ29uZmlnIiwid2luZG93c1N0b3JlQ29uZmlnIiwiZWxlY3Ryb25QYWNrYWdlckNvbmZpZyIsInBhY2thZ2VNYW5hZ2VyIiwiZGlyIiwiZm9yZ2VDb25maWciLCJmcyIsInBhdGhFeGlzdHMiLCJwYXRoIiwicmVzb2x2ZSIsInJlcXVpcmUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIm1ha2VfdGFyZ2V0cyIsInB1Ymxpc2hfdGFyZ2V0cyIsImVsZWN0cm9uUmVidWlsZENvbmZpZyIsImVsZWN0cm9uSW5zdGFsbGVyRGViaWFuIiwiZWxlY3Ryb25JbnN0YWxsZXJETUciLCJlbGVjdHJvbkluc3RhbGxlclJlZGhhdCIsInMzIiwiZ2l0aHViX3JlcG9zaXRvcnkiLCJlbGVjdHJvblJlbGVhc2VTZXJ2ZXIiLCJ3aW4zMiIsImRhcndpbiIsIm1hcyIsImxpbnV4IiwidGVtcGxhdGVPYmoiLCJ5ZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwidGVtcGxhdGUiLCJvYmoiLCJvYmpLZXkiLCJzdGFydHNXaXRoIiwic3Vic3RyIl0sIm1hcHBpbmdzIjoi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VEQ7QUFVRCxLQVhEOztBQWFBSixhQUFTM0IsV0FBVDs7QUFFQSxXQUFPOUIsUUFBUThCLFdBQVIsRUFBcUIsZ0JBQXJCLENBQVA7QUFDRCxHIiwiZmlsZSI6InV0aWwvZm9yZ2UtY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF90ZW1wbGF0ZSBmcm9tICdsb2Rhc2gudGVtcGxhdGUnO1xuaW1wb3J0IHJlYWRQYWNrYWdlSlNPTiBmcm9tICcuL3JlYWQtcGFja2FnZS1qc29uJztcbmltcG9ydCB5YXJuT3JOcG0gZnJvbSAnLi95YXJuLW9yLW5wbSc7XG5cbmNvbnN0IHVuZGVyc2NvcmVDYXNlID0gc3RyID0+IHN0ci5yZXBsYWNlKC8oLikoW0EtWl1bYS16XSspL2csICckMV8kMicpLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csICckMV8kMicpLnRvVXBwZXJDYXNlKCk7XG5cbmNvbnN0IHByb3hpZnkgPSAob2JqZWN0LCBlbnZQcmVmaXgpID0+IHtcbiAgY29uc3QgbmV3T2JqZWN0ID0ge307XG5cbiAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkpIHtcbiAgICAgIG5ld09iamVjdFtrZXldID0gcHJveGlmeShvYmplY3Rba2V5XSwgYCR7ZW52UHJlZml4fV8ke3VuZGVyc2NvcmVDYXNlKGtleSl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld09iamVjdFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbmV3IFByb3h5KG5ld09iamVjdCwge1xuICAgIGdldCh0YXJnZXQsIG5hbWUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgIGlmICghdGFyZ2V0Lmhhc093blByb3BlcnR5KG5hbWUpICYmIHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBlbnZWYWx1ZSA9IHByb2Nlc3MuZW52W2Ake2VudlByZWZpeH1fJHt1bmRlcnNjb3JlQ2FzZShuYW1lKX1gXTtcbiAgICAgICAgaWYgKGVudlZhbHVlKSByZXR1cm4gZW52VmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0W25hbWVdO1xuICAgIH0sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgbmFtZSkge1xuICAgICAgY29uc3QgZW52VmFsdWUgPSBwcm9jZXNzLmVudltgJHtlbnZQcmVmaXh9XyR7dW5kZXJzY29yZUNhc2UobmFtZSl9YF07XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgbmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKGVudlZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7IHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBlbnZWYWx1ZSB9O1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xufTtcblxuLyoqXG4gKiBTZXRzIHNlbnNpYmxlIGRlZmF1bHRzIGZvciB0aGUgYGNvbmZpZy5mb3JnZWAgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5pdGlhbEZvcmdlQ29uZmlnKHBhY2thZ2VKU09OKSB7XG4gIGNvbnN0IHsgbmFtZSA9ICcnLCBwcm9kdWN0TmFtZSA9IG5hbWUgfSA9IHBhY2thZ2VKU09OO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gIHBhY2thZ2VKU09OLmNvbmZpZy5mb3JnZS5lbGVjdHJvbldpbnN0YWxsZXJDb25maWcubmFtZSA9IG5hbWUucmVwbGFjZSgvLS9nLCAnXycpO1xuICBwYWNrYWdlSlNPTi5jb25maWcuZm9yZ2Uud2luZG93c1N0b3JlQ29uZmlnLm5hbWUgPSBwcm9kdWN0TmFtZS5yZXBsYWNlKC8tL2csICcnKTtcbiAgcGFja2FnZUpTT04uY29uZmlnLmZvcmdlLmVsZWN0cm9uUGFja2FnZXJDb25maWcucGFja2FnZU1hbmFnZXIgPSB5YXJuT3JOcG0oKTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyKSA9PiB7XG4gIGNvbnN0IHBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKGRpcik7XG4gIGxldCBmb3JnZUNvbmZpZyA9IHBhY2thZ2VKU09OLmNvbmZpZy5mb3JnZTtcbiAgaWYgKHR5cGVvZiBmb3JnZUNvbmZpZyA9PT0gJ3N0cmluZycgJiYgKGF3YWl0IGZzLnBhdGhFeGlzdHMocGF0aC5yZXNvbHZlKGRpciwgZm9yZ2VDb25maWcpKSB8fCBhd2FpdCBmcy5wYXRoRXhpc3RzKHBhdGgucmVzb2x2ZShkaXIsIGAke2ZvcmdlQ29uZmlnfS5qc2ApKSkpIHtcbiAgICB0cnkge1xuICAgICAgZm9yZ2VDb25maWcgPSByZXF1aXJlKHBhdGgucmVzb2x2ZShkaXIsIGZvcmdlQ29uZmlnKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gbG9hZDogJHtwYXRoLnJlc29sdmUoZGlyLCBmb3JnZUNvbmZpZyl9YCk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBmb3JnZUNvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHBhY2thZ2VKU09OLmNvbmZpZy5mb3JnZSB0byBiZSBhbiBvYmplY3Qgb3IgcG9pbnQgdG8gYSByZXF1aXJhYmxlIEpTIGZpbGUnKTtcbiAgfVxuICBmb3JnZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIG1ha2VfdGFyZ2V0czoge30sXG4gICAgcHVibGlzaF90YXJnZXRzOiB7fSxcbiAgICBlbGVjdHJvblBhY2thZ2VyQ29uZmlnOiB7fSxcbiAgICBlbGVjdHJvblJlYnVpbGRDb25maWc6IHt9LFxuICAgIGVsZWN0cm9uV2luc3RhbGxlckNvbmZpZzoge30sXG4gICAgZWxlY3Ryb25JbnN0YWxsZXJEZWJpYW46IHt9LFxuICAgIGVsZWN0cm9uSW5zdGFsbGVyRE1HOiB7fSxcbiAgICBlbGVjdHJvbkluc3RhbGxlclJlZGhhdDoge30sXG4gICAgczM6IHt9LFxuICAgIGdpdGh1Yl9yZXBvc2l0b3J5OiB7fSxcbiAgICBlbGVjdHJvblJlbGVhc2VTZXJ2ZXI6IHt9LFxuICB9LCBmb3JnZUNvbmZpZyk7XG4gIGZvcmdlQ29uZmlnLm1ha2VfdGFyZ2V0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHdpbjMyOiBbJ3NxdWlycmVsJ10sXG4gICAgZGFyd2luOiBbJ3ppcCddLFxuICAgIG1hczogWyd6aXAnXSxcbiAgICBsaW51eDogWydkZWInLCAncnBtJ10sXG4gIH0sIGZvcmdlQ29uZmlnLm1ha2VfdGFyZ2V0cyk7XG4gIGZvcmdlQ29uZmlnLnB1Ymxpc2hfdGFyZ2V0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHdpbjMyOiBbJ2dpdGh1YiddLFxuICAgIGRhcndpbjogWydnaXRodWInXSxcbiAgICBtYXM6IFsnZ2l0aHViJ10sXG4gICAgbGludXg6IFsnZ2l0aHViJ10sXG4gIH0sIGZvcmdlQ29uZmlnLnB1Ymxpc2hfdGFyZ2V0cyk7XG5cbiAgY29uc3QgdGVtcGxhdGVPYmogPSBPYmplY3QuYXNzaWduKHt9LCBwYWNrYWdlSlNPTiwgeyB5ZWFyOiAobmV3IERhdGUoKSkuZ2V0RnVsbFllYXIoKSB9KTtcbiAgY29uc3QgdGVtcGxhdGUgPSAob2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChvYmpLZXkpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW29iaktleV0gPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCkge1xuICAgICAgICB0ZW1wbGF0ZShvYmpbb2JqS2V5XSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpbb2JqS2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb2JqW29iaktleV0gPSBfdGVtcGxhdGUob2JqW29iaktleV0pKHRlbXBsYXRlT2JqKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBpZiAob2JqW29iaktleV0uc3RhcnRzV2l0aCgncmVxdWlyZTonKSkge1xuICAgICAgICAgIG9ialtvYmpLZXldID0gcmVxdWlyZShwYXRoLnJlc29sdmUoZGlyLCBvYmpbb2JqS2V5XS5zdWJzdHIoOCkpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgdGVtcGxhdGUoZm9yZ2VDb25maWcpO1xuXG4gIHJldHVybiBwcm94aWZ5KGZvcmdlQ29uZmlnLCAnRUxFQ1RST05fRk9SR0UnKTtcbn07XG4iXX0=