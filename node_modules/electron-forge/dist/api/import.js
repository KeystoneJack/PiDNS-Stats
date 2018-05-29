'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _initGit = require('../init/init-git');

var _initGit2 = _interopRequireDefault(_initGit);

var _initNpm = require('../init/init-npm');

var _forgeConfig = require('../util/forge-config');

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _messages = require('../util/messages');

var _installDependencies = require('../util/install-dependencies');

var _installDependencies2 = _interopRequireDefault(_installDependencies);

var _readPackageJson = require('../util/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

var _confirmIfInteractive = require('../util/confirm-if-interactive');

var _confirmIfInteractive2 = _interopRequireDefault(_confirmIfInteractive);

var _yarnOrNpm = require('../util/yarn-or-npm');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:import');

/**
 * @typedef {Object} ImportOptions
 * @property {string} [dir=process.cwd()] The path to the app to be imported
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {boolean} [updateScripts=true] Whether to update the modules package.json scripts to be electron-forge commands
 * @property {string} [outDir=`${dir}/out`] The path to the directory containing generated distributables
 */

/**
 * Attempt to import a given module directory to the Electron Forge standard.
 *
 * - Replaces the prebuilt electron package with the one that integrates with `electron-compile`
 * - Sets up `git` and the correct NPM dependencies
 * - Adds a template forge config to `package.json`
 *
 * @param {ImportOptions} providedOptions - Options for the import method
 * @return {Promise} Will resolve when the import process is complete
 */

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (providedOptions = {}) {
    var _Object$assign = (0, _assign2.default)({
      dir: process.cwd(),
      interactive: false,
      updateScripts: true
    }, providedOptions);

    const dir = _Object$assign.dir,
          interactive = _Object$assign.interactive,
          updateScripts = _Object$assign.updateScripts;


    const outDir = providedOptions.outDir || 'out';
    _oraHandler2.default.interactive = interactive;

    d(`Attempting to import project in: ${dir}`);
    if (!(yield _fsExtra2.default.pathExists(dir)) || !(yield _fsExtra2.default.pathExists(_path2.default.resolve(dir, 'package.json')))) {
      throw `We couldn't find a project in: ${dir}`;
    }

    // eslint-disable-next-line max-len
    const confirm = yield (0, _confirmIfInteractive2.default)(interactive, `WARNING: We will now attempt to import: "${dir}".  This will involve modifying some files, are you sure you want to continue?`);

    if (!confirm) {
      process.exit(0);
    }

    yield (0, _initGit2.default)(dir);

    let packageJSON = yield (0, _readPackageJson2.default)(dir);
    if (packageJSON.config && packageJSON.config.forge) {
      (0, _messages.warn)(interactive, 'It looks like this project is already configured for "electron-forge"'.green);
      const shouldContinue = yield (0, _confirmIfInteractive2.default)(interactive, 'Are you sure you want to continue?');

      if (!shouldContinue) {
        process.exit(0);
      }
    }

    // eslint-disable-next-line max-len
    const shouldChangeMain = yield (0, _confirmIfInteractive2.default)(interactive, 'Do you want us to change the "main" attribute of your package.json?  If you are currently using babel and pointing to a "build" directory say yes.', false);
    if (shouldChangeMain) {
      var _ref2 = yield _inquirer2.default.createPromptModule()({
        type: 'input',
        name: 'newMain',
        default: packageJSON.main,
        message: 'Enter the relative path to your uncompiled main file'
      });

      const newMain = _ref2.newMain;

      packageJSON.main = newMain;
    }

    packageJSON.dependencies = packageJSON.dependencies || {};
    packageJSON.devDependencies = packageJSON.devDependencies || {};

    const keys = (0, _keys2.default)(packageJSON.dependencies).concat((0, _keys2.default)(packageJSON.devDependencies));
    const buildToolPackages = {
      'electron-builder': 'provides mostly equivalent functionality',
      'electron-download': 'already uses this module as a transitive dependency',
      'electron-installer-debian': 'already uses this module as a transitive dependency',
      'electron-installer-dmg': 'already uses this module as a transitive dependency',
      'electron-installer-flatpak': 'already uses this module as a transitive dependency',
      'electron-installer-redhat': 'already uses this module as a transitive dependency',
      'electron-osx-sign': 'already uses this module as a transitive dependency',
      'electron-packager': 'already uses this module as a transitive dependency',
      'electron-winstaller': 'already uses this module as a transitive dependency'
    };

    let electronName;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const key = _step.value;

        if (key === 'electron' || key === 'electron-prebuilt') {
          delete packageJSON.dependencies[key];
          delete packageJSON.devDependencies[key];
          electronName = key;
        } else if (buildToolPackages[key]) {
          const explanation = buildToolPackages[key];
          // eslint-disable-next-line max-len
          const shouldRemoveDependency = yield (0, _confirmIfInteractive2.default)(interactive, `Do you want us to remove the "${key}" dependency in package.json? Electron Forge ${explanation}.`);

          if (shouldRemoveDependency) {
            delete packageJSON.dependencies[key];
            delete packageJSON.devDependencies[key];
          }
        }
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

    packageJSON.scripts = packageJSON.scripts || {};
    d('reading current scripts object:', packageJSON.scripts);

    const updatePackageScript = (() => {
      var _ref3 = (0, _bluebird.coroutine)(function* (scriptName, newValue) {
        if (packageJSON.scripts[scriptName] !== newValue) {
          // eslint-disable-next-line max-len
          const shouldUpdate = yield (0, _confirmIfInteractive2.default)(interactive, `Do you want us to update the "${scriptName}" script to instead call the electron-forge task "${newValue}"`, updateScripts);
          if (shouldUpdate) {
            packageJSON.scripts[scriptName] = newValue;
          }
        }
      });

      return function updatePackageScript(_x, _x2) {
        return _ref3.apply(this, arguments);
      };
    })();

    yield updatePackageScript('start', 'electron-forge start');
    yield updatePackageScript('package', 'electron-forge package');
    yield updatePackageScript('make', 'electron-forge make');

    d('forgified scripts object:', packageJSON.scripts);

    const writeChanges = (() => {
      var _ref4 = (0, _bluebird.coroutine)(function* () {
        yield (0, _oraHandler2.default)('Writing modified package.json file', (0, _bluebird.coroutine)(function* () {
          yield _fsExtra2.default.writeJson(_path2.default.resolve(dir, 'package.json'), packageJSON, { spaces: 2 });
        }));
      });

      return function writeChanges() {
        return _ref4.apply(this, arguments);
      };
    })();

    let electronVersion;
    if (electronName) {
      const electronPackageJSON = yield (0, _readPackageJson2.default)(_path2.default.resolve(dir, 'node_modules', electronName));
      electronVersion = electronPackageJSON.version;
      packageJSON.devDependencies['electron-prebuilt-compile'] = electronVersion;
    }

    yield writeChanges();

    if (electronName) {
      yield (0, _oraHandler2.default)('Pruning deleted modules', (0, _bluebird.coroutine)(function* () {
        d('attempting to prune node_modules in:', dir);
        yield (0, _yarnOrNpm.yarnOrNpmSpawn)((0, _yarnOrNpm.hasYarn)() ? [] : ['prune'], {
          cwd: dir,
          stdio: 'ignore'
        });
      }));
    }

    yield (0, _oraHandler2.default)('Installing dependencies', (0, _bluebird.coroutine)(function* () {
      d('deleting old dependencies forcefully');
      yield _fsExtra2.default.remove(_path2.default.resolve(dir, 'node_modules/.bin/electron'));
      yield _fsExtra2.default.remove(_path2.default.resolve(dir, 'node_modules/.bin/electron.cmd'));

      if (electronName) {
        yield _fsExtra2.default.remove(_path2.default.resolve(dir, 'node_modules', electronName));
      }

      d('installing dependencies');
      yield (0, _installDependencies2.default)(dir, _initNpm.deps);

      d('installing devDependencies');
      yield (0, _installDependencies2.default)(dir, _initNpm.devDeps, true);

      d('installing exactDevDependencies');
      yield (0, _installDependencies2.default)(dir, _initNpm.exactDevDeps.map(function (dep) {
        if (dep === 'electron-prebuilt-compile') {
          return `${dep}@${electronVersion || 'latest'}`;
        }

        return dep;
      }), true, true);
    }));

    packageJSON = yield (0, _readPackageJson2.default)(dir);

    if (!packageJSON.version) {
      (0, _messages.warn)(interactive, "Please set the 'version' in your application's package.json".yellow);
    }

    packageJSON.config = packageJSON.config || {};
    const templatePackageJSON = yield (0, _readPackageJson2.default)(_path2.default.resolve(__dirname, '../../tmpl'));
    packageJSON.config.forge = templatePackageJSON.config.forge;
    (0, _forgeConfig.setInitialForgeConfig)(packageJSON);

    yield writeChanges();

    yield (0, _oraHandler2.default)('Fixing .gitignore', (0, _bluebird.coroutine)(function* () {
      if (yield _fsExtra2.default.pathExists(_path2.default.resolve(dir, '.gitignore'))) {
        const gitignore = yield _fsExtra2.default.readFile(_path2.default.resolve(dir, '.gitignore'));
        if (!gitignore.includes(outDir)) {
          yield _fsExtra2.default.writeFile(_path2.default.resolve(dir, '.gitignore'), `${gitignore}\n${outDir}/`);
        }
      }
    }));

    let babelConfig = packageJSON.babel;
    const babelPath = _path2.default.resolve(dir, '.babelrc');
    if (!babelConfig && (yield _fsExtra2.default.pathExists(babelPath))) {
      babelConfig = yield _fsExtra2.default.readJson(babelPath, 'utf8');
    }

    if (babelConfig) {
      yield (0, _oraHandler2.default)('Porting original babel config', (0, _bluebird.coroutine)(function* () {
        let compileConfig = {};
        const compilePath = _path2.default.resolve(dir, '.compilerc');
        if (yield _fsExtra2.default.pathExists(compilePath)) {
          compileConfig = yield _fsExtra2.default.readJson(compilePath, 'utf8');
        }

        yield _fsExtra2.default.writeJson(compilePath, (0, _assign2.default)(compileConfig, {
          'application/javascript': babelConfig
        }), { spaces: 2 });
      }));

      (0, _messages.info)(interactive, 'NOTE: You might be able to remove your `.compilerc` file completely if you are only using the `es2016` and `react` presets'.yellow);
    }

    (0, _messages.info)(interactive, `

We have ATTEMPTED to convert your app to be in a format that electron-forge understands.
Nothing much will have changed but we added the ${'"electron-prebuilt-compile"'.cyan} dependency.  This is \
the dependency you must version bump to get newer versions of Electron.


We also tried to import any build tooling you already had but we can't get everything.  You might need to convert any CLI/gulp/grunt tasks yourself.

Also please note if you are using \`preload\` scripts you need to follow the steps outlined \
at https://github.com/electron-userland/electron-forge/wiki/Using-%27preload%27-scripts

Thanks for using ${'"electron-forge"'.green}!!!`);
  });

  return function () {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS9pbXBvcnQuanMiXSwibmFtZXMiOlsiZCIsInByb3ZpZGVkT3B0aW9ucyIsImRpciIsInByb2Nlc3MiLCJjd2QiLCJpbnRlcmFjdGl2ZSIsInVwZGF0ZVNjcmlwdHMiLCJvdXREaXIiLCJhc3luY09yYSIsImZzIiwicGF0aEV4aXN0cyIsInBhdGgiLCJyZXNvbHZlIiwiY29uZmlybSIsImV4aXQiLCJwYWNrYWdlSlNPTiIsImNvbmZpZyIsImZvcmdlIiwiZ3JlZW4iLCJzaG91bGRDb250aW51ZSIsInNob3VsZENoYW5nZU1haW4iLCJpbnF1aXJlciIsImNyZWF0ZVByb21wdE1vZHVsZSIsInR5cGUiLCJuYW1lIiwiZGVmYXVsdCIsIm1haW4iLCJtZXNzYWdlIiwibmV3TWFpbiIsImRlcGVuZGVuY2llcyIsImRldkRlcGVuZGVuY2llcyIsImtleXMiLCJjb25jYXQiLCJidWlsZFRvb2xQYWNrYWdlcyIsImVsZWN0cm9uTmFtZSIsImtleSIsImV4cGxhbmF0aW9uIiwic2hvdWxkUmVtb3ZlRGVwZW5kZW5jeSIsInNjcmlwdHMiLCJ1cGRhdGVQYWNrYWdlU2NyaXB0Iiwic2NyaXB0TmFtZSIsIm5ld1ZhbHVlIiwic2hvdWxkVXBkYXRlIiwid3JpdGVDaGFuZ2VzIiwid3JpdGVKc29uIiwic3BhY2VzIiwiZWxlY3Ryb25WZXJzaW9uIiwiZWxlY3Ryb25QYWNrYWdlSlNPTiIsInZlcnNpb24iLCJzdGRpbyIsInJlbW92ZSIsImRlcHMiLCJkZXZEZXBzIiwiZXhhY3REZXZEZXBzIiwibWFwIiwiZGVwIiwieWVsbG93IiwidGVtcGxhdGVQYWNrYWdlSlNPTiIsIl9fZGlybmFtZSIsImdpdGlnbm9yZSIsInJlYWRGaWxlIiwiaW5jbHVkZXMiLCJ3cml0ZUZpbGUiLCJiYWJlbENvbmZpZyIsImJhYmVsIiwiYmFiZWxQYXRoIiwicmVhZEpzb24iLCJjb21waWxlQ29uZmlnIiwiY29tcGlsZVBhdGgiLCJjeWFuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7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QUFJSSxnQkFBZ0IsRUFBcEI7QUFDQSxjQUFNQyxjQUFjekQsZUFBS0MsT0FBTCxDQUFhVixHQUFiLEVBQWtCLFlBQWxCLENBQXBCO0FBQ0EsWUFBSSxNQUFNTyxrQkFBR0MsVUFBSCxDQUFjMEQsV0FBZCxDQUFWLEVBQXNDO0FBQ3BDRCwwQkFBZ0IsTUFBTTFELGtCQUFHeUQsUUFBSCxDQUFZRSxXQUFaLEVBQXlCLE1BQXpCLENBQXRCO0FBQ0Q7O0FBRUQsY0FBTTNELGtCQUFHbUMsU0FBSCxDQUFhd0IsV0FBYixFQUEwQixzQkFBY0QsYUFBZCxFQUE2QjtBQUMzRCxvQ0FBMEJKO0FBRGlDLFNBQTdCLENBQTFCLEVBRUYsRUFBRWxCLFFBQVEsQ0FBVixFQUZFLENBQU47QUFHRCxPQVZLLEVBQU47O0FBWUEsMEJBQUt4QyxXQUFMLEVBQWtCLDZIQUE2SG1ELE1BQS9JO0FBQ0Q7O0FBRUQsd0JBQUtuRCxXQUFMLEVBQW1COzs7a0RBRzZCLDhCQUE4QmdFLElBQUs7Ozs7Ozs7OzttQkFTbEUsbUJBQW1CbkQsS0FBTSxLQVoxQztBQWFELEciLCJmaWxlIjoiYXBpL2ltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IGlucXVpcmVyIGZyb20gJ2lucXVpcmVyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgaW5pdEdpdCBmcm9tICcuLi9pbml0L2luaXQtZ2l0JztcbmltcG9ydCB7IGRlcHMsIGRldkRlcHMsIGV4YWN0RGV2RGVwcyB9IGZyb20gJy4uL2luaXQvaW5pdC1ucG0nO1xuXG5pbXBvcnQgeyBzZXRJbml0aWFsRm9yZ2VDb25maWcgfSBmcm9tICcuLi91dGlsL2ZvcmdlLWNvbmZpZyc7XG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5pbXBvcnQgeyBpbmZvLCB3YXJuIH0gZnJvbSAnLi4vdXRpbC9tZXNzYWdlcyc7XG5pbXBvcnQgaW5zdGFsbERlcExpc3QgZnJvbSAnLi4vdXRpbC9pbnN0YWxsLWRlcGVuZGVuY2llcyc7XG5pbXBvcnQgcmVhZFBhY2thZ2VKU09OIGZyb20gJy4uL3V0aWwvcmVhZC1wYWNrYWdlLWpzb24nO1xuaW1wb3J0IGNvbmZpcm1JZkludGVyYWN0aXZlIGZyb20gJy4uL3V0aWwvY29uZmlybS1pZi1pbnRlcmFjdGl2ZSc7XG5pbXBvcnQgeyB5YXJuT3JOcG1TcGF3biwgaGFzWWFybiB9IGZyb20gJy4uL3V0aWwveWFybi1vci1ucG0nO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmltcG9ydCcpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEltcG9ydE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGlyPXByb2Nlc3MuY3dkKCldIFRoZSBwYXRoIHRvIHRoZSBhcHAgdG8gYmUgaW1wb3J0ZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2ludGVyYWN0aXZlPWZhbHNlXSBXaGV0aGVyIHRvIHVzZSBzZW5zaWJsZSBkZWZhdWx0cyBvciBwcm9tcHQgdGhlIHVzZXIgdmlzdWFsbHlcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VwZGF0ZVNjcmlwdHM9dHJ1ZV0gV2hldGhlciB0byB1cGRhdGUgdGhlIG1vZHVsZXMgcGFja2FnZS5qc29uIHNjcmlwdHMgdG8gYmUgZWxlY3Ryb24tZm9yZ2UgY29tbWFuZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbb3V0RGlyPWAke2Rpcn0vb3V0YF0gVGhlIHBhdGggdG8gdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIGdlbmVyYXRlZCBkaXN0cmlidXRhYmxlc1xuICovXG5cbi8qKlxuICogQXR0ZW1wdCB0byBpbXBvcnQgYSBnaXZlbiBtb2R1bGUgZGlyZWN0b3J5IHRvIHRoZSBFbGVjdHJvbiBGb3JnZSBzdGFuZGFyZC5cbiAqXG4gKiAtIFJlcGxhY2VzIHRoZSBwcmVidWlsdCBlbGVjdHJvbiBwYWNrYWdlIHdpdGggdGhlIG9uZSB0aGF0IGludGVncmF0ZXMgd2l0aCBgZWxlY3Ryb24tY29tcGlsZWBcbiAqIC0gU2V0cyB1cCBgZ2l0YCBhbmQgdGhlIGNvcnJlY3QgTlBNIGRlcGVuZGVuY2llc1xuICogLSBBZGRzIGEgdGVtcGxhdGUgZm9yZ2UgY29uZmlnIHRvIGBwYWNrYWdlLmpzb25gXG4gKlxuICogQHBhcmFtIHtJbXBvcnRPcHRpb25zfSBwcm92aWRlZE9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgaW1wb3J0IG1ldGhvZFxuICogQHJldHVybiB7UHJvbWlzZX0gV2lsbCByZXNvbHZlIHdoZW4gdGhlIGltcG9ydCBwcm9jZXNzIGlzIGNvbXBsZXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwcm92aWRlZE9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCB7IGRpciwgaW50ZXJhY3RpdmUsIHVwZGF0ZVNjcmlwdHMgfSA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGRpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICBpbnRlcmFjdGl2ZTogZmFsc2UsXG4gICAgdXBkYXRlU2NyaXB0czogdHJ1ZSxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcblxuICBjb25zdCBvdXREaXIgPSBwcm92aWRlZE9wdGlvbnMub3V0RGlyIHx8ICdvdXQnO1xuICBhc3luY09yYS5pbnRlcmFjdGl2ZSA9IGludGVyYWN0aXZlO1xuXG4gIGQoYEF0dGVtcHRpbmcgdG8gaW1wb3J0IHByb2plY3QgaW46ICR7ZGlyfWApO1xuICBpZiAoIWF3YWl0IGZzLnBhdGhFeGlzdHMoZGlyKSB8fCAhYXdhaXQgZnMucGF0aEV4aXN0cyhwYXRoLnJlc29sdmUoZGlyLCAncGFja2FnZS5qc29uJykpKSB7XG4gICAgdGhyb3cgYFdlIGNvdWxkbid0IGZpbmQgYSBwcm9qZWN0IGluOiAke2Rpcn1gO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgY29uc3QgY29uZmlybSA9IGF3YWl0IGNvbmZpcm1JZkludGVyYWN0aXZlKGludGVyYWN0aXZlLCBgV0FSTklORzogV2Ugd2lsbCBub3cgYXR0ZW1wdCB0byBpbXBvcnQ6IFwiJHtkaXJ9XCIuICBUaGlzIHdpbGwgaW52b2x2ZSBtb2RpZnlpbmcgc29tZSBmaWxlcywgYXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNvbnRpbnVlP2ApO1xuXG4gIGlmICghY29uZmlybSkge1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuXG4gIGF3YWl0IGluaXRHaXQoZGlyKTtcblxuICBsZXQgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04oZGlyKTtcbiAgaWYgKHBhY2thZ2VKU09OLmNvbmZpZyAmJiBwYWNrYWdlSlNPTi5jb25maWcuZm9yZ2UpIHtcbiAgICB3YXJuKGludGVyYWN0aXZlLCAnSXQgbG9va3MgbGlrZSB0aGlzIHByb2plY3QgaXMgYWxyZWFkeSBjb25maWd1cmVkIGZvciBcImVsZWN0cm9uLWZvcmdlXCInLmdyZWVuKTtcbiAgICBjb25zdCBzaG91bGRDb250aW51ZSA9IGF3YWl0IGNvbmZpcm1JZkludGVyYWN0aXZlKGludGVyYWN0aXZlLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNvbnRpbnVlPycpO1xuXG4gICAgaWYgKCFzaG91bGRDb250aW51ZSkge1xuICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gIGNvbnN0IHNob3VsZENoYW5nZU1haW4gPSBhd2FpdCBjb25maXJtSWZJbnRlcmFjdGl2ZShpbnRlcmFjdGl2ZSwgJ0RvIHlvdSB3YW50IHVzIHRvIGNoYW5nZSB0aGUgXCJtYWluXCIgYXR0cmlidXRlIG9mIHlvdXIgcGFja2FnZS5qc29uPyAgSWYgeW91IGFyZSBjdXJyZW50bHkgdXNpbmcgYmFiZWwgYW5kIHBvaW50aW5nIHRvIGEgXCJidWlsZFwiIGRpcmVjdG9yeSBzYXkgeWVzLicsIGZhbHNlKTtcbiAgaWYgKHNob3VsZENoYW5nZU1haW4pIHtcbiAgICBjb25zdCB7IG5ld01haW4gfSA9IGF3YWl0IGlucXVpcmVyLmNyZWF0ZVByb21wdE1vZHVsZSgpKHtcbiAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICBuYW1lOiAnbmV3TWFpbicsXG4gICAgICBkZWZhdWx0OiBwYWNrYWdlSlNPTi5tYWluLFxuICAgICAgbWVzc2FnZTogJ0VudGVyIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHlvdXIgdW5jb21waWxlZCBtYWluIGZpbGUnLFxuICAgIH0pO1xuICAgIHBhY2thZ2VKU09OLm1haW4gPSBuZXdNYWluO1xuICB9XG5cbiAgcGFja2FnZUpTT04uZGVwZW5kZW5jaWVzID0gcGFja2FnZUpTT04uZGVwZW5kZW5jaWVzIHx8IHt9O1xuICBwYWNrYWdlSlNPTi5kZXZEZXBlbmRlbmNpZXMgPSBwYWNrYWdlSlNPTi5kZXZEZXBlbmRlbmNpZXMgfHwge307XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHBhY2thZ2VKU09OLmRlcGVuZGVuY2llcykuY29uY2F0KE9iamVjdC5rZXlzKHBhY2thZ2VKU09OLmRldkRlcGVuZGVuY2llcykpO1xuICBjb25zdCBidWlsZFRvb2xQYWNrYWdlcyA9IHtcbiAgICAnZWxlY3Ryb24tYnVpbGRlcic6ICdwcm92aWRlcyBtb3N0bHkgZXF1aXZhbGVudCBmdW5jdGlvbmFsaXR5JyxcbiAgICAnZWxlY3Ryb24tZG93bmxvYWQnOiAnYWxyZWFkeSB1c2VzIHRoaXMgbW9kdWxlIGFzIGEgdHJhbnNpdGl2ZSBkZXBlbmRlbmN5JyxcbiAgICAnZWxlY3Ryb24taW5zdGFsbGVyLWRlYmlhbic6ICdhbHJlYWR5IHVzZXMgdGhpcyBtb2R1bGUgYXMgYSB0cmFuc2l0aXZlIGRlcGVuZGVuY3knLFxuICAgICdlbGVjdHJvbi1pbnN0YWxsZXItZG1nJzogJ2FscmVhZHkgdXNlcyB0aGlzIG1vZHVsZSBhcyBhIHRyYW5zaXRpdmUgZGVwZW5kZW5jeScsXG4gICAgJ2VsZWN0cm9uLWluc3RhbGxlci1mbGF0cGFrJzogJ2FscmVhZHkgdXNlcyB0aGlzIG1vZHVsZSBhcyBhIHRyYW5zaXRpdmUgZGVwZW5kZW5jeScsXG4gICAgJ2VsZWN0cm9uLWluc3RhbGxlci1yZWRoYXQnOiAnYWxyZWFkeSB1c2VzIHRoaXMgbW9kdWxlIGFzIGEgdHJhbnNpdGl2ZSBkZXBlbmRlbmN5JyxcbiAgICAnZWxlY3Ryb24tb3N4LXNpZ24nOiAnYWxyZWFkeSB1c2VzIHRoaXMgbW9kdWxlIGFzIGEgdHJhbnNpdGl2ZSBkZXBlbmRlbmN5JyxcbiAgICAnZWxlY3Ryb24tcGFja2FnZXInOiAnYWxyZWFkeSB1c2VzIHRoaXMgbW9kdWxlIGFzIGEgdHJhbnNpdGl2ZSBkZXBlbmRlbmN5JyxcbiAgICAnZWxlY3Ryb24td2luc3RhbGxlcic6ICdhbHJlYWR5IHVzZXMgdGhpcyBtb2R1bGUgYXMgYSB0cmFuc2l0aXZlIGRlcGVuZGVuY3knLFxuICB9O1xuXG4gIGxldCBlbGVjdHJvbk5hbWU7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBpZiAoa2V5ID09PSAnZWxlY3Ryb24nIHx8IGtleSA9PT0gJ2VsZWN0cm9uLXByZWJ1aWx0Jykge1xuICAgICAgZGVsZXRlIHBhY2thZ2VKU09OLmRlcGVuZGVuY2llc1trZXldO1xuICAgICAgZGVsZXRlIHBhY2thZ2VKU09OLmRldkRlcGVuZGVuY2llc1trZXldO1xuICAgICAgZWxlY3Ryb25OYW1lID0ga2V5O1xuICAgIH0gZWxzZSBpZiAoYnVpbGRUb29sUGFja2FnZXNba2V5XSkge1xuICAgICAgY29uc3QgZXhwbGFuYXRpb24gPSBidWlsZFRvb2xQYWNrYWdlc1trZXldO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgIGNvbnN0IHNob3VsZFJlbW92ZURlcGVuZGVuY3kgPSBhd2FpdCBjb25maXJtSWZJbnRlcmFjdGl2ZShpbnRlcmFjdGl2ZSwgYERvIHlvdSB3YW50IHVzIHRvIHJlbW92ZSB0aGUgXCIke2tleX1cIiBkZXBlbmRlbmN5IGluIHBhY2thZ2UuanNvbj8gRWxlY3Ryb24gRm9yZ2UgJHtleHBsYW5hdGlvbn0uYCk7XG5cbiAgICAgIGlmIChzaG91bGRSZW1vdmVEZXBlbmRlbmN5KSB7XG4gICAgICAgIGRlbGV0ZSBwYWNrYWdlSlNPTi5kZXBlbmRlbmNpZXNba2V5XTtcbiAgICAgICAgZGVsZXRlIHBhY2thZ2VKU09OLmRldkRlcGVuZGVuY2llc1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhY2thZ2VKU09OLnNjcmlwdHMgPSBwYWNrYWdlSlNPTi5zY3JpcHRzIHx8IHt9O1xuICBkKCdyZWFkaW5nIGN1cnJlbnQgc2NyaXB0cyBvYmplY3Q6JywgcGFja2FnZUpTT04uc2NyaXB0cyk7XG5cbiAgY29uc3QgdXBkYXRlUGFja2FnZVNjcmlwdCA9IGFzeW5jIChzY3JpcHROYW1lLCBuZXdWYWx1ZSkgPT4ge1xuICAgIGlmIChwYWNrYWdlSlNPTi5zY3JpcHRzW3NjcmlwdE5hbWVdICE9PSBuZXdWYWx1ZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgIGNvbnN0IHNob3VsZFVwZGF0ZSA9IGF3YWl0IGNvbmZpcm1JZkludGVyYWN0aXZlKGludGVyYWN0aXZlLCBgRG8geW91IHdhbnQgdXMgdG8gdXBkYXRlIHRoZSBcIiR7c2NyaXB0TmFtZX1cIiBzY3JpcHQgdG8gaW5zdGVhZCBjYWxsIHRoZSBlbGVjdHJvbi1mb3JnZSB0YXNrIFwiJHtuZXdWYWx1ZX1cImAsIHVwZGF0ZVNjcmlwdHMpO1xuICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xuICAgICAgICBwYWNrYWdlSlNPTi5zY3JpcHRzW3NjcmlwdE5hbWVdID0gbmV3VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGF3YWl0IHVwZGF0ZVBhY2thZ2VTY3JpcHQoJ3N0YXJ0JywgJ2VsZWN0cm9uLWZvcmdlIHN0YXJ0Jyk7XG4gIGF3YWl0IHVwZGF0ZVBhY2thZ2VTY3JpcHQoJ3BhY2thZ2UnLCAnZWxlY3Ryb24tZm9yZ2UgcGFja2FnZScpO1xuICBhd2FpdCB1cGRhdGVQYWNrYWdlU2NyaXB0KCdtYWtlJywgJ2VsZWN0cm9uLWZvcmdlIG1ha2UnKTtcblxuICBkKCdmb3JnaWZpZWQgc2NyaXB0cyBvYmplY3Q6JywgcGFja2FnZUpTT04uc2NyaXB0cyk7XG5cbiAgY29uc3Qgd3JpdGVDaGFuZ2VzID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGFzeW5jT3JhKCdXcml0aW5nIG1vZGlmaWVkIHBhY2thZ2UuanNvbiBmaWxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZnMud3JpdGVKc29uKHBhdGgucmVzb2x2ZShkaXIsICdwYWNrYWdlLmpzb24nKSwgcGFja2FnZUpTT04sIHsgc3BhY2VzOiAyIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGxldCBlbGVjdHJvblZlcnNpb247XG4gIGlmIChlbGVjdHJvbk5hbWUpIHtcbiAgICBjb25zdCBlbGVjdHJvblBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKHBhdGgucmVzb2x2ZShkaXIsICdub2RlX21vZHVsZXMnLCBlbGVjdHJvbk5hbWUpKTtcbiAgICBlbGVjdHJvblZlcnNpb24gPSBlbGVjdHJvblBhY2thZ2VKU09OLnZlcnNpb247XG4gICAgcGFja2FnZUpTT04uZGV2RGVwZW5kZW5jaWVzWydlbGVjdHJvbi1wcmVidWlsdC1jb21waWxlJ10gPSBlbGVjdHJvblZlcnNpb247XG4gIH1cblxuICBhd2FpdCB3cml0ZUNoYW5nZXMoKTtcblxuICBpZiAoZWxlY3Ryb25OYW1lKSB7XG4gICAgYXdhaXQgYXN5bmNPcmEoJ1BydW5pbmcgZGVsZXRlZCBtb2R1bGVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZCgnYXR0ZW1wdGluZyB0byBwcnVuZSBub2RlX21vZHVsZXMgaW46JywgZGlyKTtcbiAgICAgIGF3YWl0IHlhcm5Pck5wbVNwYXduKGhhc1lhcm4oKSA/IFtdIDogWydwcnVuZSddLCB7XG4gICAgICAgIGN3ZDogZGlyLFxuICAgICAgICBzdGRpbzogJ2lnbm9yZScsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGF3YWl0IGFzeW5jT3JhKCdJbnN0YWxsaW5nIGRlcGVuZGVuY2llcycsIGFzeW5jICgpID0+IHtcbiAgICBkKCdkZWxldGluZyBvbGQgZGVwZW5kZW5jaWVzIGZvcmNlZnVsbHknKTtcbiAgICBhd2FpdCBmcy5yZW1vdmUocGF0aC5yZXNvbHZlKGRpciwgJ25vZGVfbW9kdWxlcy8uYmluL2VsZWN0cm9uJykpO1xuICAgIGF3YWl0IGZzLnJlbW92ZShwYXRoLnJlc29sdmUoZGlyLCAnbm9kZV9tb2R1bGVzLy5iaW4vZWxlY3Ryb24uY21kJykpO1xuXG4gICAgaWYgKGVsZWN0cm9uTmFtZSkge1xuICAgICAgYXdhaXQgZnMucmVtb3ZlKHBhdGgucmVzb2x2ZShkaXIsICdub2RlX21vZHVsZXMnLCBlbGVjdHJvbk5hbWUpKTtcbiAgICB9XG5cbiAgICBkKCdpbnN0YWxsaW5nIGRlcGVuZGVuY2llcycpO1xuICAgIGF3YWl0IGluc3RhbGxEZXBMaXN0KGRpciwgZGVwcyk7XG5cbiAgICBkKCdpbnN0YWxsaW5nIGRldkRlcGVuZGVuY2llcycpO1xuICAgIGF3YWl0IGluc3RhbGxEZXBMaXN0KGRpciwgZGV2RGVwcywgdHJ1ZSk7XG5cbiAgICBkKCdpbnN0YWxsaW5nIGV4YWN0RGV2RGVwZW5kZW5jaWVzJyk7XG4gICAgYXdhaXQgaW5zdGFsbERlcExpc3QoZGlyLCBleGFjdERldkRlcHMubWFwKChkZXApID0+IHtcbiAgICAgIGlmIChkZXAgPT09ICdlbGVjdHJvbi1wcmVidWlsdC1jb21waWxlJykge1xuICAgICAgICByZXR1cm4gYCR7ZGVwfUAke2VsZWN0cm9uVmVyc2lvbiB8fCAnbGF0ZXN0J31gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVwO1xuICAgIH0pLCB0cnVlLCB0cnVlKTtcbiAgfSk7XG5cbiAgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04oZGlyKTtcblxuICBpZiAoIXBhY2thZ2VKU09OLnZlcnNpb24pIHtcbiAgICB3YXJuKGludGVyYWN0aXZlLCBcIlBsZWFzZSBzZXQgdGhlICd2ZXJzaW9uJyBpbiB5b3VyIGFwcGxpY2F0aW9uJ3MgcGFja2FnZS5qc29uXCIueWVsbG93KTtcbiAgfVxuXG4gIHBhY2thZ2VKU09OLmNvbmZpZyA9IHBhY2thZ2VKU09OLmNvbmZpZyB8fCB7fTtcbiAgY29uc3QgdGVtcGxhdGVQYWNrYWdlSlNPTiA9IGF3YWl0IHJlYWRQYWNrYWdlSlNPTihwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vdG1wbCcpKTtcbiAgcGFja2FnZUpTT04uY29uZmlnLmZvcmdlID0gdGVtcGxhdGVQYWNrYWdlSlNPTi5jb25maWcuZm9yZ2U7XG4gIHNldEluaXRpYWxGb3JnZUNvbmZpZyhwYWNrYWdlSlNPTik7XG5cbiAgYXdhaXQgd3JpdGVDaGFuZ2VzKCk7XG5cbiAgYXdhaXQgYXN5bmNPcmEoJ0ZpeGluZyAuZ2l0aWdub3JlJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChhd2FpdCBmcy5wYXRoRXhpc3RzKHBhdGgucmVzb2x2ZShkaXIsICcuZ2l0aWdub3JlJykpKSB7XG4gICAgICBjb25zdCBnaXRpZ25vcmUgPSBhd2FpdCBmcy5yZWFkRmlsZShwYXRoLnJlc29sdmUoZGlyLCAnLmdpdGlnbm9yZScpKTtcbiAgICAgIGlmICghZ2l0aWdub3JlLmluY2x1ZGVzKG91dERpcikpIHtcbiAgICAgICAgYXdhaXQgZnMud3JpdGVGaWxlKHBhdGgucmVzb2x2ZShkaXIsICcuZ2l0aWdub3JlJyksIGAke2dpdGlnbm9yZX1cXG4ke291dERpcn0vYCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBsZXQgYmFiZWxDb25maWcgPSBwYWNrYWdlSlNPTi5iYWJlbDtcbiAgY29uc3QgYmFiZWxQYXRoID0gcGF0aC5yZXNvbHZlKGRpciwgJy5iYWJlbHJjJyk7XG4gIGlmICghYmFiZWxDb25maWcgJiYgYXdhaXQgZnMucGF0aEV4aXN0cyhiYWJlbFBhdGgpKSB7XG4gICAgYmFiZWxDb25maWcgPSBhd2FpdCBmcy5yZWFkSnNvbihiYWJlbFBhdGgsICd1dGY4Jyk7XG4gIH1cblxuICBpZiAoYmFiZWxDb25maWcpIHtcbiAgICBhd2FpdCBhc3luY09yYSgnUG9ydGluZyBvcmlnaW5hbCBiYWJlbCBjb25maWcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY29tcGlsZUNvbmZpZyA9IHt9O1xuICAgICAgY29uc3QgY29tcGlsZVBhdGggPSBwYXRoLnJlc29sdmUoZGlyLCAnLmNvbXBpbGVyYycpO1xuICAgICAgaWYgKGF3YWl0IGZzLnBhdGhFeGlzdHMoY29tcGlsZVBhdGgpKSB7XG4gICAgICAgIGNvbXBpbGVDb25maWcgPSBhd2FpdCBmcy5yZWFkSnNvbihjb21waWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgZnMud3JpdGVKc29uKGNvbXBpbGVQYXRoLCBPYmplY3QuYXNzaWduKGNvbXBpbGVDb25maWcsIHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnOiBiYWJlbENvbmZpZyxcbiAgICAgIH0pLCB7IHNwYWNlczogMiB9KTtcbiAgICB9KTtcblxuICAgIGluZm8oaW50ZXJhY3RpdmUsICdOT1RFOiBZb3UgbWlnaHQgYmUgYWJsZSB0byByZW1vdmUgeW91ciBgLmNvbXBpbGVyY2AgZmlsZSBjb21wbGV0ZWx5IGlmIHlvdSBhcmUgb25seSB1c2luZyB0aGUgYGVzMjAxNmAgYW5kIGByZWFjdGAgcHJlc2V0cycueWVsbG93KTtcbiAgfVxuXG4gIGluZm8oaW50ZXJhY3RpdmUsIGBcblxuV2UgaGF2ZSBBVFRFTVBURUQgdG8gY29udmVydCB5b3VyIGFwcCB0byBiZSBpbiBhIGZvcm1hdCB0aGF0IGVsZWN0cm9uLWZvcmdlIHVuZGVyc3RhbmRzLlxuTm90aGluZyBtdWNoIHdpbGwgaGF2ZSBjaGFuZ2VkIGJ1dCB3ZSBhZGRlZCB0aGUgJHsnXCJlbGVjdHJvbi1wcmVidWlsdC1jb21waWxlXCInLmN5YW59IGRlcGVuZGVuY3kuICBUaGlzIGlzIFxcXG50aGUgZGVwZW5kZW5jeSB5b3UgbXVzdCB2ZXJzaW9uIGJ1bXAgdG8gZ2V0IG5ld2VyIHZlcnNpb25zIG9mIEVsZWN0cm9uLlxuXG5cbldlIGFsc28gdHJpZWQgdG8gaW1wb3J0IGFueSBidWlsZCB0b29saW5nIHlvdSBhbHJlYWR5IGhhZCBidXQgd2UgY2FuJ3QgZ2V0IGV2ZXJ5dGhpbmcuICBZb3UgbWlnaHQgbmVlZCB0byBjb252ZXJ0IGFueSBDTEkvZ3VscC9ncnVudCB0YXNrcyB5b3Vyc2VsZi5cblxuQWxzbyBwbGVhc2Ugbm90ZSBpZiB5b3UgYXJlIHVzaW5nIFxcYHByZWxvYWRcXGAgc2NyaXB0cyB5b3UgbmVlZCB0byBmb2xsb3cgdGhlIHN0ZXBzIG91dGxpbmVkIFxcXG5hdCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24tdXNlcmxhbmQvZWxlY3Ryb24tZm9yZ2Uvd2lraS9Vc2luZy0lMjdwcmVsb2FkJTI3LXNjcmlwdHNcblxuVGhhbmtzIGZvciB1c2luZyAkeydcImVsZWN0cm9uLWZvcmdlXCInLmdyZWVufSEhIWApO1xufTtcbiJdfQ==