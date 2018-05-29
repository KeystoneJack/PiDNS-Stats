'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

require('colors');

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _getElectronVersion = require('../util/get-electron-version');

var _getElectronVersion2 = _interopRequireDefault(_getElectronVersion);

var _readPackageJson = require('../util/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

var _rebuild = require('../util/rebuild');

var _rebuild2 = _interopRequireDefault(_rebuild);

var _resolveDir = require('../util/resolve-dir');

var _resolveDir2 = _interopRequireDefault(_resolveDir);

var _forgeConfig = require('../util/forge-config');

var _forgeConfig2 = _interopRequireDefault(_forgeConfig);

var _hook = require('../util/hook');

var _hook2 = _interopRequireDefault(_hook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} StartOptions
 * @property {string} [dir=process.cwd()] The path to the electron forge project to run
 * @property {string} [appPath='.'] The path (relative to dir) to the electron app to run relative to the project directory
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {boolean} [enableLogging=false] Enables advanced internal Electron debug calls
 * @property {Array<string>} [args] Arguments to pass through to the launched Electron application
 */

/**
 * Start an Electron application.
 *
 * @param {StartOptions} providedOptions - Options for the Publish method
 * @return {Promise} Will resolve when the application is launched
 */
exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    var _Object$assign = (0, _assign2.default)({
      dir: process.cwd(),
      appPath: '.',
      interactive: false,
      enableLogging: false,
      args: [],
      runAsNode: false,
      inspect: false
    }, providedOptions);

    let dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        enableLogging = _Object$assign.enableLogging,
        appPath = _Object$assign.appPath,
        args = _Object$assign.args,
        runAsNode = _Object$assign.runAsNode,
        inspect = _Object$assign.inspect;

    _oraHandler2.default.interactive = interactive;

    yield (0, _oraHandler2.default)('Locating Application', (0, _bluebird.coroutine)(function* () {
      dir = yield (0, _resolveDir2.default)(dir);
      if (!dir) {
        throw 'Failed to locate startable Electron application';
      }
    }));

    const packageJSON = yield (0, _readPackageJson2.default)(dir);

    if (!packageJSON.version) {
      throw `Please set your application's 'version' in '${dir}/package.json'.`;
    }

    const forgeConfig = yield (0, _forgeConfig2.default)(dir);
    const electronVersion = yield (0, _getElectronVersion2.default)(dir);

    yield (0, _rebuild2.default)(dir, electronVersion, process.platform, process.arch, forgeConfig.electronRebuildConfig);

    const spawnOpts = {
      cwd: dir,
      stdio: 'inherit',
      env: (0, _assign2.default)({}, process.env, enableLogging ? {
        ELECTRON_ENABLE_LOGGING: true,
        ELECTRON_ENABLE_STACK_DUMPING: true
      } : {})
    };

    if (runAsNode) {
      spawnOpts.env.ELECTRON_RUN_AS_NODE = true;
    } else {
      delete spawnOpts.env.ELECTRON_RUN_AS_NODE;
    }

    if (inspect) {
      args = ['--inspect'].concat(args);
    }

    let spawned;

    yield (0, _hook2.default)(forgeConfig, 'generateAssets');

    yield (0, _oraHandler2.default)('Launching Application', (0, _bluebird.coroutine)(function* () {
      spawned = (0, _child_process.spawn)(process.execPath, [_path2.default.resolve(dir, 'node_modules/electron-prebuilt-compile/lib/cli'), appPath].concat(args), spawnOpts);
    }));

    return spawned;
  });

  return function () {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9zdGFydC5qcyJdLCJuYW1lcyI6WyJwcm92aWRlZE9wdGlvbnMiLCJkaXIiLCJwcm9jZXNzIiwiY3dkIiwiYXBwUGF0aCIsImludGVyYWN0aXZlIiwiZW5hYmxlTG9nZ2luZyIsImFyZ3MiLCJydW5Bc05vZGUiLCJpbnNwZWN0IiwiYXN5bmNPcmEiLCJwYWNrYWdlSlNPTiIsInZlcnNpb24iLCJmb3JnZUNvbmZpZyIsImVsZWN0cm9uVmVyc2lvbiIsInBsYXRmb3JtIiwiYXJjaCIsImVsZWN0cm9uUmVidWlsZENvbmZpZyIsInNwYXduT3B0cyIsInN0ZGlvIiwiZW52IiwiRUxFQ1RST05fRU5BQkxFX0xPR0dJTkciLCJFTEVDVFJPTl9FTkFCTEVfU1RBQ0tfRFVNUElORyIsIkVMRUNUUk9OX1JVTl9BU19OT0RFIiwiY29uY2F0Iiwic3Bhd25lZCIsImV4ZWNQYXRoIiwicGF0aCIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7QUFTQTs7Ozs7OztzQ0FNZSxXQUFPQSxrQkFBa0IsRUFBekIsRUFBZ0M7QUFDN0M7QUFENkMseUJBRWdDLHNCQUFjO0FBQ3pGQyxXQUFLQyxRQUFRQyxHQUFSLEVBRG9GO0FBRXpGQyxlQUFTLEdBRmdGO0FBR3pGQyxtQkFBYSxLQUg0RTtBQUl6RkMscUJBQWUsS0FKMEU7QUFLekZDLFlBQU0sRUFMbUY7QUFNekZDLGlCQUFXLEtBTjhFO0FBT3pGQyxlQUFTO0FBUGdGLEtBQWQsRUFRMUVULGVBUjBFLENBRmhDOztBQUFBLFFBRXZDQyxHQUZ1QyxrQkFFdkNBLEdBRnVDO0FBQUEsUUFFbENJLFdBRmtDLGtCQUVsQ0EsV0FGa0M7QUFBQSxRQUVyQkMsYUFGcUIsa0JBRXJCQSxhQUZxQjtBQUFBLFFBRU5GLE9BRk0sa0JBRU5BLE9BRk07QUFBQSxRQUVHRyxJQUZILGtCQUVHQSxJQUZIO0FBQUEsUUFFU0MsU0FGVCxrQkFFU0EsU0FGVDtBQUFBLFFBRW9CQyxPQUZwQixrQkFFb0JBLE9BRnBCOztBQVc3Q0MseUJBQVNMLFdBQVQsR0FBdUJBLFdBQXZCOztBQUVBLFVBQU0sMEJBQVMsc0JBQVQsMkJBQWlDLGFBQVk7QUFDakRKLFlBQU0sTUFBTSwwQkFBV0EsR0FBWCxDQUFaO0FBQ0EsVUFBSSxDQUFDQSxHQUFMLEVBQVU7QUFDUixjQUFNLGlEQUFOO0FBQ0Q7QUFDRixLQUxLLEVBQU47O0FBT0EsVUFBTVUsY0FBYyxNQUFNLCtCQUFnQlYsR0FBaEIsQ0FBMUI7O0FBRUEsUUFBSSxDQUFDVSxZQUFZQyxPQUFqQixFQUEwQjtBQUN4QixZQUFPLCtDQUE4Q1gsR0FBSSxpQkFBekQ7QUFDRDs7QUFFRCxVQUFNWSxjQUFjLE1BQU0sMkJBQWVaLEdBQWYsQ0FBMUI7QUFDQSxVQUFNYSxrQkFBa0IsTUFBTSxrQ0FBbUJiLEdBQW5CLENBQTlCOztBQUVBLFVBQU0sdUJBQVFBLEdBQVIsRUFBYWEsZUFBYixFQUE4QlosUUFBUWEsUUFBdEMsRUFBZ0RiLFFBQVFjLElBQXhELEVBQThESCxZQUFZSSxxQkFBMUUsQ0FBTjs7QUFFQSxVQUFNQyxZQUFZO0FBQ2hCZixXQUFLRixHQURXO0FBRWhCa0IsYUFBTyxTQUZTO0FBR2hCQyxXQUFLLHNCQUFjLEVBQWQsRUFBa0JsQixRQUFRa0IsR0FBMUIsRUFBK0JkLGdCQUFnQjtBQUNsRGUsaUNBQXlCLElBRHlCO0FBRWxEQyx1Q0FBK0I7QUFGbUIsT0FBaEIsR0FHaEMsRUFIQztBQUhXLEtBQWxCOztBQVNBLFFBQUlkLFNBQUosRUFBZTtBQUNiVSxnQkFBVUUsR0FBVixDQUFjRyxvQkFBZCxHQUFxQyxJQUFyQztBQUNELEtBRkQsTUFFTztBQUNMLGFBQU9MLFVBQVVFLEdBQVYsQ0FBY0csb0JBQXJCO0FBQ0Q7O0FBRUQsUUFBSWQsT0FBSixFQUFhO0FBQ1hGLGFBQU8sQ0FBQyxXQUFELEVBQWNpQixNQUFkLENBQXFCakIsSUFBckIsQ0FBUDtBQUNEOztBQUVELFFBQUlrQixPQUFKOztBQUVBLFVBQU0sb0JBQVFaLFdBQVIsRUFBcUIsZ0JBQXJCLENBQU47O0FBRUEsVUFBTSwwQkFBUyx1QkFBVCwyQkFBa0MsYUFBWTtBQUNsRFksZ0JBQVUsMEJBQU12QixRQUFRd0IsUUFBZCxFQUF3QixDQUFDQyxlQUFLQyxPQUFMLENBQWEzQixHQUFiLEVBQWtCLGdEQUFsQixDQUFELEVBQXNFRyxPQUF0RSxFQUErRW9CLE1BQS9FLENBQXNGakIsSUFBdEYsQ0FBeEIsRUFBcUhXLFNBQXJILENBQVY7QUFDRCxLQUZLLEVBQU47O0FBSUEsV0FBT08sT0FBUDtBQUNELEciLCJmaWxlIjoiYXBpL3N0YXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xuaW1wb3J0IHsgc3Bhd24gfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5pbXBvcnQgZ2V0RWxlY3Ryb25WZXJzaW9uIGZyb20gJy4uL3V0aWwvZ2V0LWVsZWN0cm9uLXZlcnNpb24nO1xuaW1wb3J0IHJlYWRQYWNrYWdlSlNPTiBmcm9tICcuLi91dGlsL3JlYWQtcGFja2FnZS1qc29uJztcbmltcG9ydCByZWJ1aWxkIGZyb20gJy4uL3V0aWwvcmVidWlsZCc7XG5pbXBvcnQgcmVzb2x2ZURpciBmcm9tICcuLi91dGlsL3Jlc29sdmUtZGlyJztcbmltcG9ydCBnZXRGb3JnZUNvbmZpZyBmcm9tICcuLi91dGlsL2ZvcmdlLWNvbmZpZyc7XG5pbXBvcnQgcnVuSG9vayBmcm9tICcuLi91dGlsL2hvb2snO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXJ0T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkaXI9cHJvY2Vzcy5jd2QoKV0gVGhlIHBhdGggdG8gdGhlIGVsZWN0cm9uIGZvcmdlIHByb2plY3QgdG8gcnVuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2FwcFBhdGg9Jy4nXSBUaGUgcGF0aCAocmVsYXRpdmUgdG8gZGlyKSB0byB0aGUgZWxlY3Ryb24gYXBwIHRvIHJ1biByZWxhdGl2ZSB0byB0aGUgcHJvamVjdCBkaXJlY3RvcnlcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2ludGVyYWN0aXZlPWZhbHNlXSBXaGV0aGVyIHRvIHVzZSBzZW5zaWJsZSBkZWZhdWx0cyBvciBwcm9tcHQgdGhlIHVzZXIgdmlzdWFsbHlcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2VuYWJsZUxvZ2dpbmc9ZmFsc2VdIEVuYWJsZXMgYWR2YW5jZWQgaW50ZXJuYWwgRWxlY3Ryb24gZGVidWcgY2FsbHNcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gW2FyZ3NdIEFyZ3VtZW50cyB0byBwYXNzIHRocm91Z2ggdG8gdGhlIGxhdW5jaGVkIEVsZWN0cm9uIGFwcGxpY2F0aW9uXG4gKi9cblxuLyoqXG4gKiBTdGFydCBhbiBFbGVjdHJvbiBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1N0YXJ0T3B0aW9uc30gcHJvdmlkZWRPcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIFB1Ymxpc2ggbWV0aG9kXG4gKiBAcmV0dXJuIHtQcm9taXNlfSBXaWxsIHJlc29sdmUgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgbGF1bmNoZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHByb3ZpZGVkT3B0aW9ucyA9IHt9KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3QsIG5vLXVudXNlZC12YXJzXG4gIGxldCB7IGRpciwgaW50ZXJhY3RpdmUsIGVuYWJsZUxvZ2dpbmcsIGFwcFBhdGgsIGFyZ3MsIHJ1bkFzTm9kZSwgaW5zcGVjdCB9ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgZGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGFwcFBhdGg6ICcuJyxcbiAgICBpbnRlcmFjdGl2ZTogZmFsc2UsXG4gICAgZW5hYmxlTG9nZ2luZzogZmFsc2UsXG4gICAgYXJnczogW10sXG4gICAgcnVuQXNOb2RlOiBmYWxzZSxcbiAgICBpbnNwZWN0OiBmYWxzZSxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcbiAgYXN5bmNPcmEuaW50ZXJhY3RpdmUgPSBpbnRlcmFjdGl2ZTtcblxuICBhd2FpdCBhc3luY09yYSgnTG9jYXRpbmcgQXBwbGljYXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgZGlyID0gYXdhaXQgcmVzb2x2ZURpcihkaXIpO1xuICAgIGlmICghZGlyKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGxvY2F0ZSBzdGFydGFibGUgRWxlY3Ryb24gYXBwbGljYXRpb24nO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04oZGlyKTtcblxuICBpZiAoIXBhY2thZ2VKU09OLnZlcnNpb24pIHtcbiAgICB0aHJvdyBgUGxlYXNlIHNldCB5b3VyIGFwcGxpY2F0aW9uJ3MgJ3ZlcnNpb24nIGluICcke2Rpcn0vcGFja2FnZS5qc29uJy5gO1xuICB9XG5cbiAgY29uc3QgZm9yZ2VDb25maWcgPSBhd2FpdCBnZXRGb3JnZUNvbmZpZyhkaXIpO1xuICBjb25zdCBlbGVjdHJvblZlcnNpb24gPSBhd2FpdCBnZXRFbGVjdHJvblZlcnNpb24oZGlyKTtcblxuICBhd2FpdCByZWJ1aWxkKGRpciwgZWxlY3Ryb25WZXJzaW9uLCBwcm9jZXNzLnBsYXRmb3JtLCBwcm9jZXNzLmFyY2gsIGZvcmdlQ29uZmlnLmVsZWN0cm9uUmVidWlsZENvbmZpZyk7XG5cbiAgY29uc3Qgc3Bhd25PcHRzID0ge1xuICAgIGN3ZDogZGlyLFxuICAgIHN0ZGlvOiAnaW5oZXJpdCcsXG4gICAgZW52OiBPYmplY3QuYXNzaWduKHt9LCBwcm9jZXNzLmVudiwgZW5hYmxlTG9nZ2luZyA/IHtcbiAgICAgIEVMRUNUUk9OX0VOQUJMRV9MT0dHSU5HOiB0cnVlLFxuICAgICAgRUxFQ1RST05fRU5BQkxFX1NUQUNLX0RVTVBJTkc6IHRydWUsXG4gICAgfSA6IHt9KSxcbiAgfTtcblxuICBpZiAocnVuQXNOb2RlKSB7XG4gICAgc3Bhd25PcHRzLmVudi5FTEVDVFJPTl9SVU5fQVNfTk9ERSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIHNwYXduT3B0cy5lbnYuRUxFQ1RST05fUlVOX0FTX05PREU7XG4gIH1cblxuICBpZiAoaW5zcGVjdCkge1xuICAgIGFyZ3MgPSBbJy0taW5zcGVjdCddLmNvbmNhdChhcmdzKTtcbiAgfVxuXG4gIGxldCBzcGF3bmVkO1xuXG4gIGF3YWl0IHJ1bkhvb2soZm9yZ2VDb25maWcsICdnZW5lcmF0ZUFzc2V0cycpO1xuXG4gIGF3YWl0IGFzeW5jT3JhKCdMYXVuY2hpbmcgQXBwbGljYXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgc3Bhd25lZCA9IHNwYXduKHByb2Nlc3MuZXhlY1BhdGgsIFtwYXRoLnJlc29sdmUoZGlyLCAnbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXByZWJ1aWx0LWNvbXBpbGUvbGliL2NsaScpLCBhcHBQYXRoXS5jb25jYXQoYXJncyksIHNwYXduT3B0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBzcGF3bmVkO1xufTtcbiJdfQ==