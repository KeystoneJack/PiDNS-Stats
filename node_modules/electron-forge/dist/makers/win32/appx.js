'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultCertificate = exports.isSupportedOnCurrentPlatform = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

let createDefaultCertificate = exports.createDefaultCertificate = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* (publisherName, { certFilePath, certFileName, install, program }) {
    const makeCertOptions = {
      publisherName,
      certFilePath: certFilePath || process.cwd(),
      certFileName: certFileName || 'default',
      install: typeof install === 'boolean' ? install : false,
      program: program || { windowsKit: _path2.default.dirname(findSdkTool('makecert.exe')) }
    };

    if (!(0, _sign.isValidPublisherName)(publisherName)) {
      throw new Error(`Received invalid publisher name: '${publisherName}' did not conform to X.500 distinguished name syntax for MakeCert.`);
    }

    return yield (0, _sign.makeCert)(makeCertOptions);
  });

  return function createDefaultCertificate(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
})();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolveCommand = require('cross-spawn/lib/util/resolveCommand');

var _resolveCommand2 = _interopRequireDefault(_resolveCommand);

var _electronWindowsStore = require('electron-windows-store');

var _electronWindowsStore2 = _interopRequireDefault(_electronWindowsStore);

var _sign = require('electron-windows-store/lib/sign');

var _configFn = require('../../util/config-fn');

var _configFn2 = _interopRequireDefault(_configFn);

var _authorName = require('../../util/author-name');

var _authorName2 = _interopRequireDefault(_authorName);

var _ensureOutput = require('../../util/ensure-output');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// electron-windows-store doesn't set its 'os' field even though it only runs on
// win32
const isSupportedOnCurrentPlatform = exports.isSupportedOnCurrentPlatform = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return process.platform === 'win32';
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

// NB: This is not a typo, we require AppXs to be built on 64-bit
// but if we're running in a 32-bit node.js process, we're going to
// be Wow64 redirected
const windowsSdkPath = process.arch === 'x64' ? 'C:\\Program Files (x86)\\Windows Kits\\10\\bin\\x64' : 'C:\\Program Files\\Windows Kits\\10\\bin\\x64';

function findSdkTool(exe) {
  let sdkTool = _path2.default.join(windowsSdkPath, exe);
  if (!_fs2.default.existsSync(sdkTool)) {
    sdkTool = (0, _resolveCommand2.default)(exe, true);
  }

  if (!_fs2.default.existsSync(sdkTool)) {
    throw new Error(`Can't find ${exe} in PATH. You probably need to install the Windows SDK.`);
  }

  return sdkTool;
}

function getDistinguishedNameFromAuthor(author) {
  return `CN=${(0, _authorName2.default)(author)}`;
}

exports.default = (() => {
  var _ref3 = (0, _bluebird.coroutine)(function* ({ dir, appName, targetArch, forgeConfig, packageJSON }) {
    const outPath = _path2.default.resolve(dir, `../make/appx/${targetArch}`);
    yield (0, _ensureOutput.ensureDirectory)(outPath);

    const userConfig = (0, _configFn2.default)(forgeConfig.windowsStoreConfig, targetArch);

    const opts = (0, _assign2.default)({
      publisher: getDistinguishedNameFromAuthor(packageJSON.author),
      flatten: false,
      deploy: false,
      packageVersion: `${packageJSON.version}.0`,
      packageName: appName.replace(/-/g, ''),
      packageDisplayName: appName,
      packageDescription: packageJSON.description || appName,
      packageExecutable: `app\\${appName}.exe`,
      windowsKit: userConfig.windowsKit || _path2.default.dirname(findSdkTool('makeappx.exe'))
    }, userConfig, {
      inputDirectory: dir,
      outputDirectory: outPath
    });

    if (!opts.publisher) {
      throw 'Please set config.forge.windowsStoreConfig.publisher or author.name in package.json for the appx target';
    }

    if (!opts.devCert) {
      opts.devCert = yield createDefaultCertificate(opts.publisher, { certFilePath: outPath, program: opts });
    }

    if (opts.packageVersion.match(/-/)) {
      if (opts.makeVersionWinStoreCompatible) {
        const noBeta = opts.packageVersion.replace(/-.*/, '');
        opts.packageVersion = `${noBeta}.0`;
      } else {
        const err = "Windows Store version numbers don't support semver beta tags. To" + 'automatically fix this, set makeVersionWinStoreCompatible to true or ' + 'explicitly set packageVersion to a version of the format X.Y.Z.A';

        throw new Error(err);
      }
    }

    delete opts.makeVersionWinStoreCompatible;

    yield (0, _electronWindowsStore2.default)(opts);

    return [_path2.default.resolve(outPath, `${opts.packageName}.appx`)];
  });

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy93aW4zMi9hcHB4LmpzIl0sIm5hbWVzIjpbInB1Ymxpc2hlck5hbWUiLCJjZXJ0RmlsZVBhdGgiLCJjZXJ0RmlsZU5hbWUiLCJpbnN0YWxsIiwicHJvZ3JhbSIsIm1ha2VDZXJ0T3B0aW9ucyIsInByb2Nlc3MiLCJjd2QiLCJ3aW5kb3dzS2l0IiwicGF0aCIsImRpcm5hbWUiLCJmaW5kU2RrVG9vbCIsIkVycm9yIiwiY3JlYXRlRGVmYXVsdENlcnRpZmljYXRlIiwiaXNTdXBwb3J0ZWRPbkN1cnJlbnRQbGF0Zm9ybSIsInBsYXRmb3JtIiwid2luZG93c1Nka1BhdGgiLCJhcmNoIiwiZXhlIiwic2RrVG9vbCIsImpvaW4iLCJmcyIsImV4aXN0c1N5bmMiLCJnZXREaXN0aW5ndWlzaGVkTmFtZUZyb21BdXRob3IiLCJhdXRob3IiLCJkaXIiLCJhcHBOYW1lIiwidGFyZ2V0QXJjaCIsImZvcmdlQ29uZmlnIiwicGFja2FnZUpTT04iLCJvdXRQYXRoIiwicmVzb2x2ZSIsInVzZXJDb25maWciLCJ3aW5kb3dzU3RvcmVDb25maWciLCJvcHRzIiwicHVibGlzaGVyIiwiZmxhdHRlbiIsImRlcGxveSIsInBhY2thZ2VWZXJzaW9uIiwidmVyc2lvbiIsInBhY2thZ2VOYW1lIiwicmVwbGFjZSIsInBhY2thZ2VEaXNwbGF5TmFtZSIsInBhY2thZ2VEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwicGFja2FnZUV4ZWN1dGFibGUiLCJpbnB1dERpcmVjdG9yeSIsIm91dHB1dERpcmVjdG9yeSIsImRldkNlcnQiLCJtYXRjaCIsIm1ha2VWZXJzaW9uV2luU3RvcmVDb21wYXRpYmxlIiwibm9CZXRhIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozt1Q0FrQ08sV0FBd0NBLGFBQXhDLEVBQXVELEVBQUVDLFlBQUYsRUFBZ0JDLFlBQWhCLEVBQThCQyxPQUE5QixFQUF1Q0MsT0FBdkMsRUFBdkQsRUFBeUc7QUFDOUcsVUFBTUMsa0JBQWtCO0FBQ3RC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QUFNbkMseUJBQXlCcUIsS0FBS0MsU0FBOUIsRUFBeUMsRUFBRWxDLGNBQWM2QixPQUFoQixFQUF5QjFCLFNBQVM4QixJQUFsQyxFQUF6QyxDQUFyQjtBQUNEOztBQUVELFFBQUlBLEtBQUtJLGNBQUwsQ0FBb0JXLEtBQXBCLENBQTBCLEdBQTFCLENBQUosRUFBb0M7QUFDbEMsVUFBSWYsS0FBS2dCLDZCQUFULEVBQXdDO0FBQ3RDLGNBQU1DLFNBQVNqQixLQUFLSSxjQUFMLENBQW9CRyxPQUFwQixDQUE0QixLQUE1QixFQUFtQyxFQUFuQyxDQUFmO0FBQ0FQLGFBQUtJLGNBQUwsR0FBdUIsR0FBRWEsTUFBTyxJQUFoQztBQUNELE9BSEQsTUFHTztBQUNMLGNBQU1DLE1BQU0scUVBQ1YsdUVBRFUsR0FFVixrRUFGRjs7QUFJQSxjQUFNLElBQUl4QyxLQUFKLENBQVV3QyxHQUFWLENBQU47QUFDRDtBQUNGOztBQUVELFdBQU9sQixLQUFLZ0IsNkJBQVo7O0FBRUEsVUFBTSxvQ0FBYWhCLElBQWIsQ0FBTjs7QUFFQSxXQUFPLENBQUN6QixlQUFLc0IsT0FBTCxDQUFhRCxPQUFiLEVBQXVCLEdBQUVJLEtBQUtNLFdBQVksT0FBMUMsQ0FBRCxDQUFQO0FBQ0QsRyIsImZpbGUiOiJtYWtlcnMvd2luMzIvYXBweC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCByZXNvbHZlQ29tbWFuZCBmcm9tICdjcm9zcy1zcGF3bi9saWIvdXRpbC9yZXNvbHZlQ29tbWFuZCc7XG5pbXBvcnQgd2luZG93c1N0b3JlIGZyb20gJ2VsZWN0cm9uLXdpbmRvd3Mtc3RvcmUnO1xuaW1wb3J0IHsgaXNWYWxpZFB1Ymxpc2hlck5hbWUsIG1ha2VDZXJ0IH0gZnJvbSAnZWxlY3Ryb24td2luZG93cy1zdG9yZS9saWIvc2lnbic7XG5cbmltcG9ydCBjb25maWdGbiBmcm9tICcuLi8uLi91dGlsL2NvbmZpZy1mbic7XG5pbXBvcnQgZ2V0TmFtZUZyb21BdXRob3IgZnJvbSAnLi4vLi4vdXRpbC9hdXRob3ItbmFtZSc7XG5pbXBvcnQgeyBlbnN1cmVEaXJlY3RvcnkgfSBmcm9tICcuLi8uLi91dGlsL2Vuc3VyZS1vdXRwdXQnO1xuXG4vLyBlbGVjdHJvbi13aW5kb3dzLXN0b3JlIGRvZXNuJ3Qgc2V0IGl0cyAnb3MnIGZpZWxkIGV2ZW4gdGhvdWdoIGl0IG9ubHkgcnVucyBvblxuLy8gd2luMzJcbmV4cG9ydCBjb25zdCBpc1N1cHBvcnRlZE9uQ3VycmVudFBsYXRmb3JtID0gYXN5bmMgKCkgPT4gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcblxuLy8gTkI6IFRoaXMgaXMgbm90IGEgdHlwbywgd2UgcmVxdWlyZSBBcHBYcyB0byBiZSBidWlsdCBvbiA2NC1iaXRcbi8vIGJ1dCBpZiB3ZSdyZSBydW5uaW5nIGluIGEgMzItYml0IG5vZGUuanMgcHJvY2Vzcywgd2UncmUgZ29pbmcgdG9cbi8vIGJlIFdvdzY0IHJlZGlyZWN0ZWRcbmNvbnN0IHdpbmRvd3NTZGtQYXRoID0gcHJvY2Vzcy5hcmNoID09PSAneDY0JyA/XG4gICdDOlxcXFxQcm9ncmFtIEZpbGVzICh4ODYpXFxcXFdpbmRvd3MgS2l0c1xcXFwxMFxcXFxiaW5cXFxceDY0JyA6XG4gICdDOlxcXFxQcm9ncmFtIEZpbGVzXFxcXFdpbmRvd3MgS2l0c1xcXFwxMFxcXFxiaW5cXFxceDY0JztcblxuZnVuY3Rpb24gZmluZFNka1Rvb2woZXhlKSB7XG4gIGxldCBzZGtUb29sID0gcGF0aC5qb2luKHdpbmRvd3NTZGtQYXRoLCBleGUpO1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoc2RrVG9vbCkpIHtcbiAgICBzZGtUb29sID0gcmVzb2x2ZUNvbW1hbmQoZXhlLCB0cnVlKTtcbiAgfVxuXG4gIGlmICghZnMuZXhpc3RzU3luYyhzZGtUb29sKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgZmluZCAke2V4ZX0gaW4gUEFUSC4gWW91IHByb2JhYmx5IG5lZWQgdG8gaW5zdGFsbCB0aGUgV2luZG93cyBTREsuYCk7XG4gIH1cblxuICByZXR1cm4gc2RrVG9vbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRDZXJ0aWZpY2F0ZShwdWJsaXNoZXJOYW1lLCB7IGNlcnRGaWxlUGF0aCwgY2VydEZpbGVOYW1lLCBpbnN0YWxsLCBwcm9ncmFtIH0pIHtcbiAgY29uc3QgbWFrZUNlcnRPcHRpb25zID0ge1xuICAgIHB1Ymxpc2hlck5hbWUsXG4gICAgY2VydEZpbGVQYXRoOiBjZXJ0RmlsZVBhdGggfHwgcHJvY2Vzcy5jd2QoKSxcbiAgICBjZXJ0RmlsZU5hbWU6IGNlcnRGaWxlTmFtZSB8fCAnZGVmYXVsdCcsXG4gICAgaW5zdGFsbDogdHlwZW9mIGluc3RhbGwgPT09ICdib29sZWFuJyA/IGluc3RhbGwgOiBmYWxzZSxcbiAgICBwcm9ncmFtOiBwcm9ncmFtIHx8IHsgd2luZG93c0tpdDogcGF0aC5kaXJuYW1lKGZpbmRTZGtUb29sKCdtYWtlY2VydC5leGUnKSkgfSxcbiAgfTtcblxuICBpZiAoIWlzVmFsaWRQdWJsaXNoZXJOYW1lKHB1Ymxpc2hlck5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBSZWNlaXZlZCBpbnZhbGlkIHB1Ymxpc2hlciBuYW1lOiAnJHtwdWJsaXNoZXJOYW1lfScgZGlkIG5vdCBjb25mb3JtIHRvIFguNTAwIGRpc3Rpbmd1aXNoZWQgbmFtZSBzeW50YXggZm9yIE1ha2VDZXJ0LmApO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IG1ha2VDZXJ0KG1ha2VDZXJ0T3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3Rpbmd1aXNoZWROYW1lRnJvbUF1dGhvcihhdXRob3IpIHtcbiAgcmV0dXJuIGBDTj0ke2dldE5hbWVGcm9tQXV0aG9yKGF1dGhvcil9YDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHsgZGlyLCBhcHBOYW1lLCB0YXJnZXRBcmNoLCBmb3JnZUNvbmZpZywgcGFja2FnZUpTT04gfSkgPT4ge1xuICBjb25zdCBvdXRQYXRoID0gcGF0aC5yZXNvbHZlKGRpciwgYC4uL21ha2UvYXBweC8ke3RhcmdldEFyY2h9YCk7XG4gIGF3YWl0IGVuc3VyZURpcmVjdG9yeShvdXRQYXRoKTtcblxuICBjb25zdCB1c2VyQ29uZmlnID0gY29uZmlnRm4oZm9yZ2VDb25maWcud2luZG93c1N0b3JlQ29uZmlnLCB0YXJnZXRBcmNoKTtcblxuICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgcHVibGlzaGVyOiBnZXREaXN0aW5ndWlzaGVkTmFtZUZyb21BdXRob3IocGFja2FnZUpTT04uYXV0aG9yKSxcbiAgICBmbGF0dGVuOiBmYWxzZSxcbiAgICBkZXBsb3k6IGZhbHNlLFxuICAgIHBhY2thZ2VWZXJzaW9uOiBgJHtwYWNrYWdlSlNPTi52ZXJzaW9ufS4wYCxcbiAgICBwYWNrYWdlTmFtZTogYXBwTmFtZS5yZXBsYWNlKC8tL2csICcnKSxcbiAgICBwYWNrYWdlRGlzcGxheU5hbWU6IGFwcE5hbWUsXG4gICAgcGFja2FnZURlc2NyaXB0aW9uOiBwYWNrYWdlSlNPTi5kZXNjcmlwdGlvbiB8fCBhcHBOYW1lLFxuICAgIHBhY2thZ2VFeGVjdXRhYmxlOiBgYXBwXFxcXCR7YXBwTmFtZX0uZXhlYCxcbiAgICB3aW5kb3dzS2l0OiB1c2VyQ29uZmlnLndpbmRvd3NLaXQgfHwgcGF0aC5kaXJuYW1lKGZpbmRTZGtUb29sKCdtYWtlYXBweC5leGUnKSksXG4gIH0sIHVzZXJDb25maWcsIHtcbiAgICBpbnB1dERpcmVjdG9yeTogZGlyLFxuICAgIG91dHB1dERpcmVjdG9yeTogb3V0UGF0aCxcbiAgfSk7XG5cbiAgaWYgKCFvcHRzLnB1Ymxpc2hlcikge1xuICAgIHRocm93ICdQbGVhc2Ugc2V0IGNvbmZpZy5mb3JnZS53aW5kb3dzU3RvcmVDb25maWcucHVibGlzaGVyIG9yIGF1dGhvci5uYW1lIGluIHBhY2thZ2UuanNvbiBmb3IgdGhlIGFwcHggdGFyZ2V0JztcbiAgfVxuXG4gIGlmICghb3B0cy5kZXZDZXJ0KSB7XG4gICAgb3B0cy5kZXZDZXJ0ID0gYXdhaXQgY3JlYXRlRGVmYXVsdENlcnRpZmljYXRlKG9wdHMucHVibGlzaGVyLCB7IGNlcnRGaWxlUGF0aDogb3V0UGF0aCwgcHJvZ3JhbTogb3B0cyB9KTtcbiAgfVxuXG4gIGlmIChvcHRzLnBhY2thZ2VWZXJzaW9uLm1hdGNoKC8tLykpIHtcbiAgICBpZiAob3B0cy5tYWtlVmVyc2lvbldpblN0b3JlQ29tcGF0aWJsZSkge1xuICAgICAgY29uc3Qgbm9CZXRhID0gb3B0cy5wYWNrYWdlVmVyc2lvbi5yZXBsYWNlKC8tLiovLCAnJyk7XG4gICAgICBvcHRzLnBhY2thZ2VWZXJzaW9uID0gYCR7bm9CZXRhfS4wYDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXJyID0gXCJXaW5kb3dzIFN0b3JlIHZlcnNpb24gbnVtYmVycyBkb24ndCBzdXBwb3J0IHNlbXZlciBiZXRhIHRhZ3MuIFRvXCIgK1xuICAgICAgICAnYXV0b21hdGljYWxseSBmaXggdGhpcywgc2V0IG1ha2VWZXJzaW9uV2luU3RvcmVDb21wYXRpYmxlIHRvIHRydWUgb3IgJyArXG4gICAgICAgICdleHBsaWNpdGx5IHNldCBwYWNrYWdlVmVyc2lvbiB0byBhIHZlcnNpb24gb2YgdGhlIGZvcm1hdCBYLlkuWi5BJztcblxuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlIG9wdHMubWFrZVZlcnNpb25XaW5TdG9yZUNvbXBhdGlibGU7XG5cbiAgYXdhaXQgd2luZG93c1N0b3JlKG9wdHMpO1xuXG4gIHJldHVybiBbcGF0aC5yZXNvbHZlKG91dFBhdGgsIGAke29wdHMucGFja2FnZU5hbWV9LmFwcHhgKV07XG59O1xuIl19