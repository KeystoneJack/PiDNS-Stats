'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

require('colors');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _targets = require('electron-packager/targets');

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _getElectronVersion = require('../util/get-electron-version');

var _getElectronVersion2 = _interopRequireDefault(_getElectronVersion);

var _forgeConfig = require('../util/forge-config');

var _forgeConfig2 = _interopRequireDefault(_forgeConfig);

var _hook = require('../util/hook');

var _hook2 = _interopRequireDefault(_hook);

var _messages = require('../util/messages');

var _parseArchs = require('../util/parse-archs');

var _parseArchs2 = _interopRequireDefault(_parseArchs);

var _readPackageJson = require('../util/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

var _requireSearch = require('../util/require-search');

var _resolveDir = require('../util/resolve-dir');

var _resolveDir2 = _interopRequireDefault(_resolveDir);

var _outDir = require('../util/out-dir');

var _outDir2 = _interopRequireDefault(_outDir);

var _package = require('./package');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} MakeOptions
 * @property {string} [dir=process.cwd()] The path to the app from which distributables are generated
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {boolean} [skipPackage=false] Whether to skip the pre-make packaging step
 * @property {Array<string>} [overrideTargets] An array of make targets to override your forge config
 * @property {string} [arch=host architecture] The target architecture
 * @property {string} [platform=process.platform] The target platform.
 * @property {string} [outDir=`${dir}/out`] The path to the directory containing generated distributables
 */

/**
 * @typedef {Object} MakeResult
 * @property {Array<string>} artifacts An array of paths to artifacts generated for this make run
 * @property {Object} packageJSON The state of the package.json file when the make happened
 * @property {string} platform The platform this make run was for
 * @property {string} arch The arch this make run was for
 */

/**
 * Make distributables for an Electron application.
 *
 * @param {MakeOptions} providedOptions - Options for the make method
 * @return {Promise<Array<MakeResult>>} Will resolve when the make process is complete
 */
exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    var _Object$assign = (0, _assign2.default)({
      dir: process.cwd(),
      interactive: false,
      skipPackage: false,
      arch: (0, _targets.hostArch)(),
      platform: process.platform
    }, providedOptions);

    let dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        skipPackage = _Object$assign.skipPackage,
        overrideTargets = _Object$assign.overrideTargets,
        arch = _Object$assign.arch,
        platform = _Object$assign.platform;


    _oraHandler2.default.interactive = interactive;

    let forgeConfig;
    yield (0, _oraHandler2.default)('Resolving Forge Config', (0, _bluebird.coroutine)(function* () {
      dir = yield (0, _resolveDir2.default)(dir);
      if (!dir) {
        throw 'Failed to locate makeable Electron application';
      }

      forgeConfig = yield (0, _forgeConfig2.default)(dir);
    }));

    const outDir = providedOptions.outDir || (0, _outDir2.default)(dir, forgeConfig);

    const actualTargetPlatform = platform;
    platform = platform === 'mas' ? 'darwin' : platform;
    if (!['darwin', 'win32', 'linux', 'mas'].includes(actualTargetPlatform)) {
      throw new Error(`'${actualTargetPlatform}' is an invalid platform. Choices are 'darwin', 'mas', 'win32' or 'linux'`);
    }

    const makers = {};
    const targets = overrideTargets || forgeConfig.make_targets[platform];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(targets), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const target = _step.value;

        const maker = (0, _requireSearch.requireSearchRaw)(__dirname, [`../makers/${platform}/${target}.js`, `../makers/generic/${target}.js`, `electron-forge-maker-${target}`, target, _path2.default.resolve(dir, target), _path2.default.resolve(dir, 'node_modules', target)]);

        if (!maker) {
          throw new Error(['Could not find a build target with the name: ', `${target} for the platform: ${actualTargetPlatform}`].join(''));
        }

        if (!maker.isSupportedOnCurrentPlatform) {
          throw new Error([`Maker for target ${target} is incompatible with this version of `, 'electron-forge, please upgrade or contact the maintainer ', '(needs to implement \'isSupportedOnCurrentPlatform)\')'].join(''));
        }

        if (!(yield maker.isSupportedOnCurrentPlatform())) {
          throw new Error([`Cannot build for ${platform} target ${target}: the maker declared `, `that it cannot run on ${process.platform}`].join(''));
        }

        makers[target] = maker.default || maker;
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

    if (!skipPackage) {
      (0, _messages.info)(interactive, 'We need to package your application before we can make it'.green);
      yield (0, _package2.default)({
        dir,
        interactive,
        arch,
        outDir,
        platform: actualTargetPlatform
      });
    } else {
      (0, _messages.warn)(interactive, 'WARNING: Skipping the packaging step, this could result in an out of date build'.red);
    }

    (0, _messages.info)(interactive, 'Making for the following targets:', `${targets.join(', ')}`.cyan);

    const packageJSON = yield (0, _readPackageJson2.default)(dir);
    const appName = forgeConfig.electronPackagerConfig.name || packageJSON.productName || packageJSON.name;
    let outputs = [];

    yield (0, _hook2.default)(forgeConfig, 'preMake');

    const electronVersion = yield (0, _getElectronVersion2.default)(dir);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)((0, _parseArchs2.default)(platform, arch, electronVersion)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        const targetArch = _step2.value;

        const packageDir = _path2.default.resolve(outDir, `${appName}-${actualTargetPlatform}-${targetArch}`);
        if (!(yield _fsExtra2.default.pathExists(packageDir))) {
          throw new Error(`Couldn't find packaged app at: ${packageDir}`);
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(targets), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            const target = _step3.value;

            const maker = makers[target];

            // eslint-disable-next-line no-loop-func
            yield (0, _oraHandler2.default)(`Making for target: ${target.cyan} - On platform: ${actualTargetPlatform.cyan} - For arch: ${targetArch.cyan}`, (0, _bluebird.coroutine)(function* () {
              try {
                const artifacts = yield maker({
                  dir: packageDir,
                  appName,
                  targetPlatform: actualTargetPlatform,
                  targetArch,
                  forgeConfig,
                  packageJSON
                });

                outputs.push({
                  artifacts,
                  packageJSON,
                  platform: actualTargetPlatform,
                  arch: targetArch
                });
              } catch (err) {
                if (err) {
                  throw {
                    message: `An error occured while making for target: ${target}`,
                    stack: `${err.message}\n${err.stack}`
                  };
                } else {
                  throw new Error(`An unknown error occured while making for target: ${target}`);
                }
              }
            }));
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
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

    const result = yield (0, _hook2.default)(forgeConfig, 'postMake', outputs);
    // If the postMake hooks modifies the locations / names of the outputs it must return
    // the new locations so that the publish step knows where to look
    if (Array.isArray(result)) {
      outputs = result;
    }

    return outputs;
  });

  return function () {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9tYWtlLmpzIl0sIm5hbWVzIjpbInByb3ZpZGVkT3B0aW9ucyIsImRpciIsInByb2Nlc3MiLCJjd2QiLCJpbnRlcmFjdGl2ZSIsInNraXBQYWNrYWdlIiwiYXJjaCIsInBsYXRmb3JtIiwib3ZlcnJpZGVUYXJnZXRzIiwiYXN5bmNPcmEiLCJmb3JnZUNvbmZpZyIsIm91dERpciIsImFjdHVhbFRhcmdldFBsYXRmb3JtIiwiaW5jbHVkZXMiLCJFcnJvciIsIm1ha2VycyIsInRhcmdldHMiLCJtYWtlX3RhcmdldHMiLCJ0YXJnZXQiLCJtYWtlciIsIl9fZGlybmFtZSIsInBhdGgiLCJyZXNvbHZlIiwiam9pbiIsImlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0iLCJkZWZhdWx0IiwiZ3JlZW4iLCJyZWQiLCJjeWFuIiwicGFja2FnZUpTT04iLCJhcHBOYW1lIiwiZWxlY3Ryb25QYWNrYWdlckNvbmZpZyIsIm5hbWUiLCJwcm9kdWN0TmFtZSIsIm91dHB1dHMiLCJlbGVjdHJvblZlcnNpb24iLCJ0YXJnZXRBcmNoIiwicGFja2FnZURpciIsImZzIiwicGF0aEV4aXN0cyIsImFydGlmYWN0cyIsInRhcmdldFBsYXRmb3JtIiwicHVzaCIsImVyciIsIm1lc3NhZ2UiLCJzdGFjayIsInJlc3VsdCIsIkFycmF5IiwiaXNBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7OztBQVFBOzs7Ozs7O3NDQU1lLFdBQU9BLGtCQUFrQixFQUF6QixFQUFnQztBQUM3QztBQUQ2Qyx5QkFFNEIsc0JBQWM7QUFDckZDLFdBQUtDLFFBQVFDLEdBQVIsRUFEZ0Y7QUFFckZDLG1CQUFhLEtBRndFO0FBR3JGQyxt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QUFjRixNQUFkLENBQUosRUFBMkI7QUFDekJaLGdCQUFVWSxNQUFWO0FBQ0Q7O0FBRUQsV0FBT1osT0FBUDtBQUNELEciLCJmaWxlIjoiYXBpL21ha2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBob3N0QXJjaCB9IGZyb20gJ2VsZWN0cm9uLXBhY2thZ2VyL3RhcmdldHMnO1xuXG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5pbXBvcnQgZ2V0RWxlY3Ryb25WZXJzaW9uIGZyb20gJy4uL3V0aWwvZ2V0LWVsZWN0cm9uLXZlcnNpb24nO1xuaW1wb3J0IGdldEZvcmdlQ29uZmlnIGZyb20gJy4uL3V0aWwvZm9yZ2UtY29uZmlnJztcbmltcG9ydCBydW5Ib29rIGZyb20gJy4uL3V0aWwvaG9vayc7XG5pbXBvcnQgeyBpbmZvLCB3YXJuIH0gZnJvbSAnLi4vdXRpbC9tZXNzYWdlcyc7XG5pbXBvcnQgcGFyc2VBcmNocyBmcm9tICcuLi91dGlsL3BhcnNlLWFyY2hzJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi4vdXRpbC9yZWFkLXBhY2thZ2UtanNvbic7XG5pbXBvcnQgeyByZXF1aXJlU2VhcmNoUmF3IH0gZnJvbSAnLi4vdXRpbC9yZXF1aXJlLXNlYXJjaCc7XG5pbXBvcnQgcmVzb2x2ZURpciBmcm9tICcuLi91dGlsL3Jlc29sdmUtZGlyJztcbmltcG9ydCBnZXRDdXJyZW50T3V0RGlyIGZyb20gJy4uL3V0aWwvb3V0LWRpcic7XG5cbmltcG9ydCBwYWNrYWdlciBmcm9tICcuL3BhY2thZ2UnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1ha2VPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Rpcj1wcm9jZXNzLmN3ZCgpXSBUaGUgcGF0aCB0byB0aGUgYXBwIGZyb20gd2hpY2ggZGlzdHJpYnV0YWJsZXMgYXJlIGdlbmVyYXRlZFxuICogQHByb3BlcnR5IHtib29sZWFufSBbaW50ZXJhY3RpdmU9ZmFsc2VdIFdoZXRoZXIgdG8gdXNlIHNlbnNpYmxlIGRlZmF1bHRzIG9yIHByb21wdCB0aGUgdXNlciB2aXN1YWxseVxuICogQHByb3BlcnR5IHtib29sZWFufSBbc2tpcFBhY2thZ2U9ZmFsc2VdIFdoZXRoZXIgdG8gc2tpcCB0aGUgcHJlLW1ha2UgcGFja2FnaW5nIHN0ZXBcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gW292ZXJyaWRlVGFyZ2V0c10gQW4gYXJyYXkgb2YgbWFrZSB0YXJnZXRzIHRvIG92ZXJyaWRlIHlvdXIgZm9yZ2UgY29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2FyY2g9aG9zdCBhcmNoaXRlY3R1cmVdIFRoZSB0YXJnZXQgYXJjaGl0ZWN0dXJlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3BsYXRmb3JtPXByb2Nlc3MucGxhdGZvcm1dIFRoZSB0YXJnZXQgcGxhdGZvcm0uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW291dERpcj1gJHtkaXJ9L291dGBdIFRoZSBwYXRoIHRvIHRoZSBkaXJlY3RvcnkgY29udGFpbmluZyBnZW5lcmF0ZWQgZGlzdHJpYnV0YWJsZXNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1ha2VSZXN1bHRcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gYXJ0aWZhY3RzIEFuIGFycmF5IG9mIHBhdGhzIHRvIGFydGlmYWN0cyBnZW5lcmF0ZWQgZm9yIHRoaXMgbWFrZSBydW5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBwYWNrYWdlSlNPTiBUaGUgc3RhdGUgb2YgdGhlIHBhY2thZ2UuanNvbiBmaWxlIHdoZW4gdGhlIG1ha2UgaGFwcGVuZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gdGhpcyBtYWtlIHJ1biB3YXMgZm9yXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXJjaCBUaGUgYXJjaCB0aGlzIG1ha2UgcnVuIHdhcyBmb3JcbiAqL1xuXG4vKipcbiAqIE1ha2UgZGlzdHJpYnV0YWJsZXMgZm9yIGFuIEVsZWN0cm9uIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7TWFrZU9wdGlvbnN9IHByb3ZpZGVkT3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBtYWtlIG1ldGhvZFxuICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxNYWtlUmVzdWx0Pj59IFdpbGwgcmVzb2x2ZSB3aGVuIHRoZSBtYWtlIHByb2Nlc3MgaXMgY29tcGxldGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHByb3ZpZGVkT3B0aW9ucyA9IHt9KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3QsIG5vLXVudXNlZC12YXJzXG4gIGxldCB7IGRpciwgaW50ZXJhY3RpdmUsIHNraXBQYWNrYWdlLCBvdmVycmlkZVRhcmdldHMsIGFyY2gsIHBsYXRmb3JtIH0gPSBPYmplY3QuYXNzaWduKHtcbiAgICBkaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIHNraXBQYWNrYWdlOiBmYWxzZSxcbiAgICBhcmNoOiBob3N0QXJjaCgpLFxuICAgIHBsYXRmb3JtOiBwcm9jZXNzLnBsYXRmb3JtLFxuICB9LCBwcm92aWRlZE9wdGlvbnMpO1xuXG4gIGFzeW5jT3JhLmludGVyYWN0aXZlID0gaW50ZXJhY3RpdmU7XG5cbiAgbGV0IGZvcmdlQ29uZmlnO1xuICBhd2FpdCBhc3luY09yYSgnUmVzb2x2aW5nIEZvcmdlIENvbmZpZycsIGFzeW5jICgpID0+IHtcbiAgICBkaXIgPSBhd2FpdCByZXNvbHZlRGlyKGRpcik7XG4gICAgaWYgKCFkaXIpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gbG9jYXRlIG1ha2VhYmxlIEVsZWN0cm9uIGFwcGxpY2F0aW9uJztcbiAgICB9XG5cbiAgICBmb3JnZUNvbmZpZyA9IGF3YWl0IGdldEZvcmdlQ29uZmlnKGRpcik7XG4gIH0pO1xuXG4gIGNvbnN0IG91dERpciA9IHByb3ZpZGVkT3B0aW9ucy5vdXREaXIgfHwgZ2V0Q3VycmVudE91dERpcihkaXIsIGZvcmdlQ29uZmlnKTtcblxuICBjb25zdCBhY3R1YWxUYXJnZXRQbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICBwbGF0Zm9ybSA9IHBsYXRmb3JtID09PSAnbWFzJyA/ICdkYXJ3aW4nIDogcGxhdGZvcm07XG4gIGlmICghWydkYXJ3aW4nLCAnd2luMzInLCAnbGludXgnLCAnbWFzJ10uaW5jbHVkZXMoYWN0dWFsVGFyZ2V0UGxhdGZvcm0pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAnJHthY3R1YWxUYXJnZXRQbGF0Zm9ybX0nIGlzIGFuIGludmFsaWQgcGxhdGZvcm0uIENob2ljZXMgYXJlICdkYXJ3aW4nLCAnbWFzJywgJ3dpbjMyJyBvciAnbGludXgnYCk7XG4gIH1cblxuICBjb25zdCBtYWtlcnMgPSB7fTtcbiAgY29uc3QgdGFyZ2V0cyA9IG92ZXJyaWRlVGFyZ2V0cyB8fCBmb3JnZUNvbmZpZy5tYWtlX3RhcmdldHNbcGxhdGZvcm1dO1xuXG4gIGZvciAoY29uc3QgdGFyZ2V0IG9mIHRhcmdldHMpIHtcbiAgICBjb25zdCBtYWtlciA9IHJlcXVpcmVTZWFyY2hSYXcoX19kaXJuYW1lLCBbXG4gICAgICBgLi4vbWFrZXJzLyR7cGxhdGZvcm19LyR7dGFyZ2V0fS5qc2AsXG4gICAgICBgLi4vbWFrZXJzL2dlbmVyaWMvJHt0YXJnZXR9LmpzYCxcbiAgICAgIGBlbGVjdHJvbi1mb3JnZS1tYWtlci0ke3RhcmdldH1gLFxuICAgICAgdGFyZ2V0LFxuICAgICAgcGF0aC5yZXNvbHZlKGRpciwgdGFyZ2V0KSxcbiAgICAgIHBhdGgucmVzb2x2ZShkaXIsICdub2RlX21vZHVsZXMnLCB0YXJnZXQpLFxuICAgIF0pO1xuXG4gICAgaWYgKCFtYWtlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICAgICAgJ0NvdWxkIG5vdCBmaW5kIGEgYnVpbGQgdGFyZ2V0IHdpdGggdGhlIG5hbWU6ICcsXG4gICAgICAgIGAke3RhcmdldH0gZm9yIHRoZSBwbGF0Zm9ybTogJHthY3R1YWxUYXJnZXRQbGF0Zm9ybX1gLFxuICAgICAgXS5qb2luKCcnKSk7XG4gICAgfVxuXG4gICAgaWYgKCFtYWtlci5pc1N1cHBvcnRlZE9uQ3VycmVudFBsYXRmb3JtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICAgICBgTWFrZXIgZm9yIHRhcmdldCAke3RhcmdldH0gaXMgaW5jb21wYXRpYmxlIHdpdGggdGhpcyB2ZXJzaW9uIG9mIGAsXG4gICAgICAgICdlbGVjdHJvbi1mb3JnZSwgcGxlYXNlIHVwZ3JhZGUgb3IgY29udGFjdCB0aGUgbWFpbnRhaW5lciAnLFxuICAgICAgICAnKG5lZWRzIHRvIGltcGxlbWVudCBcXCdpc1N1cHBvcnRlZE9uQ3VycmVudFBsYXRmb3JtKVxcJyknLFxuICAgICAgXS5qb2luKCcnKSk7XG4gICAgfVxuXG4gICAgaWYgKCFhd2FpdCBtYWtlci5pc1N1cHBvcnRlZE9uQ3VycmVudFBsYXRmb3JtKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihbXG4gICAgICAgIGBDYW5ub3QgYnVpbGQgZm9yICR7cGxhdGZvcm19IHRhcmdldCAke3RhcmdldH06IHRoZSBtYWtlciBkZWNsYXJlZCBgLFxuICAgICAgICBgdGhhdCBpdCBjYW5ub3QgcnVuIG9uICR7cHJvY2Vzcy5wbGF0Zm9ybX1gLFxuICAgICAgXS5qb2luKCcnKSk7XG4gICAgfVxuXG4gICAgbWFrZXJzW3RhcmdldF0gPSBtYWtlci5kZWZhdWx0IHx8IG1ha2VyO1xuICB9XG5cbiAgaWYgKCFza2lwUGFja2FnZSkge1xuICAgIGluZm8oaW50ZXJhY3RpdmUsICdXZSBuZWVkIHRvIHBhY2thZ2UgeW91ciBhcHBsaWNhdGlvbiBiZWZvcmUgd2UgY2FuIG1ha2UgaXQnLmdyZWVuKTtcbiAgICBhd2FpdCBwYWNrYWdlcih7XG4gICAgICBkaXIsXG4gICAgICBpbnRlcmFjdGl2ZSxcbiAgICAgIGFyY2gsXG4gICAgICBvdXREaXIsXG4gICAgICBwbGF0Zm9ybTogYWN0dWFsVGFyZ2V0UGxhdGZvcm0sXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgd2FybihpbnRlcmFjdGl2ZSwgJ1dBUk5JTkc6IFNraXBwaW5nIHRoZSBwYWNrYWdpbmcgc3RlcCwgdGhpcyBjb3VsZCByZXN1bHQgaW4gYW4gb3V0IG9mIGRhdGUgYnVpbGQnLnJlZCk7XG4gIH1cblxuICBpbmZvKGludGVyYWN0aXZlLCAnTWFraW5nIGZvciB0aGUgZm9sbG93aW5nIHRhcmdldHM6JywgYCR7dGFyZ2V0cy5qb2luKCcsICcpfWAuY3lhbik7XG5cbiAgY29uc3QgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04oZGlyKTtcbiAgY29uc3QgYXBwTmFtZSA9IGZvcmdlQ29uZmlnLmVsZWN0cm9uUGFja2FnZXJDb25maWcubmFtZSB8fCBwYWNrYWdlSlNPTi5wcm9kdWN0TmFtZSB8fCBwYWNrYWdlSlNPTi5uYW1lO1xuICBsZXQgb3V0cHV0cyA9IFtdO1xuXG4gIGF3YWl0IHJ1bkhvb2soZm9yZ2VDb25maWcsICdwcmVNYWtlJyk7XG5cbiAgY29uc3QgZWxlY3Ryb25WZXJzaW9uID0gYXdhaXQgZ2V0RWxlY3Ryb25WZXJzaW9uKGRpcik7XG4gIGZvciAoY29uc3QgdGFyZ2V0QXJjaCBvZiBwYXJzZUFyY2hzKHBsYXRmb3JtLCBhcmNoLCBlbGVjdHJvblZlcnNpb24pKSB7XG4gICAgY29uc3QgcGFja2FnZURpciA9IHBhdGgucmVzb2x2ZShvdXREaXIsIGAke2FwcE5hbWV9LSR7YWN0dWFsVGFyZ2V0UGxhdGZvcm19LSR7dGFyZ2V0QXJjaH1gKTtcbiAgICBpZiAoIShhd2FpdCBmcy5wYXRoRXhpc3RzKHBhY2thZ2VEaXIpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZG4ndCBmaW5kIHBhY2thZ2VkIGFwcCBhdDogJHtwYWNrYWdlRGlyfWApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIHRhcmdldHMpIHtcbiAgICAgIGNvbnN0IG1ha2VyID0gbWFrZXJzW3RhcmdldF07XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb29wLWZ1bmNcbiAgICAgIGF3YWl0IGFzeW5jT3JhKGBNYWtpbmcgZm9yIHRhcmdldDogJHt0YXJnZXQuY3lhbn0gLSBPbiBwbGF0Zm9ybTogJHthY3R1YWxUYXJnZXRQbGF0Zm9ybS5jeWFufSAtIEZvciBhcmNoOiAke3RhcmdldEFyY2guY3lhbn1gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgYXJ0aWZhY3RzID0gYXdhaXQgbWFrZXIoe1xuICAgICAgICAgICAgZGlyOiBwYWNrYWdlRGlyLFxuICAgICAgICAgICAgYXBwTmFtZSxcbiAgICAgICAgICAgIHRhcmdldFBsYXRmb3JtOiBhY3R1YWxUYXJnZXRQbGF0Zm9ybSxcbiAgICAgICAgICAgIHRhcmdldEFyY2gsXG4gICAgICAgICAgICBmb3JnZUNvbmZpZyxcbiAgICAgICAgICAgIHBhY2thZ2VKU09OLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgb3V0cHV0cy5wdXNoKHtcbiAgICAgICAgICAgIGFydGlmYWN0cyxcbiAgICAgICAgICAgIHBhY2thZ2VKU09OLFxuICAgICAgICAgICAgcGxhdGZvcm06IGFjdHVhbFRhcmdldFBsYXRmb3JtLFxuICAgICAgICAgICAgYXJjaDogdGFyZ2V0QXJjaCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSBtYWtpbmcgZm9yIHRhcmdldDogJHt0YXJnZXR9YCxcbiAgICAgICAgICAgICAgc3RhY2s6IGAke2Vyci5tZXNzYWdlfVxcbiR7ZXJyLnN0YWNrfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFuIHVua25vd24gZXJyb3Igb2NjdXJlZCB3aGlsZSBtYWtpbmcgZm9yIHRhcmdldDogJHt0YXJnZXR9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBydW5Ib29rKGZvcmdlQ29uZmlnLCAncG9zdE1ha2UnLCBvdXRwdXRzKTtcbiAgLy8gSWYgdGhlIHBvc3RNYWtlIGhvb2tzIG1vZGlmaWVzIHRoZSBsb2NhdGlvbnMgLyBuYW1lcyBvZiB0aGUgb3V0cHV0cyBpdCBtdXN0IHJldHVyblxuICAvLyB0aGUgbmV3IGxvY2F0aW9ucyBzbyB0aGF0IHRoZSBwdWJsaXNoIHN0ZXAga25vd3Mgd2hlcmUgdG8gbG9va1xuICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgb3V0cHV0cyA9IHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXRzO1xufTtcbiJdfQ==