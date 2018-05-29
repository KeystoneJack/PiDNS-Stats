'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

require('colors');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _electronPackager = require('electron-packager');

var _electronPackager2 = _interopRequireDefault(_electronPackager);

var _targets = require('electron-packager/targets');

var _forgeConfig = require('../util/forge-config');

var _forgeConfig2 = _interopRequireDefault(_forgeConfig);

var _getElectronVersion = require('../util/get-electron-version');

var _getElectronVersion2 = _interopRequireDefault(_getElectronVersion);

var _hook = require('../util/hook');

var _hook2 = _interopRequireDefault(_hook);

var _messages = require('../util/messages');

var _ora = require('../util/ora');

var _ora2 = _interopRequireDefault(_ora);

var _compileHook = require('../util/compile-hook');

var _compileHook2 = _interopRequireDefault(_compileHook);

var _readPackageJson = require('../util/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

var _rebuild = require('../util/rebuild');

var _rebuild2 = _interopRequireDefault(_rebuild);

var _requireSearch = require('../util/require-search');

var _requireSearch2 = _interopRequireDefault(_requireSearch);

var _resolveDir = require('../util/resolve-dir');

var _resolveDir2 = _interopRequireDefault(_resolveDir);

var _outDir = require('../util/out-dir');

var _outDir2 = _interopRequireDefault(_outDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:packager');

/**
 * @typedef {Object} PackageOptions
 * @property {string} [dir=process.cwd()] The path to the app to package
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {string} [arch=process.arch] The target arch
 * @property {string} [platform=process.platform] The target platform.
 * @property {string} [outDir=`${dir}/out`] The path to the output directory for packaged apps
 */

/**
 * Resolves hooks if they are a path to a file (instead of a `Function`).
 */
function resolveHooks(hooks, dir) {
  if (hooks) {
    return hooks.map(hook => typeof hook === 'string' ? (0, _requireSearch2.default)(dir, [hook]) : hook);
  }

  return [];
}

function sequentialHooks(hooks) {
  return [(() => {
    var _ref = (0, _bluebird.coroutine)(function* (...args) {
      const done = args[args.length - 1];
      const passedArgs = args.splice(0, args.length - 1);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(hooks), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const hook = _step.value;

          yield (0, _pify2.default)(hook)(...passedArgs);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      done();
    });

    return function () {
      return _ref.apply(this, arguments);
    };
  })()];
}

/**
 * Package an Electron application into an platform dependent format.
 *
 * @param {PackageOptions} providedOptions - Options for the Package method
 * @return {Promise} Will resolve when the package process is complete
 */

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    var _Object$assign = (0, _assign2.default)({
      dir: process.cwd(),
      interactive: false,
      arch: (0, _targets.hostArch)(),
      platform: process.platform
    }, providedOptions);

    let dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        arch = _Object$assign.arch,
        platform = _Object$assign.platform;


    const ora = interactive ? _ora2.default : _ora.fakeOra;

    let prepareSpinner = ora(`Preparing to Package Application for arch: ${(arch === 'all' ? 'ia32' : arch).cyan}`).start();
    let prepareCounter = 0;

    dir = yield (0, _resolveDir2.default)(dir);
    if (!dir) {
      throw 'Failed to locate compilable Electron application';
    }

    const packageJSON = yield (0, _readPackageJson2.default)(dir);

    if (_path2.default.dirname(require.resolve(_path2.default.resolve(dir, packageJSON.main))) === dir) {
      console.error(`Entry point: ${packageJSON.main}`.red);
      throw 'The entry point to your application ("packageJSON.main") must be in a subfolder not in the top level directory';
    }

    const forgeConfig = yield (0, _forgeConfig2.default)(dir);
    const outDir = providedOptions.outDir || (0, _outDir2.default)(dir, forgeConfig);
    let packagerSpinner;

    const pruneEnabled = !('prune' in forgeConfig.electronPackagerConfig) || forgeConfig.electronPackagerConfig.prune;

    const rebuildHookFn = (() => {
      var _ref3 = (0, _bluebird.coroutine)(function* (buildPath, electronVersion, pPlatform, pArch, done) {
        yield (0, _rebuild2.default)(buildPath, electronVersion, pPlatform, pArch, forgeConfig.electronRebuildConfig);
        packagerSpinner = ora('Packaging Application').start();
        done();
      });

      return function rebuildHookFn(_x, _x2, _x3, _x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    })();

    const afterCopyHooks = [(() => {
      var _ref4 = (0, _bluebird.coroutine)(function* (buildPath, electronVersion, pPlatform, pArch, done) {
        if (packagerSpinner) {
          packagerSpinner.succeed();
          prepareCounter += 1;
          prepareSpinner = ora(`Preparing to Package Application for arch: ${(prepareCounter === 2 ? 'armv7l' : 'x64').cyan}`).start();
        }
        yield _fsExtra2.default.remove(_path2.default.resolve(buildPath, 'node_modules/electron-compile/test'));
        const bins = yield (0, _pify2.default)(_glob2.default)(_path2.default.join(buildPath, '**/.bin/**/*'));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(bins), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            const bin = _step2.value;

            yield _fsExtra2.default.remove(bin);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        done();
      });

      return function (_x6, _x7, _x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
      };
    })(), (() => {
      var _ref5 = (0, _bluebird.coroutine)(function* (...args) {
        prepareSpinner.succeed();
        yield (0, _compileHook2.default)(dir, ...args);
      });

      return function () {
        return _ref5.apply(this, arguments);
      };
    })()];

    if (!pruneEnabled) {
      afterCopyHooks.push(rebuildHookFn);
    }

    afterCopyHooks.push((() => {
      var _ref6 = (0, _bluebird.coroutine)(function* (buildPath, electronVersion, pPlatform, pArch, done) {
        const copiedPackageJSON = yield (0, _readPackageJson2.default)(buildPath);
        if (copiedPackageJSON.config && copiedPackageJSON.config.forge) {
          delete copiedPackageJSON.config.forge;
        }
        yield _fsExtra2.default.writeJson(_path2.default.resolve(buildPath, 'package.json'), copiedPackageJSON, { spaces: 2 });
        done();
      });

      return function (_x11, _x12, _x13, _x14, _x15) {
        return _ref6.apply(this, arguments);
      };
    })());

    afterCopyHooks.push(...resolveHooks(forgeConfig.electronPackagerConfig.afterCopy, dir));

    const afterPruneHooks = [];

    if (pruneEnabled) {
      afterPruneHooks.push(rebuildHookFn);
      afterPruneHooks.push(...resolveHooks(forgeConfig.electronPackagerConfig.afterPrune, dir));
    }

    const packageOpts = (0, _assign2.default)({
      asar: false,
      overwrite: true
    }, forgeConfig.electronPackagerConfig, {
      afterCopy: sequentialHooks(afterCopyHooks),
      afterExtract: sequentialHooks(resolveHooks(forgeConfig.electronPackagerConfig.afterExtract, dir)),
      afterPrune: sequentialHooks(afterPruneHooks),
      dir,
      arch,
      platform,
      out: outDir,
      electronVersion: yield (0, _getElectronVersion2.default)(dir)
    });
    packageOpts.quiet = true;
    if (packageOpts.all) {
      throw new Error('electronPackagerConfig.all is not supported by Electron Forge.');
    }
    if (typeof packageOpts.asar === 'object' && packageOpts.asar.unpack) {
      throw new Error('electron-compile does not support asar.unpack yet.  Please use asar.unpackDir');
    }

    if (!packageJSON.version && !packageOpts.appVersion) {
      // eslint-disable-next-line max-len
      (0, _messages.warn)(interactive, "Please set 'version' or 'config.forge.electronPackagerConfig.appVersion' in your application's package.json so auto-updates work properly".yellow);
    }

    yield (0, _hook2.default)(forgeConfig, 'generateAssets');
    yield (0, _hook2.default)(forgeConfig, 'prePackage');

    d('packaging with options', packageOpts);

    yield (0, _electronPackager2.default)(packageOpts);

    yield (0, _hook2.default)(forgeConfig, 'postPackage');

    packagerSpinner.succeed();
  });

  return function () {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbImQiLCJyZXNvbHZlSG9va3MiLCJob29rcyIsImRpciIsIm1hcCIsImhvb2siLCJzZXF1ZW50aWFsSG9va3MiLCJhcmdzIiwiZG9uZSIsImxlbmd0aCIsInBhc3NlZEFyZ3MiLCJzcGxpY2UiLCJwcm92aWRlZE9wdGlvbnMiLCJwcm9jZXNzIiwiY3dkIiwiaW50ZXJhY3RpdmUiLCJhcmNoIiwicGxhdGZvcm0iLCJvcmEiLCJyZWFsT3JhIiwiZmFrZU9yYSIsInByZXBhcmVTcGlubmVyIiwiY3lhbiIsInN0YXJ0IiwicHJlcGFyZUNvdW50ZXIiLCJwYWNrYWdlSlNPTiIsInBhdGgiLCJkaXJuYW1lIiwicmVxdWlyZSIsInJlc29sdmUiLCJtYWluIiwiY29uc29sZSIsImVycm9yIiwicmVkIiwiZm9yZ2VDb25maWciLCJvdXREaXIiLCJwYWNrYWdlclNwaW5uZXIiLCJwcnVuZUVuYWJsZWQiLCJlbGVjdHJvblBhY2thZ2VyQ29uZmlnIiwicHJ1bmUiLCJyZWJ1aWxkSG9va0ZuIiwiYnVpbGRQYXRoIiwiZWxlY3Ryb25WZXJzaW9uIiwicFBsYXRmb3JtIiwicEFyY2giLCJlbGVjdHJvblJlYnVpbGRDb25maWciLCJhZnRlckNvcHlIb29rcyIsInN1Y2NlZWQiLCJmcyIsInJlbW92ZSIsImJpbnMiLCJnbG9iIiwiam9pbiIsImJpbiIsInB1c2giLCJjb3BpZWRQYWNrYWdlSlNPTiIsImNvbmZpZyIsImZvcmdlIiwid3JpdGVKc29uIiwic3BhY2VzIiwiYWZ0ZXJDb3B5IiwiYWZ0ZXJQcnVuZUhvb2tzIiwiYWZ0ZXJQcnVuZSIsInBhY2thZ2VPcHRzIiwiYXNhciIsIm92ZXJ3cml0ZSIsImFmdGVyRXh0cmFjdCIsIm91dCIsInF1aWV0IiwiYWxsIiwiRXJyb3IiLCJ1bnBhY2siLCJ2ZXJzaW9uIiwiYXBwVmVyc2lvbiIsInllbGxvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FB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Z0NBQVNBLFdBQVQsQ0FBTjs7QUFFQSxVQUFNLG9CQUFRN0IsV0FBUixFQUFxQixhQUFyQixDQUFOOztBQUVBRSxvQkFBZ0JXLE9BQWhCO0FBQ0QsRyIsImZpbGUiOiJhcGkvcGFja2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuaW1wb3J0IHBhY2thZ2VyIGZyb20gJ2VsZWN0cm9uLXBhY2thZ2VyJztcbmltcG9ydCB7IGhvc3RBcmNoIH0gZnJvbSAnZWxlY3Ryb24tcGFja2FnZXIvdGFyZ2V0cyc7XG5cbmltcG9ydCBnZXRGb3JnZUNvbmZpZyBmcm9tICcuLi91dGlsL2ZvcmdlLWNvbmZpZyc7XG5pbXBvcnQgZ2V0RWxlY3Ryb25WZXJzaW9uIGZyb20gJy4uL3V0aWwvZ2V0LWVsZWN0cm9uLXZlcnNpb24nO1xuaW1wb3J0IHJ1bkhvb2sgZnJvbSAnLi4vdXRpbC9ob29rJztcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlsL21lc3NhZ2VzJztcbmltcG9ydCByZWFsT3JhLCB7IGZha2VPcmEgfSBmcm9tICcuLi91dGlsL29yYSc7XG5pbXBvcnQgcGFja2FnZXJDb21waWxlSG9vayBmcm9tICcuLi91dGlsL2NvbXBpbGUtaG9vayc7XG5pbXBvcnQgcmVhZFBhY2thZ2VKU09OIGZyb20gJy4uL3V0aWwvcmVhZC1wYWNrYWdlLWpzb24nO1xuaW1wb3J0IHJlYnVpbGRIb29rIGZyb20gJy4uL3V0aWwvcmVidWlsZCc7XG5pbXBvcnQgcmVxdWlyZVNlYXJjaCBmcm9tICcuLi91dGlsL3JlcXVpcmUtc2VhcmNoJztcbmltcG9ydCByZXNvbHZlRGlyIGZyb20gJy4uL3V0aWwvcmVzb2x2ZS1kaXInO1xuaW1wb3J0IGdldEN1cnJlbnRPdXREaXIgZnJvbSAnLi4vdXRpbC9vdXQtZGlyJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpwYWNrYWdlcicpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhY2thZ2VPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Rpcj1wcm9jZXNzLmN3ZCgpXSBUaGUgcGF0aCB0byB0aGUgYXBwIHRvIHBhY2thZ2VcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2ludGVyYWN0aXZlPWZhbHNlXSBXaGV0aGVyIHRvIHVzZSBzZW5zaWJsZSBkZWZhdWx0cyBvciBwcm9tcHQgdGhlIHVzZXIgdmlzdWFsbHlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbYXJjaD1wcm9jZXNzLmFyY2hdIFRoZSB0YXJnZXQgYXJjaFxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtwbGF0Zm9ybT1wcm9jZXNzLnBsYXRmb3JtXSBUaGUgdGFyZ2V0IHBsYXRmb3JtLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtvdXREaXI9YCR7ZGlyfS9vdXRgXSBUaGUgcGF0aCB0byB0aGUgb3V0cHV0IGRpcmVjdG9yeSBmb3IgcGFja2FnZWQgYXBwc1xuICovXG5cbi8qKlxuICogUmVzb2x2ZXMgaG9va3MgaWYgdGhleSBhcmUgYSBwYXRoIHRvIGEgZmlsZSAoaW5zdGVhZCBvZiBhIGBGdW5jdGlvbmApLlxuICovXG5mdW5jdGlvbiByZXNvbHZlSG9va3MoaG9va3MsIGRpcikge1xuICBpZiAoaG9va3MpIHtcbiAgICByZXR1cm4gaG9va3MubWFwKGhvb2sgPT4gKHR5cGVvZiBob29rID09PSAnc3RyaW5nJyA/IHJlcXVpcmVTZWFyY2goZGlyLCBbaG9va10pIDogaG9vaykpO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG5mdW5jdGlvbiBzZXF1ZW50aWFsSG9va3MoaG9va3MpIHtcbiAgcmV0dXJuIFthc3luYyAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGRvbmUgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgcGFzc2VkQXJncyA9IGFyZ3Muc3BsaWNlKDAsIGFyZ3MubGVuZ3RoIC0gMSk7XG4gICAgZm9yIChjb25zdCBob29rIG9mIGhvb2tzKSB7XG4gICAgICBhd2FpdCBwaWZ5KGhvb2spKC4uLnBhc3NlZEFyZ3MpO1xuICAgIH1cbiAgICBkb25lKCk7XG4gIH1dO1xufVxuXG4vKipcbiAqIFBhY2thZ2UgYW4gRWxlY3Ryb24gYXBwbGljYXRpb24gaW50byBhbiBwbGF0Zm9ybSBkZXBlbmRlbnQgZm9ybWF0LlxuICpcbiAqIEBwYXJhbSB7UGFja2FnZU9wdGlvbnN9IHByb3ZpZGVkT3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBQYWNrYWdlIG1ldGhvZFxuICogQHJldHVybiB7UHJvbWlzZX0gV2lsbCByZXNvbHZlIHdoZW4gdGhlIHBhY2thZ2UgcHJvY2VzcyBpcyBjb21wbGV0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocHJvdmlkZWRPcHRpb25zID0ge30pID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdCwgbm8tdW51c2VkLXZhcnNcbiAgbGV0IHsgZGlyLCBpbnRlcmFjdGl2ZSwgYXJjaCwgcGxhdGZvcm0gfSA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGRpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICBpbnRlcmFjdGl2ZTogZmFsc2UsXG4gICAgYXJjaDogaG9zdEFyY2goKSxcbiAgICBwbGF0Zm9ybTogcHJvY2Vzcy5wbGF0Zm9ybSxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcblxuICBjb25zdCBvcmEgPSBpbnRlcmFjdGl2ZSA/IHJlYWxPcmEgOiBmYWtlT3JhO1xuXG4gIGxldCBwcmVwYXJlU3Bpbm5lciA9IG9yYShgUHJlcGFyaW5nIHRvIFBhY2thZ2UgQXBwbGljYXRpb24gZm9yIGFyY2g6ICR7KGFyY2ggPT09ICdhbGwnID8gJ2lhMzInIDogYXJjaCkuY3lhbn1gKS5zdGFydCgpO1xuICBsZXQgcHJlcGFyZUNvdW50ZXIgPSAwO1xuXG4gIGRpciA9IGF3YWl0IHJlc29sdmVEaXIoZGlyKTtcbiAgaWYgKCFkaXIpIHtcbiAgICB0aHJvdyAnRmFpbGVkIHRvIGxvY2F0ZSBjb21waWxhYmxlIEVsZWN0cm9uIGFwcGxpY2F0aW9uJztcbiAgfVxuXG4gIGNvbnN0IHBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKGRpcik7XG5cbiAgaWYgKHBhdGguZGlybmFtZShyZXF1aXJlLnJlc29sdmUocGF0aC5yZXNvbHZlKGRpciwgcGFja2FnZUpTT04ubWFpbikpKSA9PT0gZGlyKSB7XG4gICAgY29uc29sZS5lcnJvcihgRW50cnkgcG9pbnQ6ICR7cGFja2FnZUpTT04ubWFpbn1gLnJlZCk7XG4gICAgdGhyb3cgJ1RoZSBlbnRyeSBwb2ludCB0byB5b3VyIGFwcGxpY2F0aW9uIChcInBhY2thZ2VKU09OLm1haW5cIikgbXVzdCBiZSBpbiBhIHN1YmZvbGRlciBub3QgaW4gdGhlIHRvcCBsZXZlbCBkaXJlY3RvcnknO1xuICB9XG5cbiAgY29uc3QgZm9yZ2VDb25maWcgPSBhd2FpdCBnZXRGb3JnZUNvbmZpZyhkaXIpO1xuICBjb25zdCBvdXREaXIgPSBwcm92aWRlZE9wdGlvbnMub3V0RGlyIHx8IGdldEN1cnJlbnRPdXREaXIoZGlyLCBmb3JnZUNvbmZpZyk7XG4gIGxldCBwYWNrYWdlclNwaW5uZXI7XG5cbiAgY29uc3QgcHJ1bmVFbmFibGVkID0gISgncHJ1bmUnIGluIGZvcmdlQ29uZmlnLmVsZWN0cm9uUGFja2FnZXJDb25maWcpIHx8IGZvcmdlQ29uZmlnLmVsZWN0cm9uUGFja2FnZXJDb25maWcucHJ1bmU7XG5cbiAgY29uc3QgcmVidWlsZEhvb2tGbiA9IGFzeW5jIChidWlsZFBhdGgsIGVsZWN0cm9uVmVyc2lvbiwgcFBsYXRmb3JtLCBwQXJjaCwgZG9uZSkgPT4ge1xuICAgIGF3YWl0IHJlYnVpbGRIb29rKGJ1aWxkUGF0aCwgZWxlY3Ryb25WZXJzaW9uLCBwUGxhdGZvcm0sIHBBcmNoLCBmb3JnZUNvbmZpZy5lbGVjdHJvblJlYnVpbGRDb25maWcpO1xuICAgIHBhY2thZ2VyU3Bpbm5lciA9IG9yYSgnUGFja2FnaW5nIEFwcGxpY2F0aW9uJykuc3RhcnQoKTtcbiAgICBkb25lKCk7XG4gIH07XG5cbiAgY29uc3QgYWZ0ZXJDb3B5SG9va3MgPSBbXG4gICAgYXN5bmMgKGJ1aWxkUGF0aCwgZWxlY3Ryb25WZXJzaW9uLCBwUGxhdGZvcm0sIHBBcmNoLCBkb25lKSA9PiB7XG4gICAgICBpZiAocGFja2FnZXJTcGlubmVyKSB7XG4gICAgICAgIHBhY2thZ2VyU3Bpbm5lci5zdWNjZWVkKCk7XG4gICAgICAgIHByZXBhcmVDb3VudGVyICs9IDE7XG4gICAgICAgIHByZXBhcmVTcGlubmVyID0gb3JhKGBQcmVwYXJpbmcgdG8gUGFja2FnZSBBcHBsaWNhdGlvbiBmb3IgYXJjaDogJHsocHJlcGFyZUNvdW50ZXIgPT09IDIgPyAnYXJtdjdsJyA6ICd4NjQnKS5jeWFufWApLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBmcy5yZW1vdmUocGF0aC5yZXNvbHZlKGJ1aWxkUGF0aCwgJ25vZGVfbW9kdWxlcy9lbGVjdHJvbi1jb21waWxlL3Rlc3QnKSk7XG4gICAgICBjb25zdCBiaW5zID0gYXdhaXQgcGlmeShnbG9iKShwYXRoLmpvaW4oYnVpbGRQYXRoLCAnKiovLmJpbi8qKi8qJykpO1xuICAgICAgZm9yIChjb25zdCBiaW4gb2YgYmlucykge1xuICAgICAgICBhd2FpdCBmcy5yZW1vdmUoYmluKTtcbiAgICAgIH1cbiAgICAgIGRvbmUoKTtcbiAgICB9LCBhc3luYyAoLi4uYXJncykgPT4ge1xuICAgICAgcHJlcGFyZVNwaW5uZXIuc3VjY2VlZCgpO1xuICAgICAgYXdhaXQgcGFja2FnZXJDb21waWxlSG9vayhkaXIsIC4uLmFyZ3MpO1xuICAgIH0sXG4gIF07XG5cbiAgaWYgKCFwcnVuZUVuYWJsZWQpIHtcbiAgICBhZnRlckNvcHlIb29rcy5wdXNoKHJlYnVpbGRIb29rRm4pO1xuICB9XG5cbiAgYWZ0ZXJDb3B5SG9va3MucHVzaChhc3luYyAoYnVpbGRQYXRoLCBlbGVjdHJvblZlcnNpb24sIHBQbGF0Zm9ybSwgcEFyY2gsIGRvbmUpID0+IHtcbiAgICBjb25zdCBjb3BpZWRQYWNrYWdlSlNPTiA9IGF3YWl0IHJlYWRQYWNrYWdlSlNPTihidWlsZFBhdGgpO1xuICAgIGlmIChjb3BpZWRQYWNrYWdlSlNPTi5jb25maWcgJiYgY29waWVkUGFja2FnZUpTT04uY29uZmlnLmZvcmdlKSB7XG4gICAgICBkZWxldGUgY29waWVkUGFja2FnZUpTT04uY29uZmlnLmZvcmdlO1xuICAgIH1cbiAgICBhd2FpdCBmcy53cml0ZUpzb24ocGF0aC5yZXNvbHZlKGJ1aWxkUGF0aCwgJ3BhY2thZ2UuanNvbicpLCBjb3BpZWRQYWNrYWdlSlNPTiwgeyBzcGFjZXM6IDIgfSk7XG4gICAgZG9uZSgpO1xuICB9KTtcblxuICBhZnRlckNvcHlIb29rcy5wdXNoKC4uLnJlc29sdmVIb29rcyhmb3JnZUNvbmZpZy5lbGVjdHJvblBhY2thZ2VyQ29uZmlnLmFmdGVyQ29weSwgZGlyKSk7XG5cbiAgY29uc3QgYWZ0ZXJQcnVuZUhvb2tzID0gW107XG5cbiAgaWYgKHBydW5lRW5hYmxlZCkge1xuICAgIGFmdGVyUHJ1bmVIb29rcy5wdXNoKHJlYnVpbGRIb29rRm4pO1xuICAgIGFmdGVyUHJ1bmVIb29rcy5wdXNoKC4uLnJlc29sdmVIb29rcyhmb3JnZUNvbmZpZy5lbGVjdHJvblBhY2thZ2VyQ29uZmlnLmFmdGVyUHJ1bmUsIGRpcikpO1xuICB9XG5cbiAgY29uc3QgcGFja2FnZU9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICBhc2FyOiBmYWxzZSxcbiAgICBvdmVyd3JpdGU6IHRydWUsXG4gIH0sIGZvcmdlQ29uZmlnLmVsZWN0cm9uUGFja2FnZXJDb25maWcsIHtcbiAgICBhZnRlckNvcHk6IHNlcXVlbnRpYWxIb29rcyhhZnRlckNvcHlIb29rcyksXG4gICAgYWZ0ZXJFeHRyYWN0OiBzZXF1ZW50aWFsSG9va3MocmVzb2x2ZUhvb2tzKGZvcmdlQ29uZmlnLmVsZWN0cm9uUGFja2FnZXJDb25maWcuYWZ0ZXJFeHRyYWN0LCBkaXIpKSxcbiAgICBhZnRlclBydW5lOiBzZXF1ZW50aWFsSG9va3MoYWZ0ZXJQcnVuZUhvb2tzKSxcbiAgICBkaXIsXG4gICAgYXJjaCxcbiAgICBwbGF0Zm9ybSxcbiAgICBvdXQ6IG91dERpcixcbiAgICBlbGVjdHJvblZlcnNpb246IGF3YWl0IGdldEVsZWN0cm9uVmVyc2lvbihkaXIpLFxuICB9KTtcbiAgcGFja2FnZU9wdHMucXVpZXQgPSB0cnVlO1xuICBpZiAocGFja2FnZU9wdHMuYWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdlbGVjdHJvblBhY2thZ2VyQ29uZmlnLmFsbCBpcyBub3Qgc3VwcG9ydGVkIGJ5IEVsZWN0cm9uIEZvcmdlLicpO1xuICB9XG4gIGlmICh0eXBlb2YgcGFja2FnZU9wdHMuYXNhciA9PT0gJ29iamVjdCcgJiYgcGFja2FnZU9wdHMuYXNhci51bnBhY2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2VsZWN0cm9uLWNvbXBpbGUgZG9lcyBub3Qgc3VwcG9ydCBhc2FyLnVucGFjayB5ZXQuICBQbGVhc2UgdXNlIGFzYXIudW5wYWNrRGlyJyk7XG4gIH1cblxuICBpZiAoIXBhY2thZ2VKU09OLnZlcnNpb24gJiYgIXBhY2thZ2VPcHRzLmFwcFZlcnNpb24pIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHdhcm4oaW50ZXJhY3RpdmUsIFwiUGxlYXNlIHNldCAndmVyc2lvbicgb3IgJ2NvbmZpZy5mb3JnZS5lbGVjdHJvblBhY2thZ2VyQ29uZmlnLmFwcFZlcnNpb24nIGluIHlvdXIgYXBwbGljYXRpb24ncyBwYWNrYWdlLmpzb24gc28gYXV0by11cGRhdGVzIHdvcmsgcHJvcGVybHlcIi55ZWxsb3cpO1xuICB9XG5cbiAgYXdhaXQgcnVuSG9vayhmb3JnZUNvbmZpZywgJ2dlbmVyYXRlQXNzZXRzJyk7XG4gIGF3YWl0IHJ1bkhvb2soZm9yZ2VDb25maWcsICdwcmVQYWNrYWdlJyk7XG5cbiAgZCgncGFja2FnaW5nIHdpdGggb3B0aW9ucycsIHBhY2thZ2VPcHRzKTtcblxuICBhd2FpdCBwYWNrYWdlcihwYWNrYWdlT3B0cyk7XG5cbiAgYXdhaXQgcnVuSG9vayhmb3JnZUNvbmZpZywgJ3Bvc3RQYWNrYWdlJyk7XG5cbiAgcGFja2FnZXJTcGlubmVyLnN1Y2NlZWQoKTtcbn07XG4iXX0=