'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

require('colors');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _nugget = require('nugget');

var _nugget2 = _interopRequireDefault(_nugget);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _messages = require('../util/messages');

var _dmg = require('../installers/darwin/dmg');

var _dmg2 = _interopRequireDefault(_dmg);

var _zip = require('../installers/darwin/zip');

var _zip2 = _interopRequireDefault(_zip);

var _deb = require('../installers/linux/deb');

var _deb2 = _interopRequireDefault(_deb);

var _rpm = require('../installers/linux/rpm');

var _rpm2 = _interopRequireDefault(_rpm);

var _exe = require('../installers/win32/exe');

var _exe2 = _interopRequireDefault(_exe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:install');

const GITHUB_API = 'https://api.github.com';

/**
 * @typedef {Object} InstallOptions
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {boolean} [prerelease=false] Whether to install prerelease versions
 * @property {string} repo The GitHub repository to install from, in the format owner/name
 * @property {function} chooseAsset A function that must return the asset to use/install from a provided array of compatible GitHub assets
 */

/**
 * Install an Electron application from GitHub. If you leave interactive as `false`, you MUST provide a `chooseAsset` function.
 *
 * @param {InstallOptions} providedOptions - Options for the install method
 * @return {Promise} Will resolve when the install process is complete
 */

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    var _Object$assign = (0, _assign2.default)({
      interactive: false,
      prerelease: false
    }, providedOptions);

    let interactive = _Object$assign.interactive,
        prerelease = _Object$assign.prerelease,
        repo = _Object$assign.repo,
        chooseAsset = _Object$assign.chooseAsset;

    _oraHandler2.default.interactive = interactive;

    let latestRelease;
    let possibleAssets = [];

    yield (0, _oraHandler2.default)('Searching for Application', (() => {
      var _ref2 = (0, _bluebird.coroutine)(function* (searchSpinner) {
        if (!repo || repo.indexOf('/') === -1) {
          throw 'Invalid repository name, must be in the format owner/name';
        }

        d('searching for repo:', repo);
        let releases;
        try {
          releases = yield (yield (0, _nodeFetch2.default)(`${GITHUB_API}/repos/${repo}/releases`)).json();
        } catch (err) {
          // Ignore error
        }

        if (!releases || releases.message === 'Not Found' || !Array.isArray(releases)) {
          throw `Failed to find releases for repository "${repo}".  Please check the name and try again.`;
        }

        releases = releases.filter(function (release) {
          return !release.prerelease || prerelease;
        });

        const sortedReleases = releases.sort(function (releaseA, releaseB) {
          let tagA = releaseA.tag_name;
          if (tagA.substr(0, 1) === 'v') tagA = tagA.substr(1);
          let tagB = releaseB.tag_name;
          if (tagB.substr(0, 1) === 'v') tagB = tagB.substr(1);
          return _semver2.default.gt(tagB, tagA) ? 1 : -1;
        });
        latestRelease = sortedReleases[0];

        searchSpinner.text = 'Searching for Releases'; // eslint-disable-line

        const assets = latestRelease.assets;
        if (!assets || !Array.isArray(assets)) {
          throw 'Could not find any assets for the latest release';
        }

        const installTargets = {
          win32: [/\.exe$/],
          darwin: [/OSX.*\.zip$/, /darwin.*\.zip$/, /macOS.*\.zip$/, /mac.*\.zip$/, /\.dmg$/],
          linux: [/\.rpm$/, /\.deb$/]
        };

        possibleAssets = assets.filter(function (asset) {
          const targetSuffixes = installTargets[process.platform];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(targetSuffixes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              const suffix = _step.value;

              if (suffix.test(asset.name)) return true;
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

          return false;
        });

        if (possibleAssets.length === 0) {
          throw `Failed to find any installable assets for target platform: ${`${process.platform}`.cyan}`;
        }
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })());

    (0, _messages.info)(interactive, `Found latest release${prerelease ? ' (including prereleases)' : ''}: ${latestRelease.tag_name.cyan}`);

    let targetAsset = possibleAssets[0];
    if (possibleAssets.length > 1) {
      if (chooseAsset) {
        targetAsset = yield _promise2.default.resolve(chooseAsset(possibleAssets));
      } else if (interactive) {
        const choices = [];
        possibleAssets.forEach(function (asset) {
          choices.push({ name: asset.name, value: asset.id });
        });

        var _ref3 = yield _inquirer2.default.createPromptModule()({
          type: 'list',
          name: 'assetID',
          message: 'Multiple potential assets found, please choose one from the list below:'.cyan,
          choices
        });

        const assetID = _ref3.assetID;


        targetAsset = possibleAssets.find(function (asset) {
          return asset.id === assetID;
        });
      } else {
        throw 'expected a chooseAsset function to be provided but it was not';
      }
    }

    const tmpdir = _path2.default.resolve(_os2.default.tmpdir(), 'forge-install');
    const pathSafeRepo = repo.replace(/[/\\]/g, '-');
    const filename = `${pathSafeRepo}-${latestRelease.tag_name}-${targetAsset.name}`;

    const fullFilePath = _path2.default.resolve(tmpdir, filename);
    if (!(yield _fsExtra2.default.pathExists(fullFilePath)) || (yield _fsExtra2.default.stat(fullFilePath)).size !== targetAsset.size) {
      yield _fsExtra2.default.mkdirs(tmpdir);

      const nuggetOpts = {
        target: filename,
        dir: tmpdir,
        resume: true,
        strictSSL: true
      };
      yield (0, _pify2.default)(_nugget2.default)(targetAsset.browser_download_url, nuggetOpts);
    }

    yield (0, _oraHandler2.default)('Installing Application', (() => {
      var _ref4 = (0, _bluebird.coroutine)(function* (installSpinner) {
        const installActions = {
          win32: {
            '.exe': _exe2.default
          },
          darwin: {
            '.zip': _zip2.default,
            '.dmg': _dmg2.default
          },
          linux: {
            '.deb': _deb2.default,
            '.rpm': _rpm2.default
          }
        };

        const suffixFnIdent = (0, _keys2.default)(installActions[process.platform]).find(function (suffix) {
          return targetAsset.name.endsWith(suffix);
        });
        yield installActions[process.platform][suffixFnIdent](fullFilePath, installSpinner);
      });

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    })());
  });

  return function () {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9pbnN0YWxsLmpzIl0sIm5hbWVzIjpbImQiLCJHSVRIVUJfQVBJIiwicHJvdmlkZWRPcHRpb25zIiwiaW50ZXJhY3RpdmUiLCJwcmVyZWxlYXNlIiwicmVwbyIsImNob29zZUFzc2V0IiwiYXN5bmNPcmEiLCJsYXRlc3RSZWxlYXNlIiwicG9zc2libGVBc3NldHMiLCJzZWFyY2hTcGlubmVyIiwiaW5kZXhPZiIsInJlbGVhc2VzIiwianNvbiIsImVyciIsIm1lc3NhZ2UiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJyZWxlYXNlIiwic29ydGVkUmVsZWFzZXMiLCJzb3J0IiwicmVsZWFzZUEiLCJyZWxlYXNlQiIsInRhZ0EiLCJ0YWdfbmFtZSIsInN1YnN0ciIsInRhZ0IiLCJzZW12ZXIiLCJndCIsInRleHQiLCJhc3NldHMiLCJpbnN0YWxsVGFyZ2V0cyIsIndpbjMyIiwiZGFyd2luIiwibGludXgiLCJhc3NldCIsInRhcmdldFN1ZmZpeGVzIiwicHJvY2VzcyIsInBsYXRmb3JtIiwic3VmZml4IiwidGVzdCIsIm5hbWUiLCJsZW5ndGgiLCJjeWFuIiwidGFyZ2V0QXNzZXQiLCJyZXNvbHZlIiwiY2hvaWNlcyIsImZvckVhY2giLCJwdXNoIiwidmFsdWUiLCJpZCIsImlucXVpcmVyIiwiY3JlYXRlUHJvbXB0TW9kdWxlIiwidHlwZSIsImFzc2V0SUQiLCJmaW5kIiwidG1wZGlyIiwicGF0aCIsIm9zIiwicGF0aFNhZmVSZXBvIiwicmVwbGFjZSIsImZpbGVuYW1lIiwiZnVsbEZpbGVQYXRoIiwiZnMiLCJwYXRoRXhpc3RzIiwic3RhdCIsInNpemUiLCJta2RpcnMiLCJudWdnZXRPcHRzIiwidGFyZ2V0IiwiZGlyIiwicmVzdW1lIiwic3RyaWN0U1NMIiwibnVnZ2V0IiwiYnJvd3Nlcl9kb3dubG9hZF91cmwiLCJpbnN0YWxsU3Bpbm5lciIsImluc3RhbGxBY3Rpb25zIiwid2luMzJFeGVJbnN0YWxsZXIiLCJkYXJ3aW5aaXBJbnN0YWxsZXIiLCJkYXJ3aW5ETUdJbnN0YWxsZXIiLCJsaW51eERlYkluc3RhbGxlciIsImxpbnV4UlBNSW5zdGFsbGVyIiwic3VmZml4Rm5JZGVudCIsImVuZHNXaXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLElBQUkscUJBQU0sd0JBQU4sQ0FBVjs7QUFFQSxNQUFNQyxhQUFhLHdCQUFuQjs7QUFFQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7c0NBTWUsV0FBT0Msa0JBQWtCLEVBQXpCLEVBQWdDO0FBQzdDO0FBRDZDLHlCQUVRLHNCQUFjO0FBQ2pFQyxtQkFBYSxLQURvRDtBQUVqRUMsa0JBQVk7QUFGcUQsS0FBZCxFQUdsREYsZUFIa0QsQ0FGUjs7QUFBQSxRQUV2Q0MsV0FGdUMsa0JBRXZDQSxXQUZ1QztBQUFBLFFBRTFCQyxVQUYwQixrQkFFMUJBLFVBRjBCO0FBQUEsUUFFZEMsSUFGYyxrQkFFZEEsSUFGYztBQUFBLFFBRVJDLFdBRlEsa0JBRVJBLFdBRlE7O0FBTTdDQyx5QkFBU0osV0FBVCxHQUF1QkEsV0FBdkI7O0FBRUEsUUFBSUssYUFBSjtBQUNBLFFBQUlDLGlCQUFpQixFQUFyQjs7QUFFQSxVQUFNLDBCQUFTLDJCQUFUO0FBQUEsMkNBQXNDLFdBQU9DLGFBQVAsRUFBeUI7QUFDbkUsWUFBSSxDQUFDTCxJQUFELElBQVNBLEtBQUtNLE9BQUwsQ0FBYSxHQUFiLE1BQXNCLENBQUMsQ0FBcEMsRUFBdUM7QUFDckMsZ0JBQU0sMkRBQU47QUFDRDs7QUFFRFgsVUFBRSxxQkFBRixFQUF5QkssSUFBekI7QUFDQSxZQUFJTyxRQUFKO0FBQ0EsWUFBSTtBQUNGQSxxQkFBVyxNQUFNLENBQUMsTUFBTSx5QkFBTyxHQUFFWCxVQUFX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LENBQVVYLE1BQVYsQ0FBTjs7QUFFQSxZQUFNWSxhQUFhO0FBQ2pCQyxnQkFBUVIsUUFEUztBQUVqQlMsYUFBS2QsTUFGWTtBQUdqQmUsZ0JBQVEsSUFIUztBQUlqQkMsbUJBQVc7QUFKTSxPQUFuQjtBQU1BLFlBQU0sb0JBQUtDLGdCQUFMLEVBQWE3QixZQUFZOEIsb0JBQXpCLEVBQStDTixVQUEvQyxDQUFOO0FBQ0Q7O0FBRUQsVUFBTSwwQkFBUyx3QkFBVDtBQUFBLDJDQUFtQyxXQUFPTyxjQUFQLEVBQTBCO0FBQ2pFLGNBQU1DLGlCQUFpQjtBQUNyQjVDLGlCQUFPO0FBQ0wsb0JBQVE2QztBQURILFdBRGM7QUFJckI1QyxrQkFBUTtBQUNOLG9CQUFRNkMsYUFERjtBQUVOLG9CQUFRQztBQUZGLFdBSmE7QUFRckI3QyxpQkFBTztBQUNMLG9CQUFROEMsYUFESDtBQUVMLG9CQUFRQztBQUZIO0FBUmMsU0FBdkI7O0FBY0EsY0FBTUMsZ0JBQWdCLG9CQUFZTixlQUFldkMsUUFBUUMsUUFBdkIsQ0FBWixFQUE4Q2lCLElBQTlDLENBQW1EO0FBQUEsaUJBQVVYLFlBQVlILElBQVosQ0FBaUIwQyxRQUFqQixDQUEwQjVDLE1BQTFCLENBQVY7QUFBQSxTQUFuRCxDQUF0QjtBQUNBLGNBQU1xQyxlQUFldkMsUUFBUUMsUUFBdkIsRUFBaUM0QyxhQUFqQyxFQUFnRHBCLFlBQWhELEVBQThEYSxjQUE5RCxDQUFOO0FBQ0QsT0FqQks7O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBTjtBQWtCRCxHIiwiZmlsZSI6ImFwaS9pbnN0YWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInO1xuaW1wb3J0IG51Z2dldCBmcm9tICdudWdnZXQnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHBpZnkgZnJvbSAncGlmeSc7XG5pbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG5cbmltcG9ydCBhc3luY09yYSBmcm9tICcuLi91dGlsL29yYS1oYW5kbGVyJztcbmltcG9ydCB7IGluZm8gfSBmcm9tICcuLi91dGlsL21lc3NhZ2VzJztcblxuaW1wb3J0IGRhcndpbkRNR0luc3RhbGxlciBmcm9tICcuLi9pbnN0YWxsZXJzL2Rhcndpbi9kbWcnO1xuaW1wb3J0IGRhcndpblppcEluc3RhbGxlciBmcm9tICcuLi9pbnN0YWxsZXJzL2Rhcndpbi96aXAnO1xuaW1wb3J0IGxpbnV4RGViSW5zdGFsbGVyIGZyb20gJy4uL2luc3RhbGxlcnMvbGludXgvZGViJztcbmltcG9ydCBsaW51eFJQTUluc3RhbGxlciBmcm9tICcuLi9pbnN0YWxsZXJzL2xpbnV4L3JwbSc7XG5pbXBvcnQgd2luMzJFeGVJbnN0YWxsZXIgZnJvbSAnLi4vaW5zdGFsbGVycy93aW4zMi9leGUnO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmluc3RhbGwnKTtcblxuY29uc3QgR0lUSFVCX0FQSSA9ICdodHRwczovL2FwaS5naXRodWIuY29tJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBJbnN0YWxsT3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFufSBbaW50ZXJhY3RpdmU9ZmFsc2VdIFdoZXRoZXIgdG8gdXNlIHNlbnNpYmxlIGRlZmF1bHRzIG9yIHByb21wdCB0aGUgdXNlciB2aXN1YWxseVxuICogQHByb3BlcnR5IHtib29sZWFufSBbcHJlcmVsZWFzZT1mYWxzZV0gV2hldGhlciB0byBpbnN0YWxsIHByZXJlbGVhc2UgdmVyc2lvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByZXBvIFRoZSBHaXRIdWIgcmVwb3NpdG9yeSB0byBpbnN0YWxsIGZyb20sIGluIHRoZSBmb3JtYXQgb3duZXIvbmFtZVxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gY2hvb3NlQXNzZXQgQSBmdW5jdGlvbiB0aGF0IG11c3QgcmV0dXJuIHRoZSBhc3NldCB0byB1c2UvaW5zdGFsbCBmcm9tIGEgcHJvdmlkZWQgYXJyYXkgb2YgY29tcGF0aWJsZSBHaXRIdWIgYXNzZXRzXG4gKi9cblxuLyoqXG4gKiBJbnN0YWxsIGFuIEVsZWN0cm9uIGFwcGxpY2F0aW9uIGZyb20gR2l0SHViLiBJZiB5b3UgbGVhdmUgaW50ZXJhY3RpdmUgYXMgYGZhbHNlYCwgeW91IE1VU1QgcHJvdmlkZSBhIGBjaG9vc2VBc3NldGAgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtJbnN0YWxsT3B0aW9uc30gcHJvdmlkZWRPcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGluc3RhbGwgbWV0aG9kXG4gKiBAcmV0dXJuIHtQcm9taXNlfSBXaWxsIHJlc29sdmUgd2hlbiB0aGUgaW5zdGFsbCBwcm9jZXNzIGlzIGNvbXBsZXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwcm92aWRlZE9wdGlvbnMgPSB7fSkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0LCBuby11bnVzZWQtdmFyc1xuICBsZXQgeyBpbnRlcmFjdGl2ZSwgcHJlcmVsZWFzZSwgcmVwbywgY2hvb3NlQXNzZXQgfSA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICBwcmVyZWxlYXNlOiBmYWxzZSxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcbiAgYXN5bmNPcmEuaW50ZXJhY3RpdmUgPSBpbnRlcmFjdGl2ZTtcblxuICBsZXQgbGF0ZXN0UmVsZWFzZTtcbiAgbGV0IHBvc3NpYmxlQXNzZXRzID0gW107XG5cbiAgYXdhaXQgYXN5bmNPcmEoJ1NlYXJjaGluZyBmb3IgQXBwbGljYXRpb24nLCBhc3luYyAoc2VhcmNoU3Bpbm5lcikgPT4ge1xuICAgIGlmICghcmVwbyB8fCByZXBvLmluZGV4T2YoJy8nKSA9PT0gLTEpIHtcbiAgICAgIHRocm93ICdJbnZhbGlkIHJlcG9zaXRvcnkgbmFtZSwgbXVzdCBiZSBpbiB0aGUgZm9ybWF0IG93bmVyL25hbWUnO1xuICAgIH1cblxuICAgIGQoJ3NlYXJjaGluZyBmb3IgcmVwbzonLCByZXBvKTtcbiAgICBsZXQgcmVsZWFzZXM7XG4gICAgdHJ5IHtcbiAgICAgIHJlbGVhc2VzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0dJVEhVQl9BUEl9L3JlcG9zLyR7cmVwb30vcmVsZWFzZXNgKSkuanNvbigpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSWdub3JlIGVycm9yXG4gICAgfVxuXG4gICAgaWYgKCFyZWxlYXNlcyB8fCByZWxlYXNlcy5tZXNzYWdlID09PSAnTm90IEZvdW5kJyB8fCAhQXJyYXkuaXNBcnJheShyZWxlYXNlcykpIHtcbiAgICAgIHRocm93IGBGYWlsZWQgdG8gZmluZCByZWxlYXNlcyBmb3IgcmVwb3NpdG9yeSBcIiR7cmVwb31cIi4gIFBsZWFzZSBjaGVjayB0aGUgbmFtZSBhbmQgdHJ5IGFnYWluLmA7XG4gICAgfVxuXG4gICAgcmVsZWFzZXMgPSByZWxlYXNlcy5maWx0ZXIocmVsZWFzZSA9PiAhcmVsZWFzZS5wcmVyZWxlYXNlIHx8IHByZXJlbGVhc2UpO1xuXG4gICAgY29uc3Qgc29ydGVkUmVsZWFzZXMgPSByZWxlYXNlcy5zb3J0KChyZWxlYXNlQSwgcmVsZWFzZUIpID0+IHtcbiAgICAgIGxldCB0YWdBID0gcmVsZWFzZUEudGFnX25hbWU7XG4gICAgICBpZiAodGFnQS5zdWJzdHIoMCwgMSkgPT09ICd2JykgdGFnQSA9IHRhZ0Euc3Vic3RyKDEpO1xuICAgICAgbGV0IHRhZ0IgPSByZWxlYXNlQi50YWdfbmFtZTtcbiAgICAgIGlmICh0YWdCLnN1YnN0cigwLCAxKSA9PT0gJ3YnKSB0YWdCID0gdGFnQi5zdWJzdHIoMSk7XG4gICAgICByZXR1cm4gKHNlbXZlci5ndCh0YWdCLCB0YWdBKSA/IDEgOiAtMSk7XG4gICAgfSk7XG4gICAgbGF0ZXN0UmVsZWFzZSA9IHNvcnRlZFJlbGVhc2VzWzBdO1xuXG4gICAgc2VhcmNoU3Bpbm5lci50ZXh0ID0gJ1NlYXJjaGluZyBmb3IgUmVsZWFzZXMnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBjb25zdCBhc3NldHMgPSBsYXRlc3RSZWxlYXNlLmFzc2V0cztcbiAgICBpZiAoIWFzc2V0cyB8fCAhQXJyYXkuaXNBcnJheShhc3NldHMpKSB7XG4gICAgICB0aHJvdyAnQ291bGQgbm90IGZpbmQgYW55IGFzc2V0cyBmb3IgdGhlIGxhdGVzdCByZWxlYXNlJztcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YWxsVGFyZ2V0cyA9IHtcbiAgICAgIHdpbjMyOiBbL1xcLmV4ZSQvXSxcbiAgICAgIGRhcndpbjogWy9PU1guKlxcLnppcCQvLCAvZGFyd2luLipcXC56aXAkLywgL21hY09TLipcXC56aXAkLywgL21hYy4qXFwuemlwJC8sIC9cXC5kbWckL10sXG4gICAgICBsaW51eDogWy9cXC5ycG0kLywgL1xcLmRlYiQvXSxcbiAgICB9O1xuXG4gICAgcG9zc2libGVBc3NldHMgPSBhc3NldHMuZmlsdGVyKChhc3NldCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0U3VmZml4ZXMgPSBpbnN0YWxsVGFyZ2V0c1twcm9jZXNzLnBsYXRmb3JtXTtcbiAgICAgIGZvciAoY29uc3Qgc3VmZml4IG9mIHRhcmdldFN1ZmZpeGVzKSB7XG4gICAgICAgIGlmIChzdWZmaXgudGVzdChhc3NldC5uYW1lKSkgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBpZiAocG9zc2libGVBc3NldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBgRmFpbGVkIHRvIGZpbmQgYW55IGluc3RhbGxhYmxlIGFzc2V0cyBmb3IgdGFyZ2V0IHBsYXRmb3JtOiAke2Ake3Byb2Nlc3MucGxhdGZvcm19YC5jeWFufWA7XG4gICAgfVxuICB9KTtcblxuICBpbmZvKGludGVyYWN0aXZlLCBgRm91bmQgbGF0ZXN0IHJlbGVhc2Uke3ByZXJlbGVhc2UgPyAnIChpbmNsdWRpbmcgcHJlcmVsZWFzZXMpJyA6ICcnfTogJHtsYXRlc3RSZWxlYXNlLnRhZ19uYW1lLmN5YW59YCk7XG5cbiAgbGV0IHRhcmdldEFzc2V0ID0gcG9zc2libGVBc3NldHNbMF07XG4gIGlmIChwb3NzaWJsZUFzc2V0cy5sZW5ndGggPiAxKSB7XG4gICAgaWYgKGNob29zZUFzc2V0KSB7XG4gICAgICB0YXJnZXRBc3NldCA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShjaG9vc2VBc3NldChwb3NzaWJsZUFzc2V0cykpO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJhY3RpdmUpIHtcbiAgICAgIGNvbnN0IGNob2ljZXMgPSBbXTtcbiAgICAgIHBvc3NpYmxlQXNzZXRzLmZvckVhY2goKGFzc2V0KSA9PiB7XG4gICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IGFzc2V0Lm5hbWUsIHZhbHVlOiBhc3NldC5pZCB9KTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgeyBhc3NldElEIH0gPSBhd2FpdCBpbnF1aXJlci5jcmVhdGVQcm9tcHRNb2R1bGUoKSh7XG4gICAgICAgIHR5cGU6ICdsaXN0JyxcbiAgICAgICAgbmFtZTogJ2Fzc2V0SUQnLFxuICAgICAgICBtZXNzYWdlOiAnTXVsdGlwbGUgcG90ZW50aWFsIGFzc2V0cyBmb3VuZCwgcGxlYXNlIGNob29zZSBvbmUgZnJvbSB0aGUgbGlzdCBiZWxvdzonLmN5YW4sXG4gICAgICAgIGNob2ljZXMsXG4gICAgICB9KTtcblxuICAgICAgdGFyZ2V0QXNzZXQgPSBwb3NzaWJsZUFzc2V0cy5maW5kKGFzc2V0ID0+IGFzc2V0LmlkID09PSBhc3NldElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgJ2V4cGVjdGVkIGEgY2hvb3NlQXNzZXQgZnVuY3Rpb24gdG8gYmUgcHJvdmlkZWQgYnV0IGl0IHdhcyBub3QnO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRtcGRpciA9IHBhdGgucmVzb2x2ZShvcy50bXBkaXIoKSwgJ2ZvcmdlLWluc3RhbGwnKTtcbiAgY29uc3QgcGF0aFNhZmVSZXBvID0gcmVwby5yZXBsYWNlKC9bL1xcXFxdL2csICctJyk7XG4gIGNvbnN0IGZpbGVuYW1lID0gYCR7cGF0aFNhZmVSZXBvfS0ke2xhdGVzdFJlbGVhc2UudGFnX25hbWV9LSR7dGFyZ2V0QXNzZXQubmFtZX1gO1xuXG4gIGNvbnN0IGZ1bGxGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZSh0bXBkaXIsIGZpbGVuYW1lKTtcbiAgaWYgKCFhd2FpdCBmcy5wYXRoRXhpc3RzKGZ1bGxGaWxlUGF0aCkgfHwgKGF3YWl0IGZzLnN0YXQoZnVsbEZpbGVQYXRoKSkuc2l6ZSAhPT0gdGFyZ2V0QXNzZXQuc2l6ZSkge1xuICAgIGF3YWl0IGZzLm1rZGlycyh0bXBkaXIpO1xuXG4gICAgY29uc3QgbnVnZ2V0T3B0cyA9IHtcbiAgICAgIHRhcmdldDogZmlsZW5hbWUsXG4gICAgICBkaXI6IHRtcGRpcixcbiAgICAgIHJlc3VtZTogdHJ1ZSxcbiAgICAgIHN0cmljdFNTTDogdHJ1ZSxcbiAgICB9O1xuICAgIGF3YWl0IHBpZnkobnVnZ2V0KSh0YXJnZXRBc3NldC5icm93c2VyX2Rvd25sb2FkX3VybCwgbnVnZ2V0T3B0cyk7XG4gIH1cblxuICBhd2FpdCBhc3luY09yYSgnSW5zdGFsbGluZyBBcHBsaWNhdGlvbicsIGFzeW5jIChpbnN0YWxsU3Bpbm5lcikgPT4ge1xuICAgIGNvbnN0IGluc3RhbGxBY3Rpb25zID0ge1xuICAgICAgd2luMzI6IHtcbiAgICAgICAgJy5leGUnOiB3aW4zMkV4ZUluc3RhbGxlcixcbiAgICAgIH0sXG4gICAgICBkYXJ3aW46IHtcbiAgICAgICAgJy56aXAnOiBkYXJ3aW5aaXBJbnN0YWxsZXIsXG4gICAgICAgICcuZG1nJzogZGFyd2luRE1HSW5zdGFsbGVyLFxuICAgICAgfSxcbiAgICAgIGxpbnV4OiB7XG4gICAgICAgICcuZGViJzogbGludXhEZWJJbnN0YWxsZXIsXG4gICAgICAgICcucnBtJzogbGludXhSUE1JbnN0YWxsZXIsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBzdWZmaXhGbklkZW50ID0gT2JqZWN0LmtleXMoaW5zdGFsbEFjdGlvbnNbcHJvY2Vzcy5wbGF0Zm9ybV0pLmZpbmQoc3VmZml4ID0+IHRhcmdldEFzc2V0Lm5hbWUuZW5kc1dpdGgoc3VmZml4KSk7XG4gICAgYXdhaXQgaW5zdGFsbEFjdGlvbnNbcHJvY2Vzcy5wbGF0Zm9ybV1bc3VmZml4Rm5JZGVudF0oZnVsbEZpbGVQYXRoLCBpbnN0YWxsU3Bpbm5lcik7XG4gIH0pO1xufTtcbiJdfQ==