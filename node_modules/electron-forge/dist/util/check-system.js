'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require('bluebird');

let checkGitExists = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return new _promise2.default(function (resolve) {
      (0, _child_process.exec)('git --version', function (err) {
        if (err) return resolve(false);
        resolve(true);
      });
    });
  });

  return function checkGitExists() {
    return _ref.apply(this, arguments);
  };
})();

let checkNodeVersion = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* () {
    return _promise2.default.resolve(_semver2.default.gt(process.versions.node, '6.0.0'));
  });

  return function checkNodeVersion() {
    return _ref2.apply(this, arguments);
  };
})();

let checkPackageManagerVersion = (() => {
  var _ref3 = (0, _bluebird.coroutine)(function* (ora) {
    return (0, _yarnOrNpm.yarnOrNpmSpawn)(['--version']).then(function (version) {
      if ((0, _yarnOrNpm.hasYarn)()) {
        warnIfPackageManagerIsntAKnownGoodVersion('Yarn', version, YARN_WHITELISTED_VERSIONS, ora);
      } else {
        warnIfPackageManagerIsntAKnownGoodVersion('NPM', version, NPM_WHITELISTED_VERSIONS, ora);
      }

      return true;
    });
  });

  return function checkPackageManagerVersion(_x) {
    return _ref3.apply(this, arguments);
  };
})();

exports.validPackageManagerVersion = validPackageManagerVersion;

var _child_process = require('child_process');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _yarnOrNpm = require('./yarn-or-npm');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:check-system');

const NPM_WHITELISTED_VERSIONS = {
  all: '^3.0.0 || ^4.0.0 || ~5.1.0 || ~5.2.0 || >= 5.4.2',
  darwin: '>= 5.4.0',
  linux: '>= 5.4.0'
};
const YARN_WHITELISTED_VERSIONS = {
  all: '0.23.3 || 0.24.6 || >= 1.0.0',
  darwin: '0.27.5',
  linux: '0.27.5'
};

function validPackageManagerVersion(packageManager, version, whitelistedVersions, ora) {
  try {
    return _semver2.default.satisfies(version, whitelistedVersions);
  } catch (e) {
    ora.warn(`Could not check ${packageManager} version "${version}", assuming incompatible`);
    d(`Exception while checking version: ${e}`);
    return false;
  }
}

function warnIfPackageManagerIsntAKnownGoodVersion(packageManager, version, whitelistedVersions, ora) {
  const osVersions = whitelistedVersions[process.platform];
  const versions = osVersions ? `${whitelistedVersions.all} || ${osVersions}` : whitelistedVersions.all;
  const versionString = version.toString();
  if (!validPackageManagerVersion(packageManager, versionString, versions, ora)) {
    ora.warn(`You are using ${packageManager}, but not a known good version.\n` + `The known versions that work with Electron Forge are: ${versions}`);
  }
}

exports.default = (() => {
  var _ref4 = (0, _bluebird.coroutine)(function* (ora) {
    return (yield _promise2.default.all([checkGitExists(ora), checkNodeVersion(ora), checkPackageManagerVersion(ora)])).every(function (check) {
      return check;
    });
  });

  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvY2hlY2stc3lzdGVtLmpzIl0sIm5hbWVzIjpbInJlc29sdmUiLCJlcnIiLCJjaGVja0dpdEV4aXN0cyIsInNlbXZlciIsImd0IiwicHJvY2VzcyIsInZlcnNpb25zIiwibm9kZSIsImNoZWNrTm9kZVZlcnNpb24iLCJvcmEiLCJ0aGVuIiwidmVyc2lvbiIsIndhcm5JZlBhY2thZ2VNYW5hZ2VySXNudEFLbm93bkdvb2RWZXJzaW9uIiwiWUFSTl9XSElURUxJU1RFRF9WRVJTSU9OUyIsIk5QTV9XSElURUxJU1RFRF9WRVJTSU9OUyIsImNoZWNrUGFja2FnZU1hbmFnZXJWZXJzaW9uIiwidmFsaWRQYWNrYWdlTWFuYWdlclZlcnNpb24iLCJkIiwiYWxsIiwiZGFyd2luIiwibGludXgiLCJwYWNrYWdlTWFuYWdlciIsIndoaXRlbGlzdGVkVmVyc2lvbnMiLCJzYXRpc2ZpZXMiLCJlIiwid2FybiIsIm9zVmVyc2lvbnMiLCJwbGF0Zm9ybSIsInZlcnNpb25TdHJpbmciLCJ0b1N0cmluZyIsImV2ZXJ5IiwiY2hlY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7c0NBUUEsYUFBZ0M7QUFDOUIsV0FBTyxzQkFBWSxVQUFDQSxPQUFELEVBQWE7QUFDOUIsK0JBQUssZUFBTCxFQUFzQixVQUFDQyxHQUFELEVBQVM7QUFDN0IsWUFBSUEsR0FBSixFQUFTLE9BQU9ELFFBQVEsS0FBUixDQUFQO0FBQ1RBLGdCQUFRLElBQVI7QUFDRCxPQUhEO0FBSUQsS0FMTSxDQUFQO0FBTUQsRzs7a0JBUGNFLGM7Ozs7Ozt1Q0FTZixhQUFrQztBQUNoQyxXQUFPLGtCQUFRRixPQUFSLENBQWdCRyxpQkFBT0MsRUFBUCxDQUFVQyxRQUFRQyxRQUFSLENBQWlCQyxJQUEzQixFQUFpQyxPQUFqQyxDQUFoQixDQUFQO0FBQ0QsRzs7a0JBRmNDLGdCOzs7Ozs7dUNBcUNmLFdBQTBDQyxHQUExQyxFQUErQztBQUM3QyxXQUFPLCtCQUFlLENBQUMsV0FBRCxDQUFmLEVBQ0pDLElBREksQ0FDQyxVQUFDQyxPQUFELEVBQWE7QUFDakIsVUFBSSx5QkFBSixFQUFlO0FBQ2JDLGtEQUEwQyxNQUExQyxFQUFrREQsT0FBbEQsRUFBMkRFLHlCQUEzRCxFQUFzRkosR0FBdEY7QUFDRCxPQUZELE1BRU87QUFDTEcsa0RBQTBDLEtBQTFDLEVBQWlERCxPQUFqRCxFQUEwREcsd0JBQTFELEVBQW9GTCxHQUFwRjtBQUNEOztBQUVELGFBQU8sSUFBUDtBQUNELEtBVEksQ0FBUDtBQVVELEc7O2tCQVhjTSwwQjs7Ozs7UUF0QkNDLDBCLEdBQUFBLDBCOztBQWhDaEI7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBRUEsTUFBTUMsSUFBSSxxQkFBTSw2QkFBTixDQUFWOztBQWVBLE1BQU1ILDJCQUEyQjtBQUMvQkksT0FBSyxrREFEMEI7QUFFL0JDLFVBQVEsVUFGdUI7QUFHL0JDLFNBQU87QUFId0IsQ0FBakM7QUFLQSxNQUFNUCw0QkFBNEI7QUFDaENLLE9BQUssOEJBRDJCO0FBRWhDQyxVQUFRLFFBRndCO0FBR2hDQyxTQUFPO0FBSHlCLENBQWxDOztBQU1PLFNBQVNKLDBCQUFULENBQW9DSyxjQUFwQyxFQUFvRFYsT0FBcEQsRUFBNkRXLG1CQUE3RCxFQUFrRmIsR0FBbEYsRUFBdUY7QUFDNUYsTUFBSTtBQUNGLFdBQU9OLGlCQUFPb0IsU0FBUCxDQUFpQlosT0FBakIsRUFBMEJXLG1CQUExQixDQUFQO0FBQ0QsR0FGRCxDQUVFLE9BQU9FLENBQVAsRUFBVTtBQUNWZixRQUFJZ0IsSUFBSixDQUFVLG1CQUFrQkosY0FBZSxhQUFZVixPQUFRLDBCQUEvRDtBQUNBTSxNQUFHLHFDQUFvQ08sQ0FBRSxFQUF6QztBQUNBLFdBQU8sS0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBU1oseUNBQVQsQ0FBbURTLGNBQW5ELEVBQW1FVixPQUFuRSxFQUE0RVcsbUJBQTVFLEVBQWlHYixHQUFqRyxFQUFzRztBQUNwRyxRQUFNaUIsYUFBYUosb0JBQW9CakIsUUFBUXNCLFFBQTVCLENBQW5CO0FBQ0EsUUFBTXJCLFdBQVdvQixhQUFjLEdBQUVKLG9CQUFvQkosR0FBSSxPQUFNUSxVQUFXLEVBQXpELEdBQTZESixvQkFBb0JKLEdBQWxHO0FBQ0EsUUFBTVUsZ0JBQWdCakIsUUFBUWtCLFFBQVIsRUFBdEI7QUFDQSxNQUFJLENBQUNiLDJCQUEyQkssY0FBM0IsRUFBMkNPLGFBQTNDLEVBQTBEdEIsUUFBMUQsRUFBb0VHLEdBQXBFLENBQUwsRUFBK0U7QUFDN0VBLFFBQUlnQixJQUFKLENBQ0csaUJBQWdCSixjQUFlLG1DQUFoQyxHQUNDLHlEQUF3RGYsUUFBUyxFQUZwRTtBQUlEO0FBQ0Y7Ozt1Q0FlYyxXQUFnQkcsR0FBaEIsRUFBcUI7QUFDbEMsV0FBTyxDQUFDLE1BQU0sa0JBQVFTLEdBQVIsQ0FBWSxDQUFDaEIsZUFBZU8sR0FBZixDQUFELEVBQXNCRCxpQkFBaUJDLEdBQWpCLENBQXRCLEVBQTZDTSwyQkFBMkJOLEdBQTNCLENBQTdDLENBQVosQ0FBUCxFQUNKcUIsS0FESSxDQUNFO0FBQUEsYUFBU0MsS0FBVDtBQUFBLEtBREYsQ0FBUDtBQUVELEciLCJmaWxlIjoidXRpbC9jaGVjay1zeXN0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInO1xuXG5pbXBvcnQgeyBoYXNZYXJuLCB5YXJuT3JOcG1TcGF3biB9IGZyb20gJy4veWFybi1vci1ucG0nO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmNoZWNrLXN5c3RlbScpO1xuXG5hc3luYyBmdW5jdGlvbiBjaGVja0dpdEV4aXN0cygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgZXhlYygnZ2l0IC0tdmVyc2lvbicsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXNvbHZlKGZhbHNlKTtcbiAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja05vZGVWZXJzaW9uKCkge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNlbXZlci5ndChwcm9jZXNzLnZlcnNpb25zLm5vZGUsICc2LjAuMCcpKTtcbn1cblxuY29uc3QgTlBNX1dISVRFTElTVEVEX1ZFUlNJT05TID0ge1xuICBhbGw6ICdeMy4wLjAgfHwgXjQuMC4wIHx8IH41LjEuMCB8fCB+NS4yLjAgfHwgPj0gNS40LjInLFxuICBkYXJ3aW46ICc+PSA1LjQuMCcsXG4gIGxpbnV4OiAnPj0gNS40LjAnLFxufTtcbmNvbnN0IFlBUk5fV0hJVEVMSVNURURfVkVSU0lPTlMgPSB7XG4gIGFsbDogJzAuMjMuMyB8fCAwLjI0LjYgfHwgPj0gMS4wLjAnLFxuICBkYXJ3aW46ICcwLjI3LjUnLFxuICBsaW51eDogJzAuMjcuNScsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRQYWNrYWdlTWFuYWdlclZlcnNpb24ocGFja2FnZU1hbmFnZXIsIHZlcnNpb24sIHdoaXRlbGlzdGVkVmVyc2lvbnMsIG9yYSkge1xuICB0cnkge1xuICAgIHJldHVybiBzZW12ZXIuc2F0aXNmaWVzKHZlcnNpb24sIHdoaXRlbGlzdGVkVmVyc2lvbnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgb3JhLndhcm4oYENvdWxkIG5vdCBjaGVjayAke3BhY2thZ2VNYW5hZ2VyfSB2ZXJzaW9uIFwiJHt2ZXJzaW9ufVwiLCBhc3N1bWluZyBpbmNvbXBhdGlibGVgKTtcbiAgICBkKGBFeGNlcHRpb24gd2hpbGUgY2hlY2tpbmcgdmVyc2lvbjogJHtlfWApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3YXJuSWZQYWNrYWdlTWFuYWdlcklzbnRBS25vd25Hb29kVmVyc2lvbihwYWNrYWdlTWFuYWdlciwgdmVyc2lvbiwgd2hpdGVsaXN0ZWRWZXJzaW9ucywgb3JhKSB7XG4gIGNvbnN0IG9zVmVyc2lvbnMgPSB3aGl0ZWxpc3RlZFZlcnNpb25zW3Byb2Nlc3MucGxhdGZvcm1dO1xuICBjb25zdCB2ZXJzaW9ucyA9IG9zVmVyc2lvbnMgPyBgJHt3aGl0ZWxpc3RlZFZlcnNpb25zLmFsbH0gfHwgJHtvc1ZlcnNpb25zfWAgOiB3aGl0ZWxpc3RlZFZlcnNpb25zLmFsbDtcbiAgY29uc3QgdmVyc2lvblN0cmluZyA9IHZlcnNpb24udG9TdHJpbmcoKTtcbiAgaWYgKCF2YWxpZFBhY2thZ2VNYW5hZ2VyVmVyc2lvbihwYWNrYWdlTWFuYWdlciwgdmVyc2lvblN0cmluZywgdmVyc2lvbnMsIG9yYSkpIHtcbiAgICBvcmEud2FybihcbiAgICAgIGBZb3UgYXJlIHVzaW5nICR7cGFja2FnZU1hbmFnZXJ9LCBidXQgbm90IGEga25vd24gZ29vZCB2ZXJzaW9uLlxcbmAgK1xuICAgICAgYFRoZSBrbm93biB2ZXJzaW9ucyB0aGF0IHdvcmsgd2l0aCBFbGVjdHJvbiBGb3JnZSBhcmU6ICR7dmVyc2lvbnN9YFxuICAgICk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tQYWNrYWdlTWFuYWdlclZlcnNpb24ob3JhKSB7XG4gIHJldHVybiB5YXJuT3JOcG1TcGF3bihbJy0tdmVyc2lvbiddKVxuICAgIC50aGVuKCh2ZXJzaW9uKSA9PiB7XG4gICAgICBpZiAoaGFzWWFybigpKSB7XG4gICAgICAgIHdhcm5JZlBhY2thZ2VNYW5hZ2VySXNudEFLbm93bkdvb2RWZXJzaW9uKCdZYXJuJywgdmVyc2lvbiwgWUFSTl9XSElURUxJU1RFRF9WRVJTSU9OUywgb3JhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm5JZlBhY2thZ2VNYW5hZ2VySXNudEFLbm93bkdvb2RWZXJzaW9uKCdOUE0nLCB2ZXJzaW9uLCBOUE1fV0hJVEVMSVNURURfVkVSU0lPTlMsIG9yYSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAob3JhKSB7XG4gIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwoW2NoZWNrR2l0RXhpc3RzKG9yYSksIGNoZWNrTm9kZVZlcnNpb24ob3JhKSwgY2hlY2tQYWNrYWdlTWFuYWdlclZlcnNpb24ob3JhKV0pKVxuICAgIC5ldmVyeShjaGVjayA9PiBjaGVjayk7XG59XG4iXX0=