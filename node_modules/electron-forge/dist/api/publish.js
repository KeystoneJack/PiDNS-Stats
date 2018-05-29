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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _forgeConfig = require('../util/forge-config');

var _forgeConfig2 = _interopRequireDefault(_forgeConfig);

var _readPackageJson = require('../util/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

var _requireSearch = require('../util/require-search');

var _requireSearch2 = _interopRequireDefault(_requireSearch);

var _resolveDir = require('../util/resolve-dir');

var _resolveDir2 = _interopRequireDefault(_resolveDir);

var _publishState = require('../util/publish-state');

var _publishState2 = _interopRequireDefault(_publishState);

var _outDir = require('../util/out-dir');

var _outDir2 = _interopRequireDefault(_outDir);

var _make = require('./make');

var _make2 = _interopRequireDefault(_make);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:publish');

/**
 * @typedef {Object} PublishOptions
 * @property {string} [dir=process.cwd()] The path to the app to be published
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {string} [authToken] An authentication token to use when publishing
 * @property {string} [tag=packageJSON.version] The string to tag this release with
 * @property {Array<string>} [publishTargets=[github]] The publish targets
 * @property {MakeOptions} [makeOptions] Options object to passed through to make()
 * @property {string} [outDir=`${dir}/out`] The path to the directory containing generated distributables
 * @property {boolean} [dryRun=false] Whether to generate dry run meta data but not actually publish
 * @property {boolean} [dryRunResume=false] Whether or not to attempt to resume a previously saved `dryRun` and publish
 * @property {MakeResult} [makeResults=null] Provide results from make so that the publish step doesn't run make itself
 */

/**
 * Publish an Electron application into the given target service.
 *
 * @param {PublishOptions} providedOptions - Options for the Publish method
 * @return {Promise} Will resolve when the publish process is complete
 */
const publish = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    var _Object$assign = (0, _assign2.default)({
      dir: process.cwd(),
      interactive: false,
      tag: null,
      makeOptions: {},
      publishTargets: null,
      dryRun: false,
      dryRunResume: false,
      makeResults: null
    }, providedOptions);

    let dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        authToken = _Object$assign.authToken,
        tag = _Object$assign.tag,
        publishTargets = _Object$assign.publishTargets,
        makeOptions = _Object$assign.makeOptions,
        dryRun = _Object$assign.dryRun,
        dryRunResume = _Object$assign.dryRunResume,
        makeResults = _Object$assign.makeResults;

    _oraHandler2.default.interactive = interactive;

    if (dryRun && dryRunResume) {
      throw 'Can\'t dry run and resume a dry run at the same time';
    }
    if (dryRunResume && makeResults) {
      throw 'Can\'t resume a dry run and use the provided makeResults at the same time';
    }

    let packageJSON = yield (0, _readPackageJson2.default)(dir);

    const forgeConfig = yield (0, _forgeConfig2.default)(dir);
    const outDir = providedOptions.outDir || (0, _outDir2.default)(dir, forgeConfig);
    const dryRunDir = _path2.default.resolve(outDir, 'publish-dry-run');

    if (dryRunResume) {
      d('attempting to resume from dry run');
      const publishes = yield _publishState2.default.loadFromDirectory(dryRunDir, dir);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(publishes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const publishStates = _step.value;

          d('publishing for given state set');
          yield publish({
            dir,
            interactive,
            authToken,
            tag,
            publishTargets,
            makeOptions,
            dryRun: false,
            dryRunResume: false,
            makeResults: publishStates.map(function ({ state }) {
              return state;
            })
          });
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

      return;
    } else if (!makeResults) {
      d('triggering make');
      makeResults = yield (0, _make2.default)((0, _assign2.default)({
        dir,
        interactive
      }, makeOptions));
    } else {
      // Restore values from dry run
      d('restoring publish settings from dry run');

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(makeResults), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const makeResult = _step2.value;

          packageJSON = makeResult.packageJSON;
          makeOptions.platform = makeResult.platform;
          makeOptions.arch = makeResult.arch;

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _getIterator3.default)(makeResult.artifacts), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              const makePath = _step3.value;

              if (!(yield _fsExtra2.default.exists(makePath))) {
                throw `Attempted to resume a dry run but an artifact (${makePath}) could not be found`;
              }
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
    }

    if (dryRun) {
      d('saving results of make in dry run state', makeResults);
      yield _fsExtra2.default.remove(dryRunDir);
      yield _publishState2.default.saveToDirectory(dryRunDir, makeResults, dir);
      return;
    }

    dir = yield (0, _resolveDir2.default)(dir);
    if (!dir) {
      throw 'Failed to locate publishable Electron application';
    }

    const artifacts = makeResults.reduce(function (accum, makeResult) {
      accum.push(...makeResult.artifacts);
      return accum;
    }, []);

    if (publishTargets === null) {
      publishTargets = forgeConfig.publish_targets[makeOptions.platform || process.platform];
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = (0, _getIterator3.default)(publishTargets), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        const publishTarget = _step4.value;

        let publisher;
        yield (0, _oraHandler2.default)(`Resolving publish target: ${`${publishTarget}`.cyan}`, (0, _bluebird.coroutine)(function* () {
          // eslint-disable-line no-loop-func
          publisher = (0, _requireSearch2.default)(__dirname, [`../publishers/${publishTarget}.js`, `electron-forge-publisher-${publishTarget}`, publishTarget, _path2.default.resolve(dir, publishTarget), _path2.default.resolve(dir, 'node_modules', publishTarget)]);
          if (!publisher) {
            throw `Could not find a publish target with the name: ${publishTarget}`;
          }
        }));

        yield publisher({
          dir,
          artifacts,
          packageJSON,
          forgeConfig,
          authToken,
          tag,
          platform: makeOptions.platform || process.platform,
          arch: makeOptions.arch || process.arch
        });
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  });

  return function publish() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = publish;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbImQiLCJwdWJsaXNoIiwicHJvdmlkZWRPcHRpb25zIiwiZGlyIiwicHJvY2VzcyIsImN3ZCIsImludGVyYWN0aXZlIiwidGFnIiwibWFrZU9wdGlvbnMiLCJwdWJsaXNoVGFyZ2V0cyIsImRyeVJ1biIsImRyeVJ1blJlc3VtZSIsIm1ha2VSZXN1bHRzIiwiYXV0aFRva2VuIiwiYXN5bmNPcmEiLCJwYWNrYWdlSlNPTiIsImZvcmdlQ29uZmlnIiwib3V0RGlyIiwiZHJ5UnVuRGlyIiwicGF0aCIsInJlc29sdmUiLCJwdWJsaXNoZXMiLCJQdWJsaXNoU3RhdGUiLCJsb2FkRnJvbURpcmVjdG9yeSIsInB1Ymxpc2hTdGF0ZXMiLCJtYXAiLCJzdGF0ZSIsIm1ha2VSZXN1bHQiLCJwbGF0Zm9ybSIsImFyY2giLCJhcnRpZmFjdHMiLCJtYWtlUGF0aCIsImZzIiwiZXhpc3RzIiwicmVtb3ZlIiwic2F2ZVRvRGlyZWN0b3J5IiwicmVkdWNlIiwiYWNjdW0iLCJwdXNoIiwicHVibGlzaF90YXJnZXRzIiwicHVibGlzaFRhcmdldCIsInB1Ymxpc2hlciIsImN5YW4iLCJfX2Rpcm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLHdCQUFOLENBQVY7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7OztBQU1BLE1BQU1DO0FBQUEsc0NBQVUsV0FBT0Msa0JBQWtCLEVBQXpCLEVBQWdDO0FBQzlDO0FBRDhDLHlCQUU2RCxzQkFBYztBQUN2SEMsV0FBS0MsUUFBUUMsR0FBUixFQURrSDtBQUV2SEMsbUJBQWEsS0FGMEc7QUFHdkhDLFdBQUssSUFIa0g7QUFJdkhDLG1CQUFhLEVBSjBHO0FBS3ZIQyxzQkFB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LGFBQWxCLENBSm1DLEVBS25DckIsZUFBS0MsT0FBTCxDQUFhakIsR0FBYixFQUFrQixjQUFsQixFQUFrQ3FDLGFBQWxDLENBTG1DLENBQXpCLENBQVo7QUFPQSxjQUFJLENBQUNDLFNBQUwsRUFBZ0I7QUFDZCxrQkFBTyxrREFBaURELGFBQWMsRUFBdEU7QUFDRDtBQUNGLFNBWEssRUFBTjs7QUFhQSxjQUFNQyxVQUFVO0FBQ2R0QyxhQURjO0FBRWQyQixtQkFGYztBQUdkZixxQkFIYztBQUlkQyxxQkFKYztBQUtkSCxtQkFMYztBQU1kTixhQU5jO0FBT2RxQixvQkFBVXBCLFlBQVlvQixRQUFaLElBQXdCeEIsUUFBUXdCLFFBUDVCO0FBUWRDLGdCQUFNckIsWUFBWXFCLElBQVosSUFBb0J6QixRQUFReUI7QUFScEIsU0FBVixDQUFOO0FBVUQ7QUFsSDZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtSC9DLEdBbkhLOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU47O2tCQXFIZTVCLE8iLCJmaWxlIjoiYXBpL3B1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5pbXBvcnQgZ2V0Rm9yZ2VDb25maWcgZnJvbSAnLi4vdXRpbC9mb3JnZS1jb25maWcnO1xuaW1wb3J0IHJlYWRQYWNrYWdlSlNPTiBmcm9tICcuLi91dGlsL3JlYWQtcGFja2FnZS1qc29uJztcbmltcG9ydCByZXF1aXJlU2VhcmNoIGZyb20gJy4uL3V0aWwvcmVxdWlyZS1zZWFyY2gnO1xuaW1wb3J0IHJlc29sdmVEaXIgZnJvbSAnLi4vdXRpbC9yZXNvbHZlLWRpcic7XG5pbXBvcnQgUHVibGlzaFN0YXRlIGZyb20gJy4uL3V0aWwvcHVibGlzaC1zdGF0ZSc7XG5pbXBvcnQgZ2V0Q3VycmVudE91dERpciBmcm9tICcuLi91dGlsL291dC1kaXInO1xuXG5pbXBvcnQgbWFrZSBmcm9tICcuL21ha2UnO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOnB1Ymxpc2gnKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQdWJsaXNoT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkaXI9cHJvY2Vzcy5jd2QoKV0gVGhlIHBhdGggdG8gdGhlIGFwcCB0byBiZSBwdWJsaXNoZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2ludGVyYWN0aXZlPWZhbHNlXSBXaGV0aGVyIHRvIHVzZSBzZW5zaWJsZSBkZWZhdWx0cyBvciBwcm9tcHQgdGhlIHVzZXIgdmlzdWFsbHlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbYXV0aFRva2VuXSBBbiBhdXRoZW50aWNhdGlvbiB0b2tlbiB0byB1c2Ugd2hlbiBwdWJsaXNoaW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3RhZz1wYWNrYWdlSlNPTi52ZXJzaW9uXSBUaGUgc3RyaW5nIHRvIHRhZyB0aGlzIHJlbGVhc2Ugd2l0aFxuICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmc+fSBbcHVibGlzaFRhcmdldHM9W2dpdGh1Yl1dIFRoZSBwdWJsaXNoIHRhcmdldHNcbiAqIEBwcm9wZXJ0eSB7TWFrZU9wdGlvbnN9IFttYWtlT3B0aW9uc10gT3B0aW9ucyBvYmplY3QgdG8gcGFzc2VkIHRocm91Z2ggdG8gbWFrZSgpXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW291dERpcj1gJHtkaXJ9L291dGBdIFRoZSBwYXRoIHRvIHRoZSBkaXJlY3RvcnkgY29udGFpbmluZyBnZW5lcmF0ZWQgZGlzdHJpYnV0YWJsZXNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2RyeVJ1bj1mYWxzZV0gV2hldGhlciB0byBnZW5lcmF0ZSBkcnkgcnVuIG1ldGEgZGF0YSBidXQgbm90IGFjdHVhbGx5IHB1Ymxpc2hcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2RyeVJ1blJlc3VtZT1mYWxzZV0gV2hldGhlciBvciBub3QgdG8gYXR0ZW1wdCB0byByZXN1bWUgYSBwcmV2aW91c2x5IHNhdmVkIGBkcnlSdW5gIGFuZCBwdWJsaXNoXG4gKiBAcHJvcGVydHkge01ha2VSZXN1bHR9IFttYWtlUmVzdWx0cz1udWxsXSBQcm92aWRlIHJlc3VsdHMgZnJvbSBtYWtlIHNvIHRoYXQgdGhlIHB1Ymxpc2ggc3RlcCBkb2Vzbid0IHJ1biBtYWtlIGl0c2VsZlxuICovXG5cbi8qKlxuICogUHVibGlzaCBhbiBFbGVjdHJvbiBhcHBsaWNhdGlvbiBpbnRvIHRoZSBnaXZlbiB0YXJnZXQgc2VydmljZS5cbiAqXG4gKiBAcGFyYW0ge1B1Ymxpc2hPcHRpb25zfSBwcm92aWRlZE9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgUHVibGlzaCBtZXRob2RcbiAqIEByZXR1cm4ge1Byb21pc2V9IFdpbGwgcmVzb2x2ZSB3aGVuIHRoZSBwdWJsaXNoIHByb2Nlc3MgaXMgY29tcGxldGVcbiAqL1xuY29uc3QgcHVibGlzaCA9IGFzeW5jIChwcm92aWRlZE9wdGlvbnMgPSB7fSkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0LCBuby11bnVzZWQtdmFyc1xuICBsZXQgeyBkaXIsIGludGVyYWN0aXZlLCBhdXRoVG9rZW4sIHRhZywgcHVibGlzaFRhcmdldHMsIG1ha2VPcHRpb25zLCBkcnlSdW4sIGRyeVJ1blJlc3VtZSwgbWFrZVJlc3VsdHMgfSA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGRpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICBpbnRlcmFjdGl2ZTogZmFsc2UsXG4gICAgdGFnOiBudWxsLFxuICAgIG1ha2VPcHRpb25zOiB7fSxcbiAgICBwdWJsaXNoVGFyZ2V0czogbnVsbCxcbiAgICBkcnlSdW46IGZhbHNlLFxuICAgIGRyeVJ1blJlc3VtZTogZmFsc2UsXG4gICAgbWFrZVJlc3VsdHM6IG51bGwsXG4gIH0sIHByb3ZpZGVkT3B0aW9ucyk7XG4gIGFzeW5jT3JhLmludGVyYWN0aXZlID0gaW50ZXJhY3RpdmU7XG5cbiAgaWYgKGRyeVJ1biAmJiBkcnlSdW5SZXN1bWUpIHtcbiAgICB0aHJvdyAnQ2FuXFwndCBkcnkgcnVuIGFuZCByZXN1bWUgYSBkcnkgcnVuIGF0IHRoZSBzYW1lIHRpbWUnO1xuICB9XG4gIGlmIChkcnlSdW5SZXN1bWUgJiYgbWFrZVJlc3VsdHMpIHtcbiAgICB0aHJvdyAnQ2FuXFwndCByZXN1bWUgYSBkcnkgcnVuIGFuZCB1c2UgdGhlIHByb3ZpZGVkIG1ha2VSZXN1bHRzIGF0IHRoZSBzYW1lIHRpbWUnO1xuICB9XG5cbiAgbGV0IHBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKGRpcik7XG5cbiAgY29uc3QgZm9yZ2VDb25maWcgPSBhd2FpdCBnZXRGb3JnZUNvbmZpZyhkaXIpO1xuICBjb25zdCBvdXREaXIgPSBwcm92aWRlZE9wdGlvbnMub3V0RGlyIHx8IGdldEN1cnJlbnRPdXREaXIoZGlyLCBmb3JnZUNvbmZpZyk7XG4gIGNvbnN0IGRyeVJ1bkRpciA9IHBhdGgucmVzb2x2ZShvdXREaXIsICdwdWJsaXNoLWRyeS1ydW4nKTtcblxuICBpZiAoZHJ5UnVuUmVzdW1lKSB7XG4gICAgZCgnYXR0ZW1wdGluZyB0byByZXN1bWUgZnJvbSBkcnkgcnVuJyk7XG4gICAgY29uc3QgcHVibGlzaGVzID0gYXdhaXQgUHVibGlzaFN0YXRlLmxvYWRGcm9tRGlyZWN0b3J5KGRyeVJ1bkRpciwgZGlyKTtcbiAgICBmb3IgKGNvbnN0IHB1Ymxpc2hTdGF0ZXMgb2YgcHVibGlzaGVzKSB7XG4gICAgICBkKCdwdWJsaXNoaW5nIGZvciBnaXZlbiBzdGF0ZSBzZXQnKTtcbiAgICAgIGF3YWl0IHB1Ymxpc2goe1xuICAgICAgICBkaXIsXG4gICAgICAgIGludGVyYWN0aXZlLFxuICAgICAgICBhdXRoVG9rZW4sXG4gICAgICAgIHRhZyxcbiAgICAgICAgcHVibGlzaFRhcmdldHMsXG4gICAgICAgIG1ha2VPcHRpb25zLFxuICAgICAgICBkcnlSdW46IGZhbHNlLFxuICAgICAgICBkcnlSdW5SZXN1bWU6IGZhbHNlLFxuICAgICAgICBtYWtlUmVzdWx0czogcHVibGlzaFN0YXRlcy5tYXAoKHsgc3RhdGUgfSkgPT4gc3RhdGUpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghbWFrZVJlc3VsdHMpIHtcbiAgICBkKCd0cmlnZ2VyaW5nIG1ha2UnKTtcbiAgICBtYWtlUmVzdWx0cyA9IGF3YWl0IG1ha2UoT2JqZWN0LmFzc2lnbih7XG4gICAgICBkaXIsXG4gICAgICBpbnRlcmFjdGl2ZSxcbiAgICB9LCBtYWtlT3B0aW9ucykpO1xuICB9IGVsc2Uge1xuICAgIC8vIFJlc3RvcmUgdmFsdWVzIGZyb20gZHJ5IHJ1blxuICAgIGQoJ3Jlc3RvcmluZyBwdWJsaXNoIHNldHRpbmdzIGZyb20gZHJ5IHJ1bicpO1xuXG4gICAgZm9yIChjb25zdCBtYWtlUmVzdWx0IG9mIG1ha2VSZXN1bHRzKSB7XG4gICAgICBwYWNrYWdlSlNPTiA9IG1ha2VSZXN1bHQucGFja2FnZUpTT047XG4gICAgICBtYWtlT3B0aW9ucy5wbGF0Zm9ybSA9IG1ha2VSZXN1bHQucGxhdGZvcm07XG4gICAgICBtYWtlT3B0aW9ucy5hcmNoID0gbWFrZVJlc3VsdC5hcmNoO1xuXG4gICAgICBmb3IgKGNvbnN0IG1ha2VQYXRoIG9mIG1ha2VSZXN1bHQuYXJ0aWZhY3RzKSB7XG4gICAgICAgIGlmICghYXdhaXQgZnMuZXhpc3RzKG1ha2VQYXRoKSkge1xuICAgICAgICAgIHRocm93IGBBdHRlbXB0ZWQgdG8gcmVzdW1lIGEgZHJ5IHJ1biBidXQgYW4gYXJ0aWZhY3QgKCR7bWFrZVBhdGh9KSBjb3VsZCBub3QgYmUgZm91bmRgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGRyeVJ1bikge1xuICAgIGQoJ3NhdmluZyByZXN1bHRzIG9mIG1ha2UgaW4gZHJ5IHJ1biBzdGF0ZScsIG1ha2VSZXN1bHRzKTtcbiAgICBhd2FpdCBmcy5yZW1vdmUoZHJ5UnVuRGlyKTtcbiAgICBhd2FpdCBQdWJsaXNoU3RhdGUuc2F2ZVRvRGlyZWN0b3J5KGRyeVJ1bkRpciwgbWFrZVJlc3VsdHMsIGRpcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGlyID0gYXdhaXQgcmVzb2x2ZURpcihkaXIpO1xuICBpZiAoIWRpcikge1xuICAgIHRocm93ICdGYWlsZWQgdG8gbG9jYXRlIHB1Ymxpc2hhYmxlIEVsZWN0cm9uIGFwcGxpY2F0aW9uJztcbiAgfVxuXG4gIGNvbnN0IGFydGlmYWN0cyA9IG1ha2VSZXN1bHRzLnJlZHVjZSgoYWNjdW0sIG1ha2VSZXN1bHQpID0+IHtcbiAgICBhY2N1bS5wdXNoKC4uLm1ha2VSZXN1bHQuYXJ0aWZhY3RzKTtcbiAgICByZXR1cm4gYWNjdW07XG4gIH0sIFtdKTtcblxuICBpZiAocHVibGlzaFRhcmdldHMgPT09IG51bGwpIHtcbiAgICBwdWJsaXNoVGFyZ2V0cyA9IGZvcmdlQ29uZmlnLnB1Ymxpc2hfdGFyZ2V0c1ttYWtlT3B0aW9ucy5wbGF0Zm9ybSB8fCBwcm9jZXNzLnBsYXRmb3JtXTtcbiAgfVxuXG4gIGZvciAoY29uc3QgcHVibGlzaFRhcmdldCBvZiBwdWJsaXNoVGFyZ2V0cykge1xuICAgIGxldCBwdWJsaXNoZXI7XG4gICAgYXdhaXQgYXN5bmNPcmEoYFJlc29sdmluZyBwdWJsaXNoIHRhcmdldDogJHtgJHtwdWJsaXNoVGFyZ2V0fWAuY3lhbn1gLCBhc3luYyAoKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9vcC1mdW5jXG4gICAgICBwdWJsaXNoZXIgPSByZXF1aXJlU2VhcmNoKF9fZGlybmFtZSwgW1xuICAgICAgICBgLi4vcHVibGlzaGVycy8ke3B1Ymxpc2hUYXJnZXR9LmpzYCxcbiAgICAgICAgYGVsZWN0cm9uLWZvcmdlLXB1Ymxpc2hlci0ke3B1Ymxpc2hUYXJnZXR9YCxcbiAgICAgICAgcHVibGlzaFRhcmdldCxcbiAgICAgICAgcGF0aC5yZXNvbHZlKGRpciwgcHVibGlzaFRhcmdldCksXG4gICAgICAgIHBhdGgucmVzb2x2ZShkaXIsICdub2RlX21vZHVsZXMnLCBwdWJsaXNoVGFyZ2V0KSxcbiAgICAgIF0pO1xuICAgICAgaWYgKCFwdWJsaXNoZXIpIHtcbiAgICAgICAgdGhyb3cgYENvdWxkIG5vdCBmaW5kIGEgcHVibGlzaCB0YXJnZXQgd2l0aCB0aGUgbmFtZTogJHtwdWJsaXNoVGFyZ2V0fWA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBwdWJsaXNoZXIoe1xuICAgICAgZGlyLFxuICAgICAgYXJ0aWZhY3RzLFxuICAgICAgcGFja2FnZUpTT04sXG4gICAgICBmb3JnZUNvbmZpZyxcbiAgICAgIGF1dGhUb2tlbixcbiAgICAgIHRhZyxcbiAgICAgIHBsYXRmb3JtOiBtYWtlT3B0aW9ucy5wbGF0Zm9ybSB8fCBwcm9jZXNzLnBsYXRmb3JtLFxuICAgICAgYXJjaDogbWFrZU9wdGlvbnMuYXJjaCB8fCBwcm9jZXNzLmFyY2gsXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHB1Ymxpc2g7XG4iXX0=