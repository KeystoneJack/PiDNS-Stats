'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:publish:ers');

const ersPlatform = (platform, arch) => {
  switch (platform) {
    case 'darwin':
      return 'osx_64';
    case 'linux':
      return arch === 'ia32' ? 'linux_32' : 'linux_64';
    case 'win32':
      return arch === 'ia32' ? 'windows_32' : 'windows_64';
    default:
      return platform;
  }
};

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* ({ artifacts, packageJSON, forgeConfig, platform, arch }) {
    const ersConfig = forgeConfig.electronReleaseServer;
    if (!(ersConfig.baseUrl && ersConfig.username && ersConfig.password)) {
      throw 'In order to publish to ERS you must set the "electronReleaseServer.baseUrl", "electronReleaseServer.username" and "electronReleaseServer.password" properties in your forge config. See the docs for more info'; // eslint-disable-line
    }

    d('attempting to authenticate to ERS');

    const api = function api(apiPath) {
      return `${ersConfig.baseUrl}/${apiPath}`;
    };

    var _ref2 = yield (yield (0, _nodeFetch2.default)(api('api/auth/login'), {
      method: 'POST',
      body: (0, _stringify2.default)({
        username: ersConfig.username,
        password: ersConfig.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();

    const token = _ref2.token;


    const authFetch = function authFetch(apiPath, options) {
      return (0, _nodeFetch2.default)(api(apiPath), (0, _assign2.default)({}, options || {}, {
        headers: (0, _assign2.default)({}, (options || {}).headers, { Authorization: `Bearer ${token}` })
      }));
    };

    const versions = yield (yield authFetch('api/version')).json();
    const existingVersion = versions.find(function (version) {
      return version.name === packageJSON.version;
    });

    let channel = 'stable';
    if (ersConfig.channel) {
      channel = ersConfig.channel;
    } else if (packageJSON.version.includes('beta')) {
      channel = 'beta';
    } else if (packageJSON.version.includes('alpha')) {
      channel = 'alpha';
    }

    if (!existingVersion) {
      yield authFetch('api/version', {
        method: 'POST',
        body: (0, _stringify2.default)({
          channel: {
            name: channel
          },
          name: packageJSON.version,
          notes: ''
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    let uploaded = 0;
    yield (0, _oraHandler2.default)(`Uploading Artifacts ${uploaded}/${artifacts.length}`, (() => {
      var _ref3 = (0, _bluebird.coroutine)(function* (uploadSpinner) {
        const updateSpinner = function updateSpinner() {
          uploadSpinner.text = `Uploading Artifacts ${uploaded}/${artifacts.length}`; // eslint-disable-line no-param-reassign
        };

        yield _promise2.default.all(artifacts.map(function (artifactPath) {
          return new _promise2.default((() => {
            var _ref4 = (0, _bluebird.coroutine)(function* (resolve, reject) {
              if (existingVersion) {
                const existingAsset = existingVersion.assets.find(function (asset) {
                  return asset.name === _path2.default.basename(artifactPath);
                });
                if (existingAsset) {
                  d('asset at path:', artifactPath, 'already exists on server');
                  uploaded += 1;
                  updateSpinner();
                  return;
                }
              }
              try {
                d('attempting to upload asset:', artifactPath);
                const artifactForm = new _formData2.default();
                artifactForm.append('token', token);
                artifactForm.append('version', packageJSON.version);
                artifactForm.append('platform', ersPlatform(platform, arch));
                artifactForm.append('file', _fsExtra2.default.createReadStream(artifactPath));
                yield authFetch('api/asset', {
                  method: 'POST',
                  body: artifactForm,
                  headers: artifactForm.getHeaders()
                });
                d('upload successful for asset:', artifactPath);
                uploaded += 1;
                updateSpinner();
                resolve();
              } catch (err) {
                reject(err);
              }
            });

            return function (_x3, _x4) {
              return _ref4.apply(this, arguments);
            };
          })());
        }));
      });

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    })());
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hlcnMvZWxlY3Ryb24tcmVsZWFzZS1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiZCIsImVyc1BsYXRmb3JtIiwicGxhdGZvcm0iLCJhcmNoIiwiYXJ0aWZhY3RzIiwicGFja2FnZUpTT04iLCJmb3JnZUNvbmZpZyIsImVyc0NvbmZpZyIsImVsZWN0cm9uUmVsZWFzZVNlcnZlciIsImJhc2VVcmwiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiYXBpIiwiYXBpUGF0aCIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwianNvbiIsInRva2VuIiwiYXV0aEZldGNoIiwib3B0aW9ucyIsIkF1dGhvcml6YXRpb24iLCJ2ZXJzaW9ucyIsImV4aXN0aW5nVmVyc2lvbiIsImZpbmQiLCJ2ZXJzaW9uIiwibmFtZSIsImNoYW5uZWwiLCJpbmNsdWRlcyIsIm5vdGVzIiwidXBsb2FkZWQiLCJsZW5ndGgiLCJ1cGxvYWRTcGlubmVyIiwidXBkYXRlU3Bpbm5lciIsInRleHQiLCJhbGwiLCJtYXAiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXhpc3RpbmdBc3NldCIsImFzc2V0cyIsImFzc2V0IiwicGF0aCIsImJhc2VuYW1lIiwiYXJ0aWZhY3RQYXRoIiwiYXJ0aWZhY3RGb3JtIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmcyIsImNyZWF0ZVJlYWRTdHJlYW0iLCJnZXRIZWFkZXJzIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxxQkFBTSw0QkFBTixDQUFWOztBQUVBLE1BQU1DLGNBQWMsQ0FBQ0MsUUFBRCxFQUFXQyxJQUFYLEtBQW9CO0FBQ3RDLFVBQVFELFFBQVI7QUFDRSxTQUFLLFFBQUw7QUFDRSxhQUFPLFFBQVA7QUFDRixTQUFLLE9BQUw7QUFDRSxhQUFPQyxTQUFTLE1BQVQsR0FBa0IsVUFBbEIsR0FBK0IsVUFBdEM7QUFDRixTQUFLLE9BQUw7QUFDRSxhQUFPQSxTQUFTLE1BQVQsR0FBa0IsWUFBbEIsR0FBaUMsWUFBeEM7QUFDRjtBQUNFLGFBQU9ELFFBQVA7QUFSSjtBQVVELENBWEQ7OztzQ0FhZSxXQUFPLEVBQUVFLFNBQUYsRUFBYUMsV0FBYixFQUEwQkMsV0FBMUIsRUFBdUNKLFFBQXZDLEVBQWlEQyxJQUFqRCxFQUFQLEVBQW1FO0FBQ2hGLFVBQU1JLFlBQVlELFlBQVlFLHFCQUE5QjtBQUNBLFFBQUksRUFBRUQsVUFBVUUsT0FBVixJQUFxQkYsVUFBVUcsUUFBL0IsSUFBMkNILFVBQVVJLFFBQXZELENBQUosRUFBc0U7QUFDcEUsWUFBTSxnTkFBTixDQURvRSxDQUNvSjtBQUN6Tjs7QUFFRFgsTUFBRSxtQ0FBRjs7QUFFQSxVQUFNWSxNQUFNLFNBQU5BLEdBQU07QUFBQSxhQUFZLEdBQUVMLFVBQVVFLE9BQVEsSUFBR0ksT0FBUSxFQUEzQztBQUFBLEtBQVo7O0FBUmdGLGdCQVU5RCxNQUFNLENBQUMsTUFBTSx5QkFBTUQsSUFBSSxnQkFBSixDQUFOLEVBQTZCO0FBQzFERSxjQUFRLE1BRGtEO0FBRTFEQyxZQUFNLHlCQUFlO0FBQ25CTCxrQkFBVUgsVUFBVUcsUUFERDtBQUVuQkMsa0JBQVVKLFVBQVVJO0FBRkQsT0FBZixDQUZvRDtBQU0xREssZUFBUztBQUNQLHdCQUFnQjtBQURUO0FBTmlELEtBQTdCLENBQVAsRUFTcEJDLElBVG9CLEVBVndEOztBQUFBLFVBVXhFQyxLQVZ3RSxTQVV4RUEsS0FWd0U7OztBQXFCaEYsVUFBTUMsWUFBWSxTQUFaQSxTQUFZLENBQUNOLE9BQUQsRUFBVU8sT0FBVjtBQUFBLGFBQXNCLHlCQUFNUixJQUFJQyxPQUFKLENBQU4sRUFBb0Isc0JBQWMsRUFBZCxFQUFrQk8sV0FBVyxFQUE3QixFQUFpQztBQUMzRkosaUJBQVMsc0JBQWMsRUFBZCxFQUFrQixDQUFDSSxXQUFXLEVBQVosRUFBZ0JKLE9BQWxDLEVBQTJDLEVBQUVLLGVBQWdCLFVBQVNILEtBQU0sRUFBakMsRUFBM0M7QUFEa0YsT0FBakMsQ0FBcEIsQ0FBdEI7QUFBQSxLQUFsQjs7QUFJQSxVQUFNSSxXQUFXLE1BQU0sQ0FBQyxNQUFNSCxVQUFVLGFBQVYsQ0FBUCxFQUFpQ0YsSUFBakMsRUFBdkI7QUFDQSxVQUFNTSxrQkFBa0JELFNBQVNFLElBQVQsQ0FBYztBQUFBLGFBQVdDLFFBQVFDLElBQVIsS0FBaUJyQixZQUFZb0IsT0FBeEM7QUFBQSxLQUFkLENBQXhCOztBQUVBLFFBQUlFLFVBQVUsUUFBZDtBQUNBLFFBQUlwQixVQUFVb0IsT0FBZCxFQUF1QjtBQUNyQkEsZ0JBQVVwQixVQUFVb0IsT0FBcEI7QUFDRCxLQUZELE1BRU8sSUFBSXRCLFlBQVlvQixPQUFaLENBQW9CRyxRQUFwQixDQUE2QixNQUE3QixDQUFKLEVBQTBDO0FBQy9DRCxnQkFBVSxNQUFWO0FBQ0QsS0FGTSxNQUVBLElBQUl0QixZQUFZb0IsT0FBWixDQUFvQkcsUUFBcEIsQ0FBNkIsT0FBN0IsQ0FBSixFQUEyQztBQUNoREQsZ0JBQVUsT0FBVjtBQUNEOztBQUVELFFBQUksQ0FBQ0osZUFBTCxFQUFzQjtBQUNwQixZQUFNSixVQUFVLGFBQVYsRUFBeUI7QUFDN0JMLGdCQUFRLE1BRHFCO0FBRTdCQyxjQUFNLHlCQUFlO0FBQ25CWSxtQkFBUztBQUNQRCxrQkFBTUM7QUFEQyxXQURVO0FBSW5CRCxnQkFBTXJCLFlBQVlvQixPQUpDO0FBS25CSSxpQkFBTztBQUxZLFNBQWYsQ0FGdUI7QUFTN0JiLGlCQUFTO0FBQ1AsMEJBQWdCO0FBRFQ7QUFUb0IsT0FBekIsQ0FBTjtBQWFEOztBQUVELFFBQUljLFdBQVcsQ0FBZjtBQUNBLFVBQU0sMEJBQVUsdUJBQXNCQSxRQUFTLElBQUcxQixVQUFVMkIsTUFBTyxFQUE3RDtBQUFBLDJDQUFnRSxXQUFPQyxhQUFQLEVBQXlCO0FBQzdGLGNBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0IsR0FBTTtBQUMxQkQsd0JBQWNFLElBQWQsR0FBc0IsdUJBQXNCSixRQUFTLElBQUcxQixVQUFVMkIsTUFBTyxFQUF6RSxDQUQwQixDQUNrRDtBQUM3RSxTQUZEOztBQUlBLGNBQU0sa0JBQVFJLEdBQVIsQ0FBWS9CLFVBQVVnQyxHQUFWLENBQWM7QUFBQSxpQkFDOUI7QUFBQSxpREFBWSxXQUFPQyxPQUFQLEVBQWdCQyxNQUFoQixFQUEyQjtBQUNyQyxrQkFBSWYsZUFBSixFQUFxQjtBQUNuQixzQkFBTWdCLGdCQUFnQmhCLGdCQUFnQmlCLE1BQWhCLENBQXVCaEIsSUFBdkIsQ0FBNEI7QUFBQSx5QkFBU2lCLE1BQU1mLElBQU4sS0FBZWdCLGVBQUtDLFFBQUwsQ0FBY0MsWUFBZCxDQUF4QjtBQUFBLGlCQUE1QixDQUF0QjtBQUNBLG9CQUFJTCxhQUFKLEVBQW1CO0FBQ2pCdkMsb0JBQUUsZ0JBQUYsRUFBb0I0QyxZQUFwQixFQUFrQywwQkFBbEM7QUFDQWQsOEJBQVksQ0FBWjtBQUNBRztBQUNBO0FBQ0Q7QUFDRjtBQUNELGtCQUFJO0FBQ0ZqQyxrQkFBRSw2QkFBRixFQUFpQzRDLFlBQWpDO0FBQ0Esc0JBQU1DLGVBQWUsSUFBSUMsa0JBQUosRUFBckI7QUFDQUQsNkJBQWFFLE1BQWIsQ0FBb0IsT0FBcEIsRUFBNkI3QixLQUE3QjtBQUNBMkIsNkJBQWFFLE1BQWIsQ0FBb0IsU0FBcEIsRUFBK0IxQyxZQUFZb0IsT0FBM0M7QUFDQW9CLDZCQUFhRSxNQUFiLENBQW9CLFVBQXBCLEVBQWdDOUMsWUFBWUMsUUFBWixFQUFzQkMsSUFBdEIsQ0FBaEM7QUFDQTBDLDZCQUFhRSxNQUFiLENBQW9CLE1BQXBCLEVBQTRCQyxrQkFBR0MsZ0JBQUgsQ0FBb0JMLFlBQXBCLENBQTVCO0FBQ0Esc0JBQU16QixVQUFVLFdBQVYsRUFBdUI7QUFDM0JMLDBCQUFRLE1BRG1CO0FBRTNCQyx3QkFBTThCLFlBRnFCO0FBRzNCN0IsMkJBQVM2QixhQUFhSyxVQUFiO0FBSGtCLGlCQUF2QixDQUFOO0FBS0FsRCxrQkFBRSw4QkFBRixFQUFrQzRDLFlBQWxDO0FBQ0FkLDRCQUFZLENBQVo7QUFDQUc7QUFDQUk7QUFDRCxlQWhCRCxDQWdCRSxPQUFPYyxHQUFQLEVBQVk7QUFDWmIsdUJBQU9hLEdBQVA7QUFDRDtBQUNGLGFBN0JEOztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRDhCO0FBQUEsU0FBZCxDQUFaLENBQU47QUFnQ0QsT0FyQ0s7O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBTjtBQXNDRCxHIiwiZmlsZSI6InB1Ymxpc2hlcnMvZWxlY3Ryb24tcmVsZWFzZS1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCBhc3luY09yYSBmcm9tICcuLi91dGlsL29yYS1oYW5kbGVyJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpwdWJsaXNoOmVycycpO1xuXG5jb25zdCBlcnNQbGF0Zm9ybSA9IChwbGF0Zm9ybSwgYXJjaCkgPT4ge1xuICBzd2l0Y2ggKHBsYXRmb3JtKSB7XG4gICAgY2FzZSAnZGFyd2luJzpcbiAgICAgIHJldHVybiAnb3N4XzY0JztcbiAgICBjYXNlICdsaW51eCc6XG4gICAgICByZXR1cm4gYXJjaCA9PT0gJ2lhMzInID8gJ2xpbnV4XzMyJyA6ICdsaW51eF82NCc7XG4gICAgY2FzZSAnd2luMzInOlxuICAgICAgcmV0dXJuIGFyY2ggPT09ICdpYTMyJyA/ICd3aW5kb3dzXzMyJyA6ICd3aW5kb3dzXzY0JztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHBsYXRmb3JtO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBhcnRpZmFjdHMsIHBhY2thZ2VKU09OLCBmb3JnZUNvbmZpZywgcGxhdGZvcm0sIGFyY2ggfSkgPT4ge1xuICBjb25zdCBlcnNDb25maWcgPSBmb3JnZUNvbmZpZy5lbGVjdHJvblJlbGVhc2VTZXJ2ZXI7XG4gIGlmICghKGVyc0NvbmZpZy5iYXNlVXJsICYmIGVyc0NvbmZpZy51c2VybmFtZSAmJiBlcnNDb25maWcucGFzc3dvcmQpKSB7XG4gICAgdGhyb3cgJ0luIG9yZGVyIHRvIHB1Ymxpc2ggdG8gRVJTIHlvdSBtdXN0IHNldCB0aGUgXCJlbGVjdHJvblJlbGVhc2VTZXJ2ZXIuYmFzZVVybFwiLCBcImVsZWN0cm9uUmVsZWFzZVNlcnZlci51c2VybmFtZVwiIGFuZCBcImVsZWN0cm9uUmVsZWFzZVNlcnZlci5wYXNzd29yZFwiIHByb3BlcnRpZXMgaW4geW91ciBmb3JnZSBjb25maWcuIFNlZSB0aGUgZG9jcyBmb3IgbW9yZSBpbmZvJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgZCgnYXR0ZW1wdGluZyB0byBhdXRoZW50aWNhdGUgdG8gRVJTJyk7XG5cbiAgY29uc3QgYXBpID0gYXBpUGF0aCA9PiBgJHtlcnNDb25maWcuYmFzZVVybH0vJHthcGlQYXRofWA7XG5cbiAgY29uc3QgeyB0b2tlbiB9ID0gYXdhaXQgKGF3YWl0IGZldGNoKGFwaSgnYXBpL2F1dGgvbG9naW4nKSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHVzZXJuYW1lOiBlcnNDb25maWcudXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogZXJzQ29uZmlnLnBhc3N3b3JkLFxuICAgIH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgfSkpLmpzb24oKTtcblxuICBjb25zdCBhdXRoRmV0Y2ggPSAoYXBpUGF0aCwgb3B0aW9ucykgPT4gZmV0Y2goYXBpKGFwaVBhdGgpLCBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zIHx8IHt9LCB7XG4gICAgaGVhZGVyczogT2JqZWN0LmFzc2lnbih7fSwgKG9wdGlvbnMgfHwge30pLmhlYWRlcnMsIHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAgfSksXG4gIH0pKTtcblxuICBjb25zdCB2ZXJzaW9ucyA9IGF3YWl0IChhd2FpdCBhdXRoRmV0Y2goJ2FwaS92ZXJzaW9uJykpLmpzb24oKTtcbiAgY29uc3QgZXhpc3RpbmdWZXJzaW9uID0gdmVyc2lvbnMuZmluZCh2ZXJzaW9uID0+IHZlcnNpb24ubmFtZSA9PT0gcGFja2FnZUpTT04udmVyc2lvbik7XG5cbiAgbGV0IGNoYW5uZWwgPSAnc3RhYmxlJztcbiAgaWYgKGVyc0NvbmZpZy5jaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IGVyc0NvbmZpZy5jaGFubmVsO1xuICB9IGVsc2UgaWYgKHBhY2thZ2VKU09OLnZlcnNpb24uaW5jbHVkZXMoJ2JldGEnKSkge1xuICAgIGNoYW5uZWwgPSAnYmV0YSc7XG4gIH0gZWxzZSBpZiAocGFja2FnZUpTT04udmVyc2lvbi5pbmNsdWRlcygnYWxwaGEnKSkge1xuICAgIGNoYW5uZWwgPSAnYWxwaGEnO1xuICB9XG5cbiAgaWYgKCFleGlzdGluZ1ZlcnNpb24pIHtcbiAgICBhd2FpdCBhdXRoRmV0Y2goJ2FwaS92ZXJzaW9uJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNoYW5uZWw6IHtcbiAgICAgICAgICBuYW1lOiBjaGFubmVsLFxuICAgICAgICB9LFxuICAgICAgICBuYW1lOiBwYWNrYWdlSlNPTi52ZXJzaW9uLFxuICAgICAgICBub3RlczogJycsXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBsZXQgdXBsb2FkZWQgPSAwO1xuICBhd2FpdCBhc3luY09yYShgVXBsb2FkaW5nIEFydGlmYWN0cyAke3VwbG9hZGVkfS8ke2FydGlmYWN0cy5sZW5ndGh9YCwgYXN5bmMgKHVwbG9hZFNwaW5uZXIpID0+IHtcbiAgICBjb25zdCB1cGRhdGVTcGlubmVyID0gKCkgPT4ge1xuICAgICAgdXBsb2FkU3Bpbm5lci50ZXh0ID0gYFVwbG9hZGluZyBBcnRpZmFjdHMgJHt1cGxvYWRlZH0vJHthcnRpZmFjdHMubGVuZ3RofWA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB9O1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoYXJ0aWZhY3RzLm1hcChhcnRpZmFjdFBhdGggPT5cbiAgICAgIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGV4aXN0aW5nVmVyc2lvbikge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQXNzZXQgPSBleGlzdGluZ1ZlcnNpb24uYXNzZXRzLmZpbmQoYXNzZXQgPT4gYXNzZXQubmFtZSA9PT0gcGF0aC5iYXNlbmFtZShhcnRpZmFjdFBhdGgpKTtcbiAgICAgICAgICBpZiAoZXhpc3RpbmdBc3NldCkge1xuICAgICAgICAgICAgZCgnYXNzZXQgYXQgcGF0aDonLCBhcnRpZmFjdFBhdGgsICdhbHJlYWR5IGV4aXN0cyBvbiBzZXJ2ZXInKTtcbiAgICAgICAgICAgIHVwbG9hZGVkICs9IDE7XG4gICAgICAgICAgICB1cGRhdGVTcGlubmVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZCgnYXR0ZW1wdGluZyB0byB1cGxvYWQgYXNzZXQ6JywgYXJ0aWZhY3RQYXRoKTtcbiAgICAgICAgICBjb25zdCBhcnRpZmFjdEZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICBhcnRpZmFjdEZvcm0uYXBwZW5kKCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgICBhcnRpZmFjdEZvcm0uYXBwZW5kKCd2ZXJzaW9uJywgcGFja2FnZUpTT04udmVyc2lvbik7XG4gICAgICAgICAgYXJ0aWZhY3RGb3JtLmFwcGVuZCgncGxhdGZvcm0nLCBlcnNQbGF0Zm9ybShwbGF0Zm9ybSwgYXJjaCkpO1xuICAgICAgICAgIGFydGlmYWN0Rm9ybS5hcHBlbmQoJ2ZpbGUnLCBmcy5jcmVhdGVSZWFkU3RyZWFtKGFydGlmYWN0UGF0aCkpO1xuICAgICAgICAgIGF3YWl0IGF1dGhGZXRjaCgnYXBpL2Fzc2V0Jywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBhcnRpZmFjdEZvcm0sXG4gICAgICAgICAgICBoZWFkZXJzOiBhcnRpZmFjdEZvcm0uZ2V0SGVhZGVycygpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGQoJ3VwbG9hZCBzdWNjZXNzZnVsIGZvciBhc3NldDonLCBhcnRpZmFjdFBhdGgpO1xuICAgICAgICAgIHVwbG9hZGVkICs9IDE7XG4gICAgICAgICAgdXBkYXRlU3Bpbm5lcigpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKSk7XG4gIH0pO1xufTtcbiJdfQ==